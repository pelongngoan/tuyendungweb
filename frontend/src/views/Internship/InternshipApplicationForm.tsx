import React, { useEffect, useState } from "react";
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
  SelectChangeEvent,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InternshipPost } from "../../api/types";
import { MAYJOR, MAYJOR_TRANSLATION } from "../../api/enum";
import internshipApi from "../../api/internshipApi";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const InternshipApplicationForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<InternshipPost>({
    id: "",
    company: "",
    title: "",
    description: "",
    requirements: "",
    experience: "",
    mayjor: [],
    other: [],
    imageUrl: "",
    createdAt: serverTimestamp(),
  });
  useEffect(() => {
    if (id) {
      const fetchInternBy = async () => {
        try {
          const fetchedIntern = await internshipApi.getInternshipById(id);
          setFormData(fetchedIntern!);
        } catch (err) {
          console.log(err);
        }
      };
      fetchInternBy();
    }
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeSelect = (e: SelectChangeEvent<string[]>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value as string[],
    }));
  };

  const handleQuillChange = (field: keyof InternshipPost, value: string) => {
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
      if (!id) {
        formData.createdAt = serverTimestamp();
        await internshipApi.createInternshipPost(formData);
        alert(`Tạo đơn thực tập thành công`);
      } else {
        await internshipApi.updateInternshipPost(id!, formData);
        alert(`Chỉnh sửa đơn thực tập thành công`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Thất bại xin hãy thử lại hoặc liên hệ Admin");
    } finally {
      navigate("/internship");
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
          Form điền hồ sơ thực tập
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Link hình ảnh"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Image Preview */}
          {formData.imageUrl && (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Ảnh công ty:</Typography>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                />
              </Grid>
            </Grid>
          )}

          {/* Mayjor Select */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Hệ tuyển dụng</InputLabel>
              <Select
                label="Hệ tuyển dụng"
                name="mayjor"
                value={formData.mayjor}
                onChange={(e) => handleChangeSelect(e)}
                multiple
                renderValue={(selected) => {
                  return selected
                    .map((value) => MAYJOR_TRANSLATION[value] || value)
                    .join(", ");
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
                {id ? "Cập nhật đơn thực tập" : "Tạo đơn thực tập"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default InternshipApplicationForm;
