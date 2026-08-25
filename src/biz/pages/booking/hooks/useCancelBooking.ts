import { useState } from 'react';
import { cancelBooking } from '../../../../api/booking/api';

export function useCancelBooking() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function cancel(id: string) {
    setLoading(true);
    setError(null);

    try {
      return await cancelBooking(id);
    } catch {
      setError(
        'Unable to cancel booking.',
      );

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    cancel,
    loading,
    error,
  };
}