import { useEffect, useState } from 'react';
import { logger } from '@rainbow-me/utils';

export type Async<T> = Promise<T> | (() => Promise<T>);

export const useAsync = <T>(promiseLike: Async<T>, deps?: any[]) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [value, setValue] = useState<T | undefined>();
  useEffect(() => {
    setLoading(true);
    let cancel = false;
    (async () => {
      const promise: Promise<T> =
        typeof promiseLike === 'function' ? promiseLike() : promiseLike;
      try {
        await promise;
        if (cancel) return;
        setLoading(false);
        setValue(value);
      } catch (error) {
        if (cancel) return;
        setLoading(false);
        setError(new Error(`Error loading Promise in useAsync hook: ${error}`));
      }
    })();
    return () => {
      cancel = true;
    };
  }, deps);

  return { error, loading, value };
};

export const useAsyncWithFallback = <T>(
  promise: Async<T>,
  fallback: T,
  deps?: any[]
) => {
  const { error, loading, value } = useAsync(promise, deps);
  /**
   * If the promise is still loading, or there was an error, revert to the
   * fallback data.
   */
  if (error || loading) {
    if (error) {
      logger.log(`Error resolving Promise: ${error}`);
    }

    if (loading) {
      logger.log(`Promise still loading. Reverting to fallback.`);
    }

    return fallback;
  }

  return value;
};
