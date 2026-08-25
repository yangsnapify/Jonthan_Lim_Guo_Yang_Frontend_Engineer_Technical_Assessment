import { BackButton } from '@/components/backButton';
import { PageHeading } from '@/components/pageHeading';
import { BookingForm } from '@/biz/pages/booking/components/bookingForm';

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
      <BackButton onClick={onBack}>Back to doctor</BackButton>

      <PageHeading
        eyebrow="Book an appointment"
        title="Choose your appointment"
        description="Select a date and time, then enter your details to confirm your appointment."
      />

      <BookingForm
        doctorId={doctorId}
        onSuccess={onSuccess}
      />
    </section>
  );
}
