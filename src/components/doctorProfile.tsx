import { useDoctorId } from '../hooks/useDoctorId';

interface DoctorProfileProps {
  doctorId: string;
  onBack: () => void;
}

export function DoctorProfile({
  doctorId,
  onBack,
}: DoctorProfileProps) {
  const {
    doctor,
    loading,
    error,
  } = useDoctorId(doctorId);

  if (loading) {
    return (
      <p className="state-message">
        Loading doctor profile...
      </p>
    );
  }

  if (error) {
    return (
      <section className="doctor-profile">
        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to doctors
        </button>

        <p className="state-message error">
          {error}
        </p>
      </section>
    );
  }

  if (!doctor) {
    return null;
  }

  return (
    <section className="doctor-profile">
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to doctors
      </button>

      <div className="profile-header">
        <div className="doctor-avatar large">
          {doctor.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="eyebrow">
            Doctor profile
          </p>

          <h1>{doctor.name}</h1>

          <p>{doctor.description}</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-section">
          <h2>Clinic</h2>

          <p>{doctor.address.line_1}</p>

          {doctor.address.line_2 && (
            <p>{doctor.address.line_2}</p>
          )}

          <p>{doctor.address.district}</p>
        </div>

        <div className="profile-section">
          <h2>Opening hours</h2>

          <div className="opening-hours">
            {doctor.opening_hours.map((hour) => (
              <div
                className="opening-hour"
                key={hour.day}
              >
                <span>{hour.day}</span>

                <span>
                  {hour.isClosed
                    ? 'Closed'
                    : `${hour.start} - ${hour.end}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}