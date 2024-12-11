import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { InternshipPost as Original } from "../../api/types";
import internshipApi from "../../api/internshipApi";
import InternshipCard from "../Internship/InternshipCard";

type InternCardProps = {
  id: string;
};
interface InternPost extends Original {
  id: string;
}

const InternSmallCard: React.FC<InternCardProps> = ({ id }) => {
  const [intern, setIntern] = useState<InternPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch intern details by ID
    const fetchInternDetails = async () => {
      try {
        const res = await internshipApi.getInternshipById(id);
        const internData = { ...res, id }; // Add id to the response data
        setIntern(internData as InternPost);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching intern:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchInternDetails();
  }, [id]);

  // If intern data is not yet loaded, show a loading indicator
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

  // If there's no intern data, return nothing or a message
  if (!intern) {
    return <Typography>Intern details not available</Typography>;
  }

  return <InternshipCard internshipPostDetail={intern} />;
};

export default InternSmallCard;
