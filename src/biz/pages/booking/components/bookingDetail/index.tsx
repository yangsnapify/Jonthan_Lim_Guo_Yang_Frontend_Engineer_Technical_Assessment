import { Modal } from '@/components/modal';
import { BackButton } from '@/components/backButton';
import { PageHeading } from '@/components/pageHeading';
import { useModal } from '@/hooks/useModal';
import { useBookingId } from '@/biz/pages/booking/hooks/useBookingId';
import { useCancelBooking } from '@/biz/pages/booking/hooks/useCancelBooking';
import {
  formatBookingTime,
  getBookingStatusLabel,
  isCancelled,
} from '@/biz/pages/booking/utils';

interface BookingDetailProps {
  bookingId: string;
  onBack: () => void;
}

export function BookingDetail({ bookingId, onBack }: BookingDetailProps) {
  const { booking, loading, error } = useBookingId(bookingId);
  const { cancel, loading: cancelling, error: cancelError } = useCancelBooking();
  const confirmation = useModal();

  async function handleCancel() {
    const result = await cancel(bookingId);
    if (result) {
      confirmation.hide();
      onBack();
    }
  }

  if (loading) return <p className="state-message">Loading booking...</p>;
  if (error || !booking) return <p className="state-message error">{error ?? 'Booking not found.'}</p>;

  const cancelled = isCancelled(booking.status);

  return (
    <section className="booking-detail">
      <BackButton onClick={onBack}>Back to bookings</BackButton>
      <PageHeading eyebrow="Appointment details" title={booking.name} description="Review this appointment and its current status." />
      <div className="detail-card">
        <div><span>Date</span><strong>{booking.date}</strong></div>
        <div><span>Time</span><strong>{formatBookingTime(booking.start)}</strong></div>
        <div><span>Doctor ID</span><strong>{booking.doctorId}</strong></div>
        <div><span>Status</span><strong>{getBookingStatusLabel(booking)}</strong></div>
      </div>
      {!cancelled && <button type="button" className="danger-button" onClick={confirmation.show}>Cancel appointment</button>}
      {cancelError && <p className="field-error" role="alert">{cancelError}</p>}
      <Modal open={confirmation.open} title="Cancel appointment?" onClose={confirmation.hide}>
        <div className="confirmation-content">
          <p>This appointment will remain in your history with a cancelled status.</p>
          <div className="confirmation-actions">
            <button type="button" className="secondary-button" onClick={confirmation.hide}>Keep appointment</button>
            <button type="button" className="danger-button" onClick={handleCancel} disabled={cancelling}>
              {cancelling ? 'Cancelling...' : 'Cancel appointment'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
