import { useEffect, useState } from "react";
import { Box, Typography, Chip, CircularProgress, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the URL params
import { InternshipPost } from "../../api/types";
import { MAYJOR_TRANSLATION } from "../../api/enum";
import internshipApi from "../../api/internshipApi";
import { useAuth } from "../../context/useAuth";
const InternshipDetail = () => {
  const { id } = useParams<{ id: string }>(); // Get internshipId from URL
  const { user } = useAuth();
  const [internshipPost, setInternshipPost] = useState<InternshipPost | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState<boolean | null>(null); // To track if the user has applied
  const [applying, setApplying] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleApply = async () => {
    if (user?.id && internshipPost) {
      setApplying(true);
      try {
        await internshipApi.applyInternship(user!.id, id!); // API call to apply for the job
        setHasApplied(true); // Update state to reflect that the user has applied
        alert("Applied for the job successfully!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setApplying(false);
        alert("Failed to apply for the job.");
      } finally {
        navigate("/intership");
      }
    }
  };
  useEffect(() => {
    const checkIfApplied = async () => {
      if (user?.id) {
        try {
          const applied = await internshipApi.checkInternshipStatus(
            user.id,
            id!
          );
          setHasApplied(applied);
        } catch (error) {
          console.error("Error checking application status:", error);
        }
      }
    };

    checkIfApplied();
  }, [id, user?.id]);
  useEffect(() => {
    const fetchInternshipPost = async () => {
      if (id) {
        try {
          const data = await internshipApi.getInternshipById(id); // Fetch internship details by ID
          if (data) {
            setInternshipPost(data);
          } else {
            setError("Internship post not found");
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError("Error fetching internship post");
        } finally {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchInternshipPost();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!internshipPost) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6">Chưa có thông tin chi tiết</Typography>
      </Box>
    );
  }

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
          padding: "24px",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: "8px" }}>
          {internshipPost.title}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "4px" }}>
          <strong>Công ty:</strong> {internshipPost.company}
        </Typography>
      </Box>

      {/* Description Section */}
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
        >
          Mô tả công việc
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: internshipPost.description,
          }}
          style={{ textAlign: "left" }} // Ensures that the description content aligns left
        />
      </Box>

      {/* Requirements Section */}
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
        >
          Yêu cầu công việc
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: internshipPost.requirements,
          }}
          style={{ textAlign: "left" }} // Aligns the requirements content to the left
        />
      </Box>

      {/* Experience Section */}
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
        >
          Kinh nghiệm
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: internshipPost.experience || "Không yêu cầu kinh nghiệm",
          }}
          style={{ textAlign: "left" }} // Aligns the experience content to the left
        />
      </Box>

      {/* Major Section */}
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
        >
          Chuyên ngành tuyển dụng
        </Typography>
        {internshipPost.mayjor.map((major, index) => (
          <Chip
            key={index}
            label={MAYJOR_TRANSLATION[major]}
            sx={{ margin: "4px" }}
          />
        ))}
      </Box>

      {/* Other Section */}
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
        >
          Thông tin khác
        </Typography>
        {internshipPost.other.map((item, index) => (
          <Box key={index} sx={{ marginBottom: "16px" }}>
            <Typography variant="body1" fontWeight="bold" textAlign="left">
              {item.label}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
              style={{ textAlign: "left" }}
            />
          </Box>
        ))}
      </Box>
      {!hasApplied ? (
        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            disabled={applying}
          >
            {applying ? "Applying..." : "Apply"}
          </Button>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default InternshipDetail;
