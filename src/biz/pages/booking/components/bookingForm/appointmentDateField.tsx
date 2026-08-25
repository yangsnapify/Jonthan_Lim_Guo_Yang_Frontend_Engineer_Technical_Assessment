import type { AvailableDate } from '@/biz/pages/booking/utils/availability';

interface AppointmentDateFieldProps {
  value: string;
  error?: string;
  suggestions: AvailableDate[];
  onChange: (value: string) => void;
}

export function AppointmentDateField({
  value,
  error,
  suggestions,
  onChange,
}: AppointmentDateFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor="booking-date">Appointment date</label>
      <input
        id="booking-date"
        type="date"
        value={value}
        min={new Date().toISOString().split('T')[0]}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p className="field-error">{error}</p>}
      {suggestions.length > 0 && (
        <div className="suggested-dates">
          <p>Next available dates</p>
          <div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.value}
                type="button"
                className={value === suggestion.value ? 'date-option selected' : 'date-option'}
                onClick={() => onChange(suggestion.value)}
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
