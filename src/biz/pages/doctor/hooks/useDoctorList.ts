import { useEffect, useState } from 'react';
import type { Doctor } from '../../../../types/doctor';
import { getDoctors } from '../../../../api/doctor/doctor.api';

export function useDoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getDoctors()
      .then((data) => {
        if (active) {
          setDoctors(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load doctors.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    doctors,
    loading,
    error,
  };
}