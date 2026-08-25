import { ApiError } from '@/api/api';

export function getErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
