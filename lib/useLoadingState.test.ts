import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import { useLoadingState } from './useLoadingState';

const mockTask = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));

const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const renderUseLoadingState = () => {
  return renderHook(() => {
    const [runTask, { isLoading, isIdLoading, loadingIds }] = useLoadingState();
    return { runTask, isLoading, isIdLoading, loadingIds };
  });
};

describe('useLoadingState', () => {
  it('should initially have isLoading as false and no loading IDs', () => {
    const { result } = renderUseLoadingState();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.loadingIds.size).toBe(0);
  });

  it('should set isLoading to true while performing an async task', async () => {
    const { result } = renderUseLoadingState();

    let promise: Promise<unknown>;
    act(() => {
      promise = result.current.runTask(() => mockTask());
    });

    // Use `waitFor` to ensure state updates before asserting
    await waitFor(() => expect(result.current.isLoading).toBe(true));

    await act(async () => {
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should handle multiple loading IDs and tasks correctly', async () => {
    const { result } = renderUseLoadingState();

    let promise: Promise<unknown>;
    let promise2: Promise<unknown>;

    act(() => {
      promise = result.current.runTask({
        loadingId: 'task1',
        task: () => mockTask(),
      });
    });

    await pause(500);

    act(() => {
      promise2 = result.current.runTask({
        loadingId: 'task2',
        task: () => mockTask(),
      });
    });

    // expect task1 to be loading
    await waitFor(() => expect(result.current.isIdLoading('task1')).toBe(true));
    await waitFor(() =>
      expect(result.current.loadingIds.has('task1')).toBe(true)
    );

    // expect task2 to be loading
    await waitFor(() => expect(result.current.isIdLoading('task2')).toBe(true));
    await waitFor(() =>
      expect(result.current.loadingIds.has('task2')).toBe(true)
    );

    await act(async () => {
      await promise;
    });

    // expect task1 to be not loading
    expect(result.current.isIdLoading('task1')).toBe(false);
    expect(result.current.loadingIds.has('task1')).toBe(false);

    // expect task2 to still be loading
    expect(result.current.isIdLoading('task2')).toBe(true);
    expect(result.current.loadingIds.has('task2')).toBe(true);

    await act(async () => {
      await promise2;
    });

    // expect task2 to be not loading
    expect(result.current.isIdLoading('task2')).toBe(false);
    expect(result.current.loadingIds.has('task2')).toBe(false);
  });

  it('should throw an error if no task is provided', async () => {
    const { result } = renderUseLoadingState();

    await expect(
      act(async () => {
        await result.current.runTask();
      })
    ).rejects.toThrowError(
      'useLoadingState task was not defined by the caller or the default task.'
    );
  });

  it('should handle rejected tasks and reset isLoading', async () => {
    const failingTask = vi.fn(() => Promise.reject(new Error('Task failed')));
    const { result } = renderUseLoadingState();

    await act(async () => {
      await expect(result.current.runTask(() => failingTask())).rejects.toThrow(
        'Task failed'
      );
    });

    expect(result.current.isLoading).toBe(false);
  });
});
