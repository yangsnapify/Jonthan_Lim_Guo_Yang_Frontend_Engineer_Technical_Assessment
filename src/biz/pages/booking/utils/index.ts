import type { Booking, BookingStatus } from '@/api/booking/types';

export function formatBookingTime(start: number): string {
  const hours = Math.floor(start);
  const minutes = Math.round((start - hours) * 60);
  const displayHour = hours % 12 || 12;
  const period = hours >= 12 ? 'PM' : 'AM';

  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function isCancelled(status: BookingStatus): boolean {
  return status === 'cancelled';
}

export function getBookingStatusLabel(booking: Booking): string {
  return isCancelled(booking.status) ? 'Cancelled' : 'Confirmed';
}
