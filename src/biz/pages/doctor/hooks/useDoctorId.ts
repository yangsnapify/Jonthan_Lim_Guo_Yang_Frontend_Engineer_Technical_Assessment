import { useEffect, useState } from 'react';
import { getDoctor } from '../../../../api/doctor/doctor.api';
import type { Doctor } from '../../../../types/doctor';

interface UseDoctorIdResult {
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

export function useDoctorId(
  id: string,
): UseDoctorIdResult {
  const [doctor, setDoctor] =
    useState<Doctor | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    getDoctor(id)
      .then((data) => {
        if (active) {
          setDoctor(data);
        }
      })
      .catch(() => {
        if (active) {
          setDoctor(null);
          setError(
            'Unable to load doctor information.',
          );
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
  }, [id]);

  return {
    doctor,
    loading,
    error,
  };
}