import { apiRequest } from '../api';
import type { Doctor } from '../../types/doctor';

export function getDoctors(): Promise<Doctor[]> {
  return apiRequest<Doctor[]>('/doctor');
}   

export function getDoctor(
  id: string,
): Promise<Doctor> {
  return apiRequest<Doctor>(`/doctor/${id}`);
}