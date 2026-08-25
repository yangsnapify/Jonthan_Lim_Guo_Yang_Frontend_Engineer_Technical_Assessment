import { useCallback } from 'react';
import { getDoctor } from '@/api/doctor/doctor.api';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { Doctor } from '@/types/doctor';

interface UseDoctorIdResult {
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

export function useDoctorId(
  id: string,
): UseDoctorIdResult {
  const loadDoctor = useCallback(
    () => getDoctor(id),
    [id],
  );

  const resource = useAsyncResource<Doctor | null>({
    initialData: null,
    load: loadDoctor,
    errorMessage: 'Unable to load doctor information.',
  });

  return {
    doctor: resource.data,
    loading: resource.loading,
    error: resource.error,
  };
}
