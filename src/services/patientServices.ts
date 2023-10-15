import { v1 as uuidv1 } from 'uuid';
import patientsData from "../../data/patients";

import { NewPatient, NonSensitivePatients, Patients } from '../types';

const patients: Patients[] = patientsData; 
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const ID: string = uuidv1();

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient= ( patient: NewPatient ): Patients => {
  const newPatient = {
    id: ID,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatients, addPatient };