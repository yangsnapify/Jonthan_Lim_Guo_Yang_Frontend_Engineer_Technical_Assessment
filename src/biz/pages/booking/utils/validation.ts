export interface BookingFormValues {
  name: string;
  date: string;
  start: number | null;
}

export interface BookingFormErrors {
  name?: string;
  date?: string;
  start?: string;
}

export function validateBookingForm(
  values: BookingFormValues,
): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!values.date) {
    errors.date = 'Please select a date.';
  }

  if (values.start === null) {
    errors.start = 'Please select a time.';
  }

  return errors;
}
