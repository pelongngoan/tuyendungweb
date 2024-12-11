import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams to access URL params
import jobApi from "../../api/job";
import { JobPost as OriginalJobPost } from "../../api/types";
import JobCard from "./JobCard";
interface JobPost extends OriginalJobPost {
  id: string;
}
const Job: React.FC = () => {
  const { major, mayjor } = useParams();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        console.log(major);
        console.log(mayjor);
        if (mayjor && major) {
          console.log("a");
          const fetchedJobs = await jobApi.getJobsByMayjorAndMajor(
            major,
            mayjor
          ); // Fetch jobs by major from API
          setJobs(fetchedJobs as JobPost[]);
        } else if (major) {
          console.log("b");
          const fetchedJobs = await jobApi.getJobsByMajor(major); // Fetch jobs by major from API
          setJobs(fetchedJobs as JobPost[]);
        } else {
          console.log("c");
          const fetchedJobs = await jobApi.getAllJobPosts(); // Fetch all jobs if no major is provided
          setJobs(fetchedJobs as JobPost[]);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error fetching job posts");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [major]); // Fetch jobs whenever the major URL parameter changes

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "32px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "32px", textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "32px" }}>
      <Grid container spacing={2}>
        {jobs.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Chưa có thông tin tuyển dụng
            </Typography>
          </Grid>
        ) : (
          jobs.map((job, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <JobCard jobPostDetail={job} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Job;
