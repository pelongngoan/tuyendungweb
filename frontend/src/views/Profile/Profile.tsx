import React, { useState } from "react";
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
import {
  MAJOR,
  MAJOR_TRANSLATION,
  MAYJOR,
  MAYJOR_TRANSLATION,
} from "../../api/enum";

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
    cn: user?.cn || "",
    phone: user?.phone || "",
  });
  console.log(userData);

  const [editableField, setEditableField] = useState<string | null>(null); // Track which field is being edited
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEditableField(name);
    if (name === "major") {
      setUserData((prevData) => ({
        ...prevData,
        major: value as keyof typeof MAYJOR, // Ensure the value is of the correct type
      }));
    }

    if (name === "cn") {
      setUserData((prevData) => ({
        ...prevData,
        cn: value as keyof typeof MAJOR, // Ensure the value is of the correct type
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authApi.updateUser(user?.id, userData); // Call API to update user data
      setMessage("Cập nhật thông tin người dùng thành công!"); // Success message
      setEditableField(null); // Exit editing mode after successful update
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Hệ theo học</InputLabel>
                <Select
                  label="Hệ theo học"
                  name="major"
                  value={userData.major || ""}
                  onChange={(e) => handleChangeSelect(e)}
                  renderValue={(value) =>
                    MAYJOR_TRANSLATION[value as keyof typeof MAYJOR] || ""
                  }
                >
                  {Object.entries(MAYJOR).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {MAYJOR_TRANSLATION[value]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Chuyên ngành đào tạo</InputLabel>
                <Select
                  label="Chuyên ngành đào tạo"
                  name="cn"
                  value={userData.cn || ""} // Ensure cn is a string, default to an empty string if undefined
                  onChange={(e) => handleChangeSelect(e)}
                  renderValue={(value) =>
                    MAJOR_TRANSLATION[value as keyof typeof MAJOR] || ""
                  }
                >
                  {Object.entries(MAJOR).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {MAJOR_TRANSLATION[value]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
