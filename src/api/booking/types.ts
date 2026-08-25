export type BookingStatus =
  | 'cancelled'
  | 'confirmed';

export interface Booking {
  id: string;
  name: string;
  start: number;
  doctorId: string;
  date: string;
  status: BookingStatus;
}

export interface CreateBookingRequest {
  name: string;
  doctorId: string;
  start: number;
  date: string;
}
