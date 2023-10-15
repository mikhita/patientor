import express from "express";

import patientServices from "../services/patientServices";


const router = express.Router();


router.get('/', (_req, res) => {
  res.send(patientServices.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, gender, occupation } = _req.body;
  const addedPatient = patientServices.addPatient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dateOfBirth,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    gender,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    occupation,
  });
  res.json(addedPatient);
});

export default router;