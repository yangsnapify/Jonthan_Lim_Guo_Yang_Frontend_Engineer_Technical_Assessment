import type { AvailableSlot } from '@/biz/pages/booking/utils/availability';

interface TimeSlotPickerProps {
  date: string;
  slots: AvailableSlot[];
  selectedStart: number | null;
  loading: boolean;
  error: string | null;
  validationError?: string;
  onSelect: (start: number) => void;
}

export function TimeSlotPicker({
  date,
  slots,
  selectedStart,
  loading,
  error,
  validationError,
  onSelect,
}: TimeSlotPickerProps) {
  return (
    <div className="form-field">
      <label>Available time</label>
      {loading && <p className="availability-message">Loading available times...</p>}
      {!loading && error && <p className="field-error">{error}</p>}
      {!loading && !error && !date && (
        <p className="availability-message">Choose a date to see available appointment times.</p>
      )}
      {!loading && !error && date && slots.length === 0 && (
        <p className="availability-message">No appointments are available for this date.</p>
      )}
      {!loading && !error && slots.length > 0 && (
        <div className="time-slots">
          {slots.map((slot) => (
            <button
              key={slot.start}
              type="button"
              className={selectedStart === slot.start ? 'time-slot selected' : 'time-slot'}
              onClick={() => onSelect(slot.start)}
            >
              {slot.label}
            </button>
          ))}
        </div>
      )}
      {validationError && <p className="field-error">{validationError}</p>}
    </div>
  );
}
