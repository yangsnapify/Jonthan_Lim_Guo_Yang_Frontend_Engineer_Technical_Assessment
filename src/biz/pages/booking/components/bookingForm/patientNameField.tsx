interface PatientNameFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function PatientNameField({
  value,
  error,
  onChange,
}: PatientNameFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor="patient-name">Patient name</label>
      <input
        id="patient-name"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter your name"
        autoComplete="name"
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
