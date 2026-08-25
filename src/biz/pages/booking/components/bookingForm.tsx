import { useBookingForm } from '../hooks/useBookingForm';
import { useCreateBooking } from '../hooks/useCreateBooking';

interface BookingFormProps {
  doctorId: string;
  onSuccess: () => void;
}

export function BookingForm({
  doctorId,
  onSuccess,
}: BookingFormProps) {
  const {
    name,
    date,
    start,
    errors,
    setName,
    setDate,
    setStart,
    getPayload,
  } = useBookingForm(doctorId);

  const {
    loading,
    error,
    submit,
  } = useCreateBooking();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const payload = getPayload();

    if (!payload) {
      return;
    }

    const booking = await submit(payload);

    if (booking) {
      onSuccess();
    }
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <label htmlFor="patient-name">
          Patient name
        </label>

        <input
          id="patient-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Enter your name"
          autoComplete="name"
        />

        {errors.name && (
          <p className="field-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="booking-date">
          Appointment date
        </label>

        <input
          id="booking-date"
          type="date"
          value={date}
          onChange={(event) =>
            setDate(event.target.value)
          }
        />

        {errors.date && (
          <p className="field-error">
            {errors.date}
          </p>
        )}
      </div>

      <div className="form-field">
        <label>
          Available time
        </label>

        <div className="time-slots">
          <button
            type="button"
            className={
              start === 10
                ? 'time-slot selected'
                : 'time-slot'
            }
            onClick={() => setStart(10)}
          >
            10:00 AM
          </button>
        </div>

        {errors.start && (
          <p className="field-error">
            {errors.start}
          </p>
        )}
      </div>

      {error && (
        <p className="state-message error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="primary-button"
        disabled={loading}
      >
        {loading
          ? 'Booking...'
          : 'Confirm appointment'}
      </button>
    </form>
  );
}