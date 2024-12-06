import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IJob } from "../api/types";

const AdminJobLayout = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [jobForm, setJobForm] = useState<IJob>({
    _id: "",
    company: "",
    jobTitle: "",
    jobType: "",
    location: "",
    salary: 0,
    vacancies: 0,
    experience: 0,
    detail: [{ desc: "", requirements: "" }],
    application: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingJobId, setEditingJobId] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await axios.get("api-v1/jobs/find-jobs");
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested 'detail' fields separately
    if (name === "desc" || name === "requirements") {
      setJobForm({
        ...jobForm,
        detail: [
          {
            ...jobForm.detail[0],
            [name]: value,
          },
        ],
      });
    } else {
      setJobForm({
        ...jobForm,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingJobId) {
        await axios.put(`api-v1/jobs/update-job/${editingJobId}`, jobForm);
        alert("Job updated successfully");
      } else {
        await axios.post("api-v1/jobs/upload-job", jobForm);
        alert("Job created successfully");
      }
      setOpenDialog(false);
      setJobForm({
        _id: "",
        company: "",
        jobTitle: "",
        jobType: "",
        location: "",
        salary: 0,
        vacancies: 0,
        experience: 0,
        detail: [{ desc: "", requirements: "" }],
        application: [],
      });
      fetchJobs();
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  const handleEdit = (job: IJob) => {
    setJobForm({
      _id: job._id,
      company: job.company,
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      location: job.location,
      salary: job.salary,
      vacancies: job.vacancies || 0,
      experience: job.experience || 0,
      detail: job.detail || [{ desc: "", requirements: "" }],
      application: job.application || [],
    });
    setEditingJobId(job._id);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/jobs/delete-job/${id}`);
      alert("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Job Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditingJobId("");
          setJobForm({
            _id: "",
            company: "",
            jobTitle: "",
            jobType: "",
            location: "",
            salary: 0,
            vacancies: 0,
            experience: 0,
            detail: [{ desc: "", requirements: "" }],
            application: [],
          });
          setOpenDialog(true);
        }}
      >
        Create Job
      </Button>

      {/* Job List */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>${job.salary}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(job)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(job._id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Creating/Editing Jobs */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingJobId ? "Edit Job" : "Create Job"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={jobForm.jobTitle}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Type"
                name="jobType"
                value={jobForm.jobType}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={jobForm.location}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                type="number"
                value={jobForm.salary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vacancies"
                name="vacancies"
                type="number"
                value={jobForm.vacancies}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experience"
                name="experience"
                type="number"
                value={jobForm.experience}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="desc"
                multiline
                rows={4}
                value={jobForm.detail[0]?.desc || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requirements"
                name="requirements"
                multiline
                rows={4}
                value={jobForm.detail[0]?.requirements || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingJobId ? "Update Job" : "Create Job"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminJobLayout;
