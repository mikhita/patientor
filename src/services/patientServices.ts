import patientsData from "../../data/patients";


import { NonSensitivePatients, Patients } from '../types';

const patients: Patients[] = patientsData; 


const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { getNonSensitivePatients };