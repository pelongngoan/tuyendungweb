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
import Logo from "../../assets/logo.jpg";
import { InternshipPost } from "../../api/types";

interface InternshipCardProps {
  internshipPostDetail: InternshipPost;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
  internshipPostDetail,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    console.log("Sssss" + id);

    navigate(`/internshipDetail/${id}`);
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
        {/* Company Logo and Title */}
        <Box display="flex" alignItems="center" mb={2}>
          <img
            src={Logo} // Using dynamic logo or default
            alt={internshipPostDetail.company}
            style={{ width: 50, height: 50, marginRight: 16 }}
          />
          <Typography variant="h6" fontWeight="bold" noWrap>
            {internshipPostDetail.company}
          </Typography>
        </Box>

        {/* Internship Title */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {internshipPostDetail.title}
        </Typography>

        {/* Positions and Last Activity */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="text.secondary">
            {/* Còn {internshipPostDetail.createdAt} ngày */}
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
          onClick={() => handleNavigation(internshipPostDetail.id)}
        >
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};

export default InternshipCard;
