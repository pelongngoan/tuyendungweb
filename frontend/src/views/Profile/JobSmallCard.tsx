import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { JobPost as Original } from "../../api/types";
import jobApi from "../../api/job";
import JobCard from "../Job/JobCard";

type JobCardProps = {
  id: string;
};
interface JobPost extends Original {
  id: string;
}

const JobSmallCard: React.FC<JobCardProps> = ({ id }) => {
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch job details by ID
    const fetchJobDetails = async () => {
      try {
        const res = await jobApi.getJobById(id);
        const jobData = { ...res, id }; // Add id to the response data
        setJob(jobData as JobPost);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchJobDetails();
  }, [id]);

  // If job data is not yet loaded, show a loading indicator
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If there's no job data, return nothing or a message
  if (!job) {
    return <Typography>Job details not available</Typography>;
  }

  return <JobCard jobPostDetail={job} />;
};

export default JobSmallCard;
