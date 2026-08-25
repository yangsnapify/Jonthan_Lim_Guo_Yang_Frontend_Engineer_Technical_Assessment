import { cancelBooking } from '@/api/booking/api';
import { useAsyncAction } from '@/hooks/useAsyncAction';

export function useCancelBooking() {
  const action = useAsyncAction(
    cancelBooking,
    'Unable to cancel booking.',
  );

  return {
    cancel: action.execute,
    loading: action.loading,
    error: action.error,
  };
}
