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
interface JobCardProps {
  companyName: string;
  location: string;
  salary: string;
  positions: number;
  lastActivity: string;
  logo: string; // Assuming logo URL is passed
  jobTitle: string;
}

const JobCard: React.FC<JobCardProps> = ({
  companyName,
  location,
  salary,
  positions,
  lastActivity,
  logo,
  jobTitle,
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/jobDetail/");
  };
  return (
    <Card
      sx={{
        width: "100%",
        margin: "16px",
        borderRadius: "8px",
        border: "1px solid #2196f3",
      }}
    >
      <CardContent>
        {/* Company Logo */}
        <Box display="flex" alignItems="center" mb={2}>
          <img
            src={logo}
            alt={companyName}
            style={{ width: 50, height: 50, marginRight: 16 }}
          />
          <Typography variant="h6" fontWeight="bold" noWrap>
            {companyName}
          </Typography>
        </Box>

        {/* Job Title */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {jobTitle}
        </Typography>

        {/* Job Details */}
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="bold">
            {salary}
          </Typography>
        </Box>

        {/* Positions and Last Activity */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="text.secondary">
            <strong>{positions}</strong> vị trí đang tuyển
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Còn {lastActivity}
          </Typography>
        </Box>

        {/* Divider */}
        <Divider sx={{ marginBottom: 2 }} />

        {/* View Details Button */}
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={handleNavigation}
        >
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
