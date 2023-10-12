// import patientData from "../../data/patients";

import diagnosesData from "../../data/diagnoses";


import { NonSensitiveDiagnoses, Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData; 



// const patients: DiaryEntry[] = patientData;

// const getAllPatients = () =>{
//   return patients;
// };

// const addPatient  = ()=>{
//   return null;
// };

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
//   return patients.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };

const getNonSensitiveDiagnoses = (): NonSensitiveDiagnoses[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin
  }));
};


export default { getNonSensitiveDiagnoses };