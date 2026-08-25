import type { Booking } from '@/api/booking/types';
import { Modal } from '@/components/modal';

interface BookingSuccessModalProps {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
}

export function BookingSuccessModal({
  open,
  booking,
  onClose,
}: BookingSuccessModalProps) {
  return (
    <Modal open={open} title="Booking confirmed" onClose={onClose}>
      <div className="booking-success">
        <div className="success-icon" aria-hidden="true">✓</div>
        <p>Your appointment has been successfully booked.</p>
        {booking && <p className="booking-reference">Reference: {booking.id}</p>}
        <button type="button" className="primary-button" onClick={onClose}>
          View my bookings
        </button>
      </div>
    </Modal>
  );
}
