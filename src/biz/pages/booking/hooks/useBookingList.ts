import { getBookings } from '@/api/booking/api';
import type { Booking } from '@/api/booking/types';
import { useAsyncResource } from '@/hooks/useAsyncResource';

export function useBookingList() {
  const resource = useAsyncResource<Booking[]>({
    initialData: [],
    load: getBookings,
    errorMessage: 'Unable to load bookings.',
  });

  return {
    bookings: resource.data,
    loading: resource.loading,
    error: resource.error,
    refresh: resource.refresh,
  };
}
