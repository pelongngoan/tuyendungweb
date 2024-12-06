import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";

interface Job {
  _id?: string;
  jobTitle: string;
  jobType: string;
  location: string;
  salary: number;
  vacancies?: number;
  experience?: string;
  desc: string;
  requirements: string;
}

const JobPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  // Fetch job posts
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`/api/jobs`, {
        params: { search, sort, page, limit: 5 },
      });
      setJobs(response.data.data);
      setTotalPages(response.data.numOfPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  // Handle Job Form Submission
  const handleFormSubmit = async (job: Job) => {
    try {
      if (currentJob?._id) {
        await axios.put(`/api/jobs/${currentJob._id}`, job);
      } else {
        await axios.post(`/api/jobs`, job);
      }
      fetchJobs();
      setOpenDialog(false);
      setCurrentJob(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Job Post
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Job Management</h1>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <MenuItem value="Newest">Newest</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
          <MenuItem value="A-Z">A-Z</MenuItem>
          <MenuItem value="Z-A">Z-A</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenDialog(true);
            setCurrentJob(null);
          }}
        >
          Create Job
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
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
                <Button
                  onClick={() => {
                    setCurrentJob(job);
                    setOpenDialog(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(job._id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_e, value) => setPage(value)}
        style={{ marginTop: "1rem" }}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentJob ? "Edit Job" : "Create Job"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Job Title"
            fullWidth
            margin="normal"
            defaultValue={currentJob?.jobTitle || ""}
            onChange={(e) =>
              setCurrentJob((prev) => ({
                ...prev!,
                jobTitle: e.target.value,
              }))
            }
          />
          <TextField
            label="Job Type"
            fullWidth
            margin="normal"
            defaultValue={currentJob?.jobType || ""}
            onChange={(e) =>
              setCurrentJob((prev) => ({
                ...prev!,
                jobType: e.target.value,
              }))
            }
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            defaultValue={currentJob?.location || ""}
            onChange={(e) =>
              setCurrentJob((prev) => ({
                ...prev!,
                location: e.target.value,
              }))
            }
          />
          <TextField
            label="Salary"
            fullWidth
            margin="normal"
            type="number"
            defaultValue={currentJob?.salary || ""}
            onChange={(e) =>
              setCurrentJob((prev) => ({
                ...prev!,
                salary: +e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => handleFormSubmit(currentJob!)}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobPage;
