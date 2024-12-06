import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import JobCard from "../../components/JobCard";

const jobs = [
  {
    companyName: "Công Ty Cổ Phần Nhóm Đồ Thành",
    location: "Hà Nội, Vietnam",
    salary: "15 - 20 triệu",
    positions: 3,
    lastActivity: "28 ngày",
    logo: "path/to/logo.png", // Add the logo URL
    jobTitle: "Nhân Viên Xuất Nhập Khẩu (Logistic)",
  },
  {
    companyName: "Công Ty TNHH Bảo Uyên Sport",
    location: "Thành phố Hồ Chí Minh, Vietnam",
    salary: "8 - 12 triệu",
    positions: 2,
    lastActivity: "16 giờ trước",
    logo: "path/to/logo.png", // Add the logo URL
    jobTitle: "Nhân Viên Bán Hàng",
  },
  // Add more job data as needed...
];

const Job: React.FC = () => {
  return (
    <Box sx={{ padding: "32px" }}>
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
