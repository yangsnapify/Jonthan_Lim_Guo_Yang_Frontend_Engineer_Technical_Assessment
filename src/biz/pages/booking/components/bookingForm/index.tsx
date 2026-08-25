import { useModal } from '@/hooks/useModal';
import { useCreateBooking } from '@/biz/pages/booking/hooks/useCreateBooking';
import { useBookingForm } from '@/biz/pages/booking/hooks/useBookingForm';
import { AppointmentDateField } from './appointmentDateField';
import { BookingSuccessModal } from './bookingSuccessModal';
import { PatientNameField } from './patientNameField';
import { TimeSlotPicker } from './timeSlotPicker';

interface BookingFormProps {
  doctorId: string;
  onSuccess: () => void;
}

export function BookingForm({ doctorId, onSuccess }: BookingFormProps) {
  const form = useBookingForm(doctorId);
  const createBooking = useCreateBooking();
  const successModal = useModal();

  const availabilityLoading = form.doctorLoading || form.bookingsLoading;
  const availabilityError = form.doctorError || form.bookingsError;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = form.getPayload();
    if (!payload) {
      return;
    }

    const booking = await createBooking.submit(payload);
    if (booking) {
      successModal.show();
    }
  }

  function handleSuccessComplete() {
    successModal.hide();
    onSuccess();
  }

  return (
    <>
      <form className="booking-form" onSubmit={handleSubmit}>
        <PatientNameField
          value={form.name}
          error={form.errors.name}
          onChange={form.setName}
        />
        <AppointmentDateField
          value={form.date}
          error={form.errors.date}
          suggestions={form.suggestedDates}
          onChange={form.setDate}
        />
        <TimeSlotPicker
          date={form.date}
          slots={form.availableSlots}
          selectedStart={form.start}
          loading={availabilityLoading}
          error={availabilityError}
          validationError={form.errors.start}
          onSelect={form.setStart}
        />
        {createBooking.error && (
          <div className="booking-error" role="alert">
            <strong>Booking could not be completed</strong>
            <p>{createBooking.error}</p>
          </div>
        )}
        <button
          type="submit"
          className="primary-button"
          disabled={createBooking.loading || availabilityLoading}
        >
          {createBooking.loading ? 'Booking...' : 'Confirm appointment'}
        </button>
      </form>
      <BookingSuccessModal
        open={successModal.open}
        booking={createBooking.booking}
        onClose={handleSuccessComplete}
      />
    </>
  );
}
