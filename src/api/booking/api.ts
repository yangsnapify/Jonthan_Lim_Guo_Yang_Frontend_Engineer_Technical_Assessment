import { apiRequest } from '../api';
import type { Booking } from './types';

export interface CreateBookingRequest {
  name: string;
  doctorId: string;
  start: number;
  date: string;
}

export function getBookings(): Promise<Booking[]> {
  return apiRequest<Booking[]>('/booking');
}

export function getBooking(
  id: string,
): Promise<Booking> {
  return apiRequest<Booking>(`/booking/${id}`);
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
  return apiRequest<Booking>(`/booking/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: 'cancel',
    }),
  });
}