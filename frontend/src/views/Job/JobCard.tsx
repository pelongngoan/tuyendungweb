import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { JobPost } from "../../api/types";
import LogoImage from "../../assets/react.svg";
interface JobCardProps {
  jobPostDetail: JobPost;
}

const JobCard: React.FC<JobCardProps> = ({ jobPostDetail }) => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/jobDetail/${id}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "16px",
        borderRadius: "8px",
        border: "1px solid #2196f3", // Blue border
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        {/* Company LogoImage and Title */}
        <Box display="flex" alignItems="center" mb={2}>
          <img
            src={LogoImage} // Using dynamic logo or default
            alt={jobPostDetail.company}
            style={{ width: 50, height: 50, marginRight: 16 }}
          />
          <Typography variant="h6" fontWeight="bold" noWrap>
            {jobPostDetail.company}
          </Typography>
        </Box>

        {/* Job Title */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {jobPostDetail.title}
        </Typography>

        {/* Job Location and Salary */}
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Địa điểm: {jobPostDetail.location}
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="bold">
            Lương: {jobPostDetail.salary}
          </Typography>
        </Box>

        {/* Positions and Last Activity */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="text.secondary">
            {/* vị trí đang tuyển <strong>{jobPostDetail.position}</strong> */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Còn {jobPostDetail.createdAt} ngày */}
          </Typography>
        </Box>

        {/* Divider */}
        <Divider sx={{ marginBottom: 2 }} />

        {/* View Details Button */}
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            borderColor: "#2196f3", // Border color for the button
            color: "#2196f3", // Text color for the button
            ":hover": {
              backgroundColor: "#2196f3",
              color: "#fff",
            },
          }}
          onClick={() => handleNavigation(jobPostDetail.id)}
        >
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
