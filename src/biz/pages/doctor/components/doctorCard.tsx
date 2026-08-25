import type { Doctor } from '../../../../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (id: string) => void;
}

export function DoctorCard({
  doctor,
  onSelect,
}: DoctorCardProps) {
  return (
    <article className="doctor-card">
      <div className="doctor-avatar">
        {doctor.name.charAt(0).toUpperCase()}
      </div>

      <div className="doctor-card-content">
        <p className="doctor-label">Doctor</p>

        <h2>{doctor.name}</h2>

        <p className="doctor-description">
          {doctor.description}
        </p>

        <p className="doctor-location">
          {doctor.address.district}
        </p>

        <button
          type="button"
          className="doctor-profile-button"
          onClick={() => onSelect(doctor.id)}
        >
          <span>View profile</span>
          <span className="doctor-profile-arrow">→</span>
        </button>
      </div>
    </article>
  );
}