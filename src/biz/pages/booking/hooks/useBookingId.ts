import { useEffect, useState } from 'react';
import { getBooking } from '../../../../api/booking/api';
import type { Booking } from '../../../../api/booking/types';

export function useBookingId(id: string) {
  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    getBooking(id)
      .then((data) => {
        if (active) {
          setBooking(data);
        }
      })
      .catch(() => {
        if (active) {
          setBooking(null);
          setError(
            'Unable to load booking.',
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  return {
    booking,
    loading,
    error,
  };
}