
import { NewPatient, Gender, Entry,  HealthCheckEntryType } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};
const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};


const isDateOfBirth = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)) {
      throw new Error('Incorrect date: ' + dateOfBirth);
  }
  return dateOfBirth;
};
// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };
// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//       throw new Error('Incorrect date: ' + date);
//   }
//   return date;
// };

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (typeof gender !== 'string' || !isGender(gender.toLowerCase())) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender.toLowerCase() as Gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};
const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseGenericString = (value: unknown, label: string): string => {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${label}: ${value}`);
  }
  return value;
};

const parseGenericNumber = (value: unknown): number => {
  if (typeof value !== 'number') {
    throw new Error(`Incorrect or missing number: ${value}`);
  }
  return value;
};

const parseGenericArrayOfStrings = (value: unknown[], label: string): string[] => {
  if (!Array.isArray(value) || !value.every((x) => isString(x))) {
    throw new Error(`Incorrect or missing ${label}: ${value}`);
  }
  return value as string[];
};
export type EntryFormValues = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown[];
  type: unknown;
  employerName: unknown;
  discharge: {
      date: unknown;
      criteria: unknown;
  };
  sickleave: {
      startDate: unknown;
      endDate: unknown;
  };
  healthCheckRating: unknown;
};

export const ToNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: HealthCheckEntryType): HealthCheckEntryType => {
  return {
    type: 'HealthCheck',
    description: parseGenericString(description, 'description'),
    date: parseGenericString(date, 'date'),
    specialist: parseGenericString(specialist, 'specialist'),
    diagnosisCodes: parseGenericArrayOfStrings(
      diagnosisCodes,
      'diagnosisCodes'
    ),
    healthCheckRating: parseGenericNumber(healthCheckRating),
  };
};

export default toNewPatient ;