import { BookingForm } from './components/bookingForm';

interface BookingPageProps {
  doctorId: string;
  onBack: () => void;
  onSuccess: () => void;
}

export default function BookingPage({
  doctorId,
  onBack,
  onSuccess,
}: BookingPageProps) {
  return (
    <section className="booking-page">
      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Back to doctor
      </button>

      <div className="page-heading">
        <p className="eyebrow">
          Book an appointment
        </p>

        <h1>Choose your appointment</h1>

        <p>
          Select a date and time, then enter your
          details to confirm your appointment.
        </p>
      </div>

      <BookingForm
        doctorId={doctorId}
        onSuccess={onSuccess}
      />
    </section>
  );
}