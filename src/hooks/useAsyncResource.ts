import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getErrorMessage } from '@/utils/error';

interface AsyncResourceOptions<T> {
  initialData: T;
  load: () => Promise<T>;
  errorMessage: string;
}

export function useAsyncResource<T>({
  initialData,
  load,
  errorMessage,
}: AsyncResourceOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const currentRequest = ++requestId.current;

    setLoading(true);
    setError(null);

    try {
      const result = await load();
      if (currentRequest === requestId.current) {
        setData(result);
      }
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        setError(getErrorMessage(requestError, errorMessage));
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, [load, errorMessage]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
