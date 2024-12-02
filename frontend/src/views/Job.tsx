import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import JobCard from "../components/JobCard";

const jobs = [
  {
    companyName: "Công Ty TNHH TM DV Thanh Trang",
    location: "Thành phố Hồ Chí Minh, Vietnam",
    industry: "Information Technology and Services",
    positions: 3,
    lastActivity: "14 giờ trước",
  },
  {
    companyName: "Công Ty TNHH Bảo Uyên Sport",
    location: "Thành phố Hồ Chí Minh, Vietnam",
    industry: "Sports",
    positions: 1,
    lastActivity: "16 giờ trước",
  },
  // Add more job data as needed...
];

const Job: React.FC = () => {
  return (
    <Box sx={{ padding: "32px" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Danh Sách Công Ty
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <TextField
          label="Tìm kiếm theo tên công ty"
          variant="outlined"
          fullWidth
        />
        <TextField label="Địa điểm" variant="outlined" fullWidth />
        <TextField label="Ngành nghề" variant="outlined" fullWidth />
      </Box>

      {/* Job Cards Grid */}
      <Grid container spacing={2}>
        {jobs.map((job, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <JobCard {...job} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Job;
