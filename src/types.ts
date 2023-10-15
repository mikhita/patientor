// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

// export type NonSensitiveDiaryEntry = Omit<Patients, 'comment'>;

export type NonSensitivePatients = Omit<Patients, 'ssn'>;
export type NonSensitiveDiagnoses = Omit<Diagnosis, 'latin'>;


// export interface DiaryEntry {
//   id: number;
//   date: string;
//   weather: Weather;
//   visibility: Visibility;
//   comment?: string;
// }

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patients {
  id: string,
  name: string,
  ssn?: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string
}

export type NewPatient = Omit<Patients, 'id'>;

