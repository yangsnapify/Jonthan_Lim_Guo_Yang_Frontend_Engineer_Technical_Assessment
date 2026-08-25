import type { Booking } from '@/api/booking/types';
import { PageHeading } from '@/components/pageHeading';
import { useBookingList } from '@/biz/pages/booking/hooks/useBookingList';
import {
  formatBookingTime,
  getBookingStatusLabel,
  isCancelled,
} from '@/biz/pages/booking/utils';

interface BookingListProps {
  onSelect: (id: string) => void;
}

export function BookingList({ onSelect }: BookingListProps) {
  const { bookings, loading, error, refresh } = useBookingList();

  if (loading) {
    return <p className="state-message">Loading bookings...</p>;
  }

  if (error) {
    return (
      <div className="state-message error">
        <p>{error}</p>
        <button type="button" className="secondary-button" onClick={refresh}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <section>
      <PageHeading
        eyebrow="My appointments"
        title="Booking history"
        description="View the status of your appointments or cancel a confirmed booking."
      />
      {bookings.length === 0 ? (
        <div className="empty-state">
          <h2>No bookings yet</h2>
          <p>Your confirmed appointments will appear here.</p>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}

interface BookingCardProps {
  booking: Booking;
  onSelect: (id: string) => void;
}

function BookingCard({ booking, onSelect }: BookingCardProps) {
  const cancelled = isCancelled(booking.status);

  return (
    <article className="booking-card">
      <div>
        <p className="booking-card-label">Appointment</p>
        <h2>{booking.name}</h2>
        <p>{booking.date} · {formatBookingTime(booking.start)}</p>
        <p className="booking-doctor">Doctor ID: {booking.doctorId}</p>
      </div>
      <div className="booking-card-actions">
        <span className={cancelled ? 'status-badge cancelled' : 'status-badge'}>
          {getBookingStatusLabel(booking)}
        </span>
        <button type="button" className="secondary-button" onClick={() => onSelect(booking.id)}>
          View booking
        </button>
      </div>
    </article>
  );
}
