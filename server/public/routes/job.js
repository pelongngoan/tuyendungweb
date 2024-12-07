"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const job_1 = require("../controllers/job");
const router = express_1.default.Router();
// POST JOB
router.post("/upload-job", auth_1.default, job_1.createJob);
// IPDATE JOB
router.put("/update-job/:jobId", auth_1.default, job_1.updateJob);
// GET JOB POST
router.get("/find-jobs", job_1.getJobPosts);
router.get("/get-job-detail/:id", job_1.getJobById);
// DELETE JOB POST
router.delete("/delete-job/:id", auth_1.default, job_1.deleteJobPost);
exports.default = router;
