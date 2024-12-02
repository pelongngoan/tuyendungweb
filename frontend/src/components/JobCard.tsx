import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

interface JobCardProps {
  companyName: string;
  location: string;
  industry: string;
  positions: number;
  lastActivity: string;
}

const JobCard: React.FC<JobCardProps> = ({
  companyName,
  location,
  industry,
  positions,
  lastActivity,
}) => {
  return (
    <Card sx={{ width: "300px", margin: "16px", borderRadius: "8px" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        <Typography variant="body2" color="primary">
          {industry}
        </Typography>
        <Box mt={2}>
          <Typography variant="body2">
            <strong>{positions}</strong> vị trí đang tuyển
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hoạt động lần cuối {lastActivity}
          </Typography>
        </Box>
        <Button variant="outlined" sx={{ marginTop: "16px" }}>
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
