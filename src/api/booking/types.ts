export type BookingStatus =
  | 'cancel'
  | 'confirmed';

export interface Booking {
  id: string;
  name: string;
  start: number;
  doctorId: string;
  date: string;
  status: BookingStatus;
}