import { useCallback } from 'react';
import { getBooking } from '@/api/booking/api';
import type { Booking } from '@/api/booking/types';
import { useAsyncResource } from '@/hooks/useAsyncResource';

export function useBookingId(id: string) {
  const loadBooking = useCallback(
    () => getBooking(id),
    [id],
  );

  const resource = useAsyncResource<Booking | null>({
    initialData: null,
    load: loadBooking,
    errorMessage: 'Unable to load booking.',
  });

  return {
    booking: resource.data,
    loading: resource.loading,
    error: resource.error,
  };
}
