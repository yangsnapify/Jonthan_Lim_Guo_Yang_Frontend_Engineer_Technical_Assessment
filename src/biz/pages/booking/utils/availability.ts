import dayjs from 'dayjs';
import type { Booking } from '@/api/booking/types';
import type { Doctor } from '@/api/doctor/types';
import { formatBookingTime } from './index';

export interface AvailableSlot {
  start: number;
  label: string;
}

export interface AvailableDate {
  value: string;
  label: string;
}

function timeToNumber(time: string): number {
  const [hours, minutes] = time
    .split(/[.:]/)
    .map(Number);

  return hours + minutes / 60;
}

function isSameDate(
  booking: Booking,
  date: string,
): boolean {
  return booking.date === date;
}

function isSlotBooked(
  bookings: Booking[],
  date: string,
  start: number,
): boolean {
  return bookings.some(
    (booking) =>
      isSameDate(booking, date) &&
      booking.start === start &&
      booking.status === 'confirmed',
  );
}

export function getAvailableSlots(
  doctor: Doctor,
  bookings: Booking[],
  date: string,
): AvailableSlot[] {
  const selectedDate = dayjs(date);

  if (!selectedDate.isValid()) {
    return [];
  }

  const today = dayjs();

  const selectedDay = selectedDate
    .format('ddd')
    .toUpperCase();

  const openingHour = doctor.opening_hours.find(
    (hour) => hour.day === selectedDay,
  );

  if (
    !openingHour ||
    openingHour.isClosed
  ) {
    return [];
  }

  const opening = timeToNumber(
    openingHour.start,
  );

  const closing = timeToNumber(
    openingHour.end,
  );

  const slots: AvailableSlot[] = [];

  for (
    let start = opening;
    start + 1 <= closing;
    start += 1
  ) {
    const slotDateTime = selectedDate
      .hour(Math.floor(start))
      .minute((start % 1) * 60)
      .second(0)
      .millisecond(0);

    if (
      selectedDate.isSame(
        today,
        'day',
      ) &&
      !slotDateTime.isAfter(today)
    ) {
      continue;
    }

    if (
      isSlotBooked(
        bookings,
        date,
        start,
      )
    ) {
      continue;
    }

    slots.push({
      start,
      label: formatBookingTime(start),
    });
  }

  return slots;
}

export function getSuggestedDates(
  doctor: Doctor,
  bookings: Booking[],
): AvailableDate[] {
  const dates: AvailableDate[] = [];
  const today = dayjs().startOf('day');

  for (let offset = 0; offset < 21 && dates.length < 5; offset += 1) {
    const candidate = today.add(offset, 'day');
    const value = candidate.format('YYYY-MM-DD');

    if (getAvailableSlots(doctor, bookings, value).length > 0) {
      dates.push({
        value,
        label: candidate.format('ddd, D MMM'),
      });
    }
  }

  return dates;
}
