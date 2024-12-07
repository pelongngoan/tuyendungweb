import express from "express";

import authRoute from "./auth";
import userRoute from "./user";
import companyRoute from "./companies";
import jobRoute from "./job";

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}users`, userRoute);
router.use(`${path}companies`, companyRoute);
router.use(`${path}jobs`, jobRoute);

export default router;
