import express from "express";

import diagnoseServices from '../services/diagnoseServices';

const router = express.Router();


router.get('/', (_req, res) => {
  res.send(diagnoseServices.getNonSensitiveDiagnoses());
});

// router.post("/api/patient", (_res, req)=>{
//   req.send("new patient added");
// });

export default router;