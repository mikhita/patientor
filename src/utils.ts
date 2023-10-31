
import { NewPatient, Gender, Entry, NewEntry } from './types';

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
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

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
  if (!value || !isString(value)) {
      throw new Error('Incorrect or missing' + label + ' ' + value);
  }
  return value;
};

const parseGenericNumber = (value: unknown): number => {
  return Number(value);
};

const parseGenericArrayOfStrings = (
  value: unknown,
  label: string
): string[] => {
  if (!Array.isArray(value) || !value) {
      throw new Error('Incorrect or missing' + label + ' ' + value);
  }

  value.filter((x) => isString(x));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value;
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
  type,
  employerName,
  discharge,
  sickleave,
  healthCheckRating,
}: EntryFormValues): NewEntry => {
  switch (type) {
      case 'OccupationalHealthcare':
          const entrOccup = {
              description: parseGenericString(description, 'description'),
              date: parseDate(date),
              specialist: parseGenericString(specialist, 'specialist'),
              diagnosisCodes: parseGenericArrayOfStrings(
                  diagnosisCodes,
                  'diag codes'
              ),
              type: 'OccupationalHealthcare' as const,
              employerName: parseGenericString(employerName, 'employer name'),
              sickLeave: {
                  startDate: parseDate(sickleave.startDate),
                  endDate: parseDate(sickleave.endDate),
              },
              healthCheckRating: parseGenericNumber(healthCheckRating),
          };
          return entrOccup;
      case 'Hospital':
          const entrHos = {
              description: parseGenericString(description, 'description'),
              date: parseDate(date),
              specialist: parseGenericString(specialist, 'specialist'),
              diagnosisCodes: parseGenericArrayOfStrings(
                  diagnosisCodes,
                  'diag codes'
              ),
              type: 'Hospital' as const,
              discharge: {
                  date: parseDate(discharge.date),
                  criteria: parseGenericString(
                      discharge.criteria,
                      'criteria'
                  ),
              },
          };
          return entrHos;
      case 'HealthCheck':
          const entrCheck = {
              description: parseGenericString(description, 'description'),
              date: parseDate(date),
              specialist: parseGenericString(specialist, 'specialist'),
              diagnosisCodes: parseGenericArrayOfStrings(
                  diagnosisCodes,
                  'diag codes'
              ),
              type: 'HealthCheck' as const,
              healthCheckRating: parseGenericNumber(healthCheckRating),
          };
          return entrCheck;
      default:
          throw Error;
  }
};

export default toNewPatient ;