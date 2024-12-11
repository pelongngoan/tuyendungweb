import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Button,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import jobApi from "../../api/job"; // Adjust the path to your job API
import { JobPost } from "../../api/types";
import { MAYJOR_TRANSLATION } from "../../api/enum";
import { useAuth } from "../../context/useAuth";
import authApi from "../../api/auth";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobPost = async () => {
      if (id) {
        try {
          const data = await jobApi.getJobById(id);
          console.log(data);

          if (data) {
            setJobPost(data);
          } else {
            setError("Job post not found");
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError("Error fetching job post");
        } finally {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchJobPost();
    }
  }, [id]);

  const handleApply = async () => {
    if (user?.id && jobPost) {
      setApplying(true);
      try {
        await authApi.updateUserAppliedJobs(user.id, id!); // Add job ID to user
        setApplying(false);
        alert("Applied for the job successfully!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setApplying(false);
        alert("Failed to apply for the job.");
      }
    }
  };

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

  if (!jobPost) {
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
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Company Image */}
        {jobPost.imageUrl && (
          <Avatar
            src={jobPost.imageUrl}
            alt={jobPost.company}
            sx={{ width: 56, height: 56, marginRight: "16px" }}
          />
        )}
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ marginBottom: "8px" }}
          >
            {jobPost.title}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "4px" }}>
            <strong>Công ty:</strong> {jobPost.company}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "4px" }}>
            <strong>Lương:</strong> {jobPost.salary}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "4px" }}>
            <strong>Địa điểm:</strong> {jobPost.location}
          </Typography>
        </Box>
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
            __html: jobPost.description,
          }}
          style={{ textAlign: "left" }}
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
            __html: jobPost.requirements,
          }}
          style={{ textAlign: "left" }}
        />
      </Box>

      {/* Benefit Section */}
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          textAlign="left"
        >
          Phúc lợi
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: jobPost.benefit,
          }}
          style={{ textAlign: "left" }}
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
            __html: jobPost.experience || "Không yêu cầu kinh nghiệm",
          }}
          style={{ textAlign: "left" }}
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
        {jobPost.mayjor.map((major, index) => (
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
        {jobPost.other.map((item, index) => (
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

      {/* Apply Button */}
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
    </Box>
  );
};

export default JobDetail;
