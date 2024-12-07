import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import jobApi from "../../api/job";
import { JobPost } from "../../api/types";
import { MAYJOR, MAYJOR_TRANSLATION } from "../../api/enum";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState<Omit<JobPost, "id" | "createdAt">>({
    company: "",
    title: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    benefit: "",
    experience: "",
    mayjor: [],
    other: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (field: keyof JobPost, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOtherField = () => {
    setFormData((prev) => ({
      ...prev,
      other: [...prev.other, { label: "", content: "" }],
    }));
  };

  const handleOtherFieldChange = (
    index: number,
    field: "label" | "content",
    value: string
  ) => {
    const updatedOtherFields = [...formData.other];
    updatedOtherFields[index] = {
      ...updatedOtherFields[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, other: updatedOtherFields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobPostId = await jobApi.createJobPost(formData);
      alert(`Job post created successfully with ID: ${jobPostId}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to create job post. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
          Form điền hồ sơ công việc
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Basic Info Row */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Left Side (Company & Title) */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tên công ty"
                name="company"
                value={formData.company}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tiêu đề tuyển dụng"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Right Side (Location & Salary) */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Địa chỉ"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lương"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Mayjor Select */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Chuyên ngành tuyển dụng</InputLabel>
                <Select
                  label="Chuyên ngành tuyển dụng"
                  name="mayjor"
                  value={formData.mayjor}
                  onChange={(e) => handleChange(e)}
                  multiple
                  renderValue={(selected) => {
                    return (selected as string[]) // Ensure the selected value is typed as an array of strings
                      .map((value) => MAYJOR_TRANSLATION[value]) // Map through the selected values
                      .join(", "); // Join them as a comma-separated string
                  }}
                >
                  {Object.entries(MAYJOR).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {MAYJOR_TRANSLATION[value]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Detailed Info Row */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Left Side (Description & Requirements) */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Mô tả công việc
              </Typography>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) => handleQuillChange("description", value)}
                style={{
                  height: "300px",
                  borderRadius: "8px",
                  marginTop: "8px", // Add space between label and editor
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Yêu cầu công việc
              </Typography>
              <ReactQuill
                theme="snow"
                value={formData.requirements}
                onChange={(value) => handleQuillChange("requirements", value)}
                style={{
                  height: "300px",
                  borderRadius: "8px",
                  marginTop: "8px", // Add space between label and editor
                }}
              />
            </Grid>
            {/* Right Side (Benefit & Experience) */}
            <Grid item xs={12} sm={6} sx={{ mt: 10 }}>
              <Typography variant="h6" gutterBottom>
                Quyền lợi
              </Typography>
              <ReactQuill
                theme="snow"
                value={formData.benefit}
                onChange={(value) => handleQuillChange("benefit", value)}
                style={{
                  height: "300px",
                  borderRadius: "8px",
                  marginTop: "8px", // Add space between label and editor
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 10 }}>
              <Typography variant="h6" gutterBottom>
                Kinh nghiệm
              </Typography>
              <ReactQuill
                theme="snow"
                value={formData.experience}
                onChange={(value) => handleQuillChange("experience", value)}
                style={{
                  height: "300px",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>

          {/* Other Info Row */}
          <Grid container spacing={3} sx={{ mb: 4, mt: 10 }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Thêm thông tin khác (Label và Nội dung)
              </Typography>
              {formData.other.map((otherField, index) => (
                <Grid container spacing={2} key={index} sx={{ mt: 10 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Tiêu đề"
                      value={otherField.label}
                      onChange={(e) =>
                        handleOtherFieldChange(index, "label", e.target.value)
                      }
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ReactQuill
                      theme="snow"
                      value={otherField.content}
                      onChange={(value) =>
                        handleOtherFieldChange(index, "content", value)
                      }
                      style={{
                        height: "200px",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddOtherField}
                sx={{ mt: 10 }}
              >
                Thêm thông tin khác
              </Button>
            </Grid>
          </Grid>
          {/* Submit Button */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "#0044cc",
                  },
                }}
              >
                Tạo đơn tuyển dụng
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default JobApplicationForm;
