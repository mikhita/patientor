import express from "express";

import patientServices from "../services/patientServices";
import toNewPatient from "../utils";


const router = express.Router();


router.get('/', (_req, res) => {
  res.send(patientServices.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
  const { id } = req.params; // Extract the patient's ID from the request parameters

  // Find the patient with the specified ID using your patientServices
  const patient = patientServices.getPatientById(id);

  if (patient) {
    // If a patient with the specified ID is found, return it
    res.json(patient);
  } else {
    // If the patient is not found, return a 404 Not Found response
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

export default router;