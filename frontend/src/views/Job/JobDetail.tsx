import React from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";

interface JobDetailProps {
  title?: string;
  salary?: string;
  description?: string[];
  experience?: string;
  education?: string;
  skills?: string[];
}

const JobDetail: React.FC<JobDetailProps> = ({
  title,
  salary,
  description,
  experience,
  education,
  skills,
}) => {
  return (
    <Box
      sx={{
        padding: "24px",
        maxWidth: "800px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#004aad",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="h6">{salary}</Typography>
      </Box>

      {/* Job Details */}
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Chi tiết công việc
        </Typography>
        {description.map((detail, index) => (
          <Typography key={index} variant="body1" paragraph>
            {detail}
          </Typography>
        ))}

        {/* Job Requirements */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Mô tả công việc
        </Typography>
        <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap", mb: 2 }}>
          <Chip label={experience} variant="outlined" />
          <Chip label={education} variant="outlined" />
        </Box>

        {/* Skills */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Kỹ năng
        </Typography>
        <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {skills.map((skill, index) => (
            <Chip key={index} label={skill} color="primary" />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetail;
