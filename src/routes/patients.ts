import express from "express";

import patientServices from "../services/patientServices";
import toNewPatient, { ToNewEntry } from "../utils";




const router = express.Router();


router.get('/', (_req, res) => {
  res.send(patientServices.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
  const { id } = req.params; 

  const patient = patientServices.getPatientById(id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newEntry = ToNewEntry(req.body);

  const updatedPatient = patientServices.addEntry(req.params.id, newEntry);

  res.json(updatedPatient);
});


export default router;