export type DoctorDay =
  | 'MON'
  | 'TUE'
  | 'WED'
  | 'THU'
  | 'FRI'
  | 'SAT'
  | 'SUN';

export interface DoctorAddress {
  line_1: string;
  line_2: string;
  district: string;
}

export interface OpeningHour {
  start: string;
  end: string;
  isClosed: boolean;
  day: DoctorDay;
}

export interface Doctor {
  id: string;
  name: string;
  description: string;
  address: DoctorAddress;
  opening_hours: OpeningHour[];
}