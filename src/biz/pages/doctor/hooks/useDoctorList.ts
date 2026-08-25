import { getDoctors } from '@/api/doctor/doctor.api';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { Doctor } from '@/types/doctor';

export function useDoctorList() {
  const resource = useAsyncResource<Doctor[]>({
    initialData: [],
    load: getDoctors,
    errorMessage: 'Unable to load doctors.',
  });

  return {
    doctors: resource.data,
    loading: resource.loading,
    error: resource.error,
    refresh: resource.refresh,
  };
}
