import { useState } from 'react';
import type { CreateBookingRequest } from '../../../../api/booking/types';

interface BookingFormErrors {
  name?: string;
  date?: string;
  start?: string;
}

export function useBookingForm(doctorId: string) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState<number | null>(null);
  const [errors, setErrors] =
    useState<BookingFormErrors>({});

  function validate() {
    const nextErrors: BookingFormErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!date) {
      nextErrors.date = 'Please select a date.';
    }

    if (start === null) {
      nextErrors.start = 'Please select a time.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function getPayload(): CreateBookingRequest | null {
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
    setName,
    setDate,
    setStart,
    validate,
    getPayload,
  };
}