import { useDoctorList } from '../hooks/useDoctorList';
import { DoctorCard } from './doctorCard';

interface DoctorListProps {
  onSelect: (id: string) => void;
}

export function DoctorList({
  onSelect,
}: DoctorListProps) {
  const {
    doctors,
    loading,
    error,
  } = useDoctorList();

  if (loading) {
    return (
      <p className="state-message">
        Loading doctors...
      </p>
    );
  }

  if (error) {
    return (
      <p className="state-message error">
        {error}
      </p>
    );
  }

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">Find your doctor</p>

        <h1>Choose a doctor</h1>

        <p>
          Browse our available doctors and find a
          convenient appointment time.
        </p>
      </div>

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}