import { useState } from 'react';
import { createBooking } from '../../../../api/booking/api';
import type {
  Booking,
  CreateBookingRequest,
} from '../../../../api/booking/types';

export function useCreateBooking() {
  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function submit(
    data: CreateBookingRequest,
  ) {
    setLoading(true);
    setError(null);

    try {
      const result =
        await createBooking(data);

      setBooking(result);

      return result;
    } catch {
      setError(
        'Unable to create booking.',
      );

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    booking,
    loading,
    error,
    submit,
  };
}