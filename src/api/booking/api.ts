import { apiRequest } from '@/api/api';
import type {
  Booking,
  CreateBookingRequest,
} from './types';

export function getBookings(): Promise<Booking[]> {
  return apiRequest<Booking[]>('/booking');
}

export function getBooking(
  id: string,
): Promise<Booking> {
  return apiRequest<Booking>(
    `/booking/${id}`,
  );
}

export function createBooking(
  data: CreateBookingRequest,
): Promise<Booking> {
  return apiRequest<Booking>('/booking', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function cancelBooking(
  id: string,
): Promise<Booking> {
  return updateBookingStatus(id, 'cancelled');
}

export function updateBookingStatus(
  id: string,
  status: Booking['status'],
): Promise<Booking> {
  return apiRequest<Booking>(
    `/booking/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        status,
      }),
    },
  );
}
