import { useCallback, useState } from 'react';

import { AsyncTaskOptions } from './types';

export function useLoadingState<IdType extends string = string>(
  defaultTask?: () => Promise<unknown>
) {
  const [isLoading, setLoading] = useState(false);
  const [loadingIds, setLoadingIds] = useState<IdType[]>([]);

  const performAsyncTask = useCallback(
    (params?: AsyncTaskOptions<IdType>) => {
      const task =
        typeof params === 'function' ? params : (params?.task ?? defaultTask);
      const loadingId =
        typeof params === 'function' ? undefined : params?.loadingId;

      if (!task) {
        throw new Error(
          'useLoadingState task was not defined by the caller or the default task.'
        );
      }

      setLoading(true);

      if (loadingId) {
        setLoadingIds(prev => [...prev, loadingId]);
      }

      return task()
        .catch(e => {
          throw e;
        })
        .finally(() => {
          setLoading(false);
          setLoadingIds(prev => prev.filter(id => id !== loadingId));
        });
    },
    [defaultTask]
  );

  const isIdLoading = useCallback(
    (id: IdType) => loadingIds.includes(id),
    [loadingIds]
  );

  return [performAsyncTask, { isIdLoading, isLoading, loadingIds }] as const;
}
