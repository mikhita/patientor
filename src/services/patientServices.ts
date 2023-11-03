import { v1 as uuidv1 } from 'uuid';
import patientsData from "../../data/patients";

import { NewPatient, NonSensitivePatient, Patient,  Entry } from '../types';

const patients: Patient[] = patientsData; 
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const ID: string = uuidv1();

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatientById = (id: string) => {
  // Find and return the patient with the specified ID
  return patients.find((patient) => patient.id === id);
};

const addPatient= ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: ID,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
  const patient = getPatientById(patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  // Generate a unique entry ID (you can implement this logic)
  const newEntry: Entry = { ...entry, id: ID };

  patient.entries.push(newEntry);
  return newEntry;
};








export default { getNonSensitivePatients, addPatient, getPatientById , addEntry};