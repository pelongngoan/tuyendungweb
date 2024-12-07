import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams to access URL params
import { InternshipPost } from "../../api/types";
import internshipApi from "../../api/internshipApi";
import InternshipCard from "./InternshipCard";

const Internship: React.FC = () => {
  const { major } = useParams();
  const [internships, setInternships] = useState<InternshipPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      try {
        if (major) {
          const fetchedInternships = await internshipApi.getInternshipsByMajor(
            major
          ); // Fetch internships by major from API
          setInternships(fetchedInternships);
        } else {
          const fetchedInternships =
            await internshipApi.getAllInternshipPosts(); // Fetch all internships if no major is provided
          setInternships(fetchedInternships);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error fetching internship posts");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [major]); // Fetch internships whenever the major URL parameter changes

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
        {internships.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Chưa có thông tin tuyển dụng
            </Typography>
          </Grid>
        ) : (
          internships.map((internship, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <InternshipCard internshipPostDetail={internship} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Internship;
