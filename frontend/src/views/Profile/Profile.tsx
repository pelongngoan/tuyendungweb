import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  IconButton,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useAuth } from "../../context/useAuth";
import CustomAlert from "../../components/CustomAlert";
import authApi from "../../api/auth";
import { RegisterParams } from "../../context/types";

export const Profile = () => {
  const { user } = useAuth(); // Get the user from the context

  const [userData, setUserData] = useState<RegisterParams>({
    email: user?.email || "",
    password: user?.password || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || 0,
    location: user?.location || "",
    major: user?.major || "",
    phone: user?.phone || "",
  });
  console.log(userData);

  const [editableField, setEditableField] = useState<string | null>(null); // Track which field is being edited
  const [message, setMessage] = useState("");

  const majors = [
    { label: "Tiếng Anh", value: "England" },
    { label: "Tiếng Ả Rập", value: "Arab" },
    { label: "Tiếng Trung", value: "China" },
    { label: "Tiếng Pháp", value: "France" },
    { label: "Tiếng Đức", value: "Germany" },
    { label: "Tiếng Nhật", value: "Japan" },
    { label: "Tiếng Hàn", value: "Korea" },
    { label: "Tiếng Nga", value: "Russia" },
    { label: "Kinh tế", value: "Economy" },
    { label: "Văn hóa", value: "Tradition" },
  ];

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (user) {
  //       try {
  //         const response = await authApi.getUserByID(user.id); // Use the correct user ID from context
  //         setUserData(response.user || {}); // Ensure default empty object if no user data is found
  //       } catch (error) {
  //         setMessage("Error fetching user data");
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setUserData((prevData) => ({
      ...prevData,
      major: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authApi.updateUser(user?.id, userData); // Call API to update user data
      setMessage("Cập nhật thông tin người dùng thành công!"); // Success message
      setEditableField(null); // Exit editing mode after successful update
    } catch (error) {
      setMessage("Error updating user data"); // Error message
    }
  };

  const handleEditClick = (field: string) => {
    setEditableField(field); // Enable editing mode for the specific field
  };

  const renderField = (
    field: keyof RegisterParams,
    label: string,
    isEditable: boolean
  ) => {
    if (!userData) return null; // Add a guard to ensure userData is not undefined

    return isEditable ? (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField
          fullWidth
          label={label}
          name={field}
          value={userData[field] || ""}
          onChange={handleInputChange}
          required
        />
        <IconButton onClick={() => handleEditClick(field)} color="primary">
          <EditIcon />
        </IconButton>
      </Box>
    ) : (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" flexGrow={1}>
          {userData[field] || "No data available"}
        </Typography>
        <IconButton onClick={() => handleEditClick(field)} color="primary">
          <EditIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <CustomAlert
        message={message}
        open={!!message}
        severity={"success"}
        onClose={() => setMessage("")}
      />
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Sửa thông tin hồ sơ
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Tên</Typography>
              {renderField(
                "firstName",
                "First Name",
                editableField === "firstName"
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Họ</Typography>
              {renderField(
                "lastName",
                "Last Name",
                editableField === "lastName"
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email</Typography>
              {renderField("email", "Email", editableField === "email")}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Số điện thoại</Typography>
              {renderField("phone", "Phone", editableField === "phone")}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Ngành học</Typography>
              {editableField === "major" ? (
                <FormControl fullWidth>
                  <InputLabel>Ngành học</InputLabel>
                  <Select
                    value={userData.major}
                    onChange={handleSelectChange}
                    label="Ngành học"
                    name="major"
                  >
                    {majors.map((major) => (
                      <MenuItem key={major.value} value={major.value}>
                        {major.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" flexGrow={1}>
                    {userData.major || "No data available"}
                  </Typography>
                  <IconButton
                    onClick={() => handleEditClick("major")}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              {editableField ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  fullWidth
                  disabled
                  sx={{ marginTop: 2 }}
                >
                  Edit Mode Disabled
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
