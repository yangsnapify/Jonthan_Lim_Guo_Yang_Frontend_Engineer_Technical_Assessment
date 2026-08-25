import { useMemo, useState } from 'react';
import { useDoctorId } from '@/biz/pages/doctor/hooks/useDoctorId';
import { useBookingList } from '@/biz/pages/booking/hooks/useBookingList';
import {
  getAvailableSlots,
  getSuggestedDates,
  type AvailableSlot,
  type AvailableDate,
} from '@/biz/pages/booking/utils/availability';
import {
  validateBookingForm,
  type BookingFormErrors,
} from '@/biz/pages/booking/utils/validation';
import type { CreateBookingRequest } from '@/api/booking/types';

export type BookingFormPayload = CreateBookingRequest;

export function useBookingForm(
  doctorId: string,
) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] =
    useState<number | null>(null);

  const [errors, setErrors] =
    useState<BookingFormErrors>({});

  const {
    doctor,
    loading: doctorLoading,
    error: doctorError,
  } = useDoctorId(doctorId);

  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
  } = useBookingList();

  const availableSlots =
    useMemo<AvailableSlot[]>(() => {
      if (!doctor || !date) {
        return [];
      }

      return getAvailableSlots(
        doctor,
        bookings,
        date,
      );
    }, [doctor, bookings, date]);

  const suggestedDates =
    useMemo<AvailableDate[]>(() => {
      if (!doctor) {
        return [];
      }

      return getSuggestedDates(doctor, bookings);
    }, [doctor, bookings]);

  function handleDateChange(
    value: string,
  ) {
    setDate(value);
    setStart(null);

    setErrors((current) => ({
      ...current,
      date: undefined,
      start: undefined,
    }));
  }

  function handleStartChange(
    value: number,
  ) {
    setStart(value);

    setErrors((current) => ({
      ...current,
      start: undefined,
    }));
  }

  function validate(): boolean {
    const nextErrors = validateBookingForm({
      name,
      date,
      start,
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function getPayload():
    | BookingFormPayload
    | null {
    if (!validate() || start === null) {
      return null;
    }

    return {
      name: name.trim(),
      doctorId,
      start,
      date,
    };
  }

  return {
    name,
    date,
    start,

    errors,

    availableSlots,
    suggestedDates,

    doctorLoading,
    bookingsLoading,

    doctorError,
    bookingsError,

    setName,
    setDate: handleDateChange,
    setStart: handleStartChange,

    getPayload,
  };
}
