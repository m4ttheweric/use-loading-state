import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useLoadingState } from './useLoadingState';

const mockTask = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));

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
      promise = result.current.runTask(() => mockTask()); // Call runTask with mockTask
    });

    expect(result.current.isLoading).toBe(true); // isLoading should be true after calling runTask

    await act(async () => {
      await promise; // Wait for the task to complete
    });

    expect(result.current.isLoading).toBe(false); // isLoading should be false after task completion
  });

  it('should handle loading IDs correctly', async () => {
    const { result } = renderUseLoadingState();

    let promise: Promise<unknown>;

    act(() => {
      promise = result.current.runTask({
        loadingId: 'task1',
        task: () => mockTask(),
      });
    });

    expect(result.current.isIdLoading('task1')).toBe(true);
    expect(result.current.loadingIds.has('task1')).toBe(true);

    await act(async () => {
      await promise; // Wait for the task to complete
    });

    expect(result.current.isIdLoading('task1')).toBe(false);
    expect(result.current.loadingIds.has('task1')).toBe(false);
  });

  it('should throw an error if no task is provided', async () => {
    const { result } = renderUseLoadingState();

    await expect(async () => {
      await act(async () => {
        await result.current.runTask();
      });
    }).rejects.toThrowError(
      'useLoadingState task was not defined by the caller or the default task.'
    );
  });

  it('should handle rejected tasks and reset isLoading', async () => {
    const failingTask = vi.fn(() => Promise.reject(new Error('Task failed')));
    const { result } = renderUseLoadingState();

    await expect(async () => {
      await act(async () => {
        await result.current.runTask(() => failingTask());
      });
    }).rejects.toThrow('Task failed');

    expect(result.current.isLoading).toBe(false);
  });
});
