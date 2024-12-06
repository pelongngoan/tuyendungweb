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
import userApi from "../../api/user";
import { User } from "../../api/types";
import { useAuth } from "../../context/useAuth";
import { MAYJOR } from "../../api/enum";
import CustomAlert from "../../components/CustomAlert";

export const Profile = () => {
  const { user } = useAuth(); // Get the user from the context
  const [userData, setUserData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    mayjor: undefined,
    accountType: "user",
  });

  const [editableField, setEditableField] = useState<string | null>(null); // Track which field is being edited
  const [message, setMessage] = useState("");

  const majors = [
    { label: "Tiếng Anh", value: "England " },
    { label: "Tiếng Ả Rập", value: "Arab " },
    { label: "Tiếng Trung", value: "China " },
    { label: "Tiếng Pháp", value: "France " },
    { label: "Tiếng Đức", value: "Germany " },
    { label: "Tiếng Nhật", value: "Japan " },
    { label: "Tiếng Hàn", value: "Korea " },
    { label: "Tiếng Nga", value: "Russia " },
    { label: "Kinh tế", value: "Economy " },
    { label: "Văn hóa", value: "Tradition " },
  ];

  useEffect(() => {
    // Fetch current user data when the component mounts
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await userApi.getUser(user._id); // Pass user ID from context
          console.log(response);
          setUserData(response.user);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setMessage("Error fetching user data");
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<MAYJOR | typeof MAYJOR>) => {
    setUserData((prevData) => ({
      ...prevData,
      mayjor: e.target.value as MAYJOR, // Ensure correct type casting
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await userApi.updateUser(userData);
      setMessage("Cập nhật thông tin người dùng thành công!");

      setEditableField(null); // Exit editing mode after successful update
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Error updating user data");
    }
  };

  const handleEditClick = (field: string) => {
    setEditableField(field); // Enable editing mode for the specific field
  };

  const renderField = (
    field: keyof User,
    label: string,
    isEditable: boolean
  ) => {
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
              {renderField("contact", "Contact", editableField === "contact")}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Ngành học</Typography>
              {editableField === "mayjor" ? (
                <FormControl fullWidth>
                  <InputLabel>Ngành học</InputLabel>
                  <Select
                    value={userData.mayjor || MAYJOR}
                    onChange={handleSelectChange}
                    label="Ngành học"
                    name="mayjor"
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
                    {userData.mayjor || "No data available"}
                  </Typography>
                  <IconButton
                    onClick={() => handleEditClick("mayjor")}
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
