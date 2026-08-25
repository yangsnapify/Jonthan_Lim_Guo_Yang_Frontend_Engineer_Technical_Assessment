import { useEffect, useState } from 'react';
import { getBookings } from '../../../../api/booking/api';
import type { Booking } from '../../../../api/booking/types';

export function useBookingList() {
  const [bookings, setBookings] = useState<Booking[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let active = true;

    getBookings()
      .then((data) => {
        if (active) {
          setBookings(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load bookings.');
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
  }, []);

  return {
    bookings,
    loading,
    error,
  };
}