import { useCallback, useState } from 'react';
import { getErrorMessage } from '@/utils/error';

export function useAsyncAction<Result, Args extends unknown[]>(
  action: (...args: Args) => Promise<Result>,
  errorMessage: string,
) {
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: Args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await action(...args);
      setData(result);
      return result;
    } catch (actionError) {
      setError(getErrorMessage(actionError, errorMessage));
      return null;
    } finally {
      setLoading(false);
    }
  }, [action, errorMessage]);

  return { data, loading, error, execute };
}
