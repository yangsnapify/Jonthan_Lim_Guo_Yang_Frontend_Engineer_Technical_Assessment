import { createBooking } from '@/api/booking/api';
import type { CreateBookingRequest } from '@/api/booking/types';
import { useAsyncAction } from '@/hooks/useAsyncAction';

export function useCreateBooking() {
  const action = useAsyncAction(
    createBooking,
    'Unable to create booking.',
  );

  return {
    booking: action.data,
    loading: action.loading,
    error: action.error,
    submit: (data: CreateBookingRequest) => action.execute(data),
  };
}
