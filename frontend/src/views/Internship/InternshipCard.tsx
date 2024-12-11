import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { InternshipPost } from "../../api/types";
import { useAuth } from "../../context/useAuth";
import internshipApi from "../../api/internshipApi";

interface InternshipCardProps {
  internshipPostDetail: InternshipPost;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
  internshipPostDetail,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasApplied, setHasApplied] = useState<boolean | null>(null); // To track if the user has applied
  const [isDialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const checkIfApplied = async () => {
      if (user?.id) {
        try {
          const applied = await internshipApi.checkInternshipStatus(
            user.id,
            internshipPostDetail.id
          );
          setHasApplied(applied);
        } catch (error) {
          console.error("Error checking application status:", error);
        }
      }
    };

    checkIfApplied();
  }, [internshipPostDetail.id, user?.id]);
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const handleDelete = async (id: string) => {
    try {
      await internshipApi.deleteInternshipPost(id);
    } catch (error) {
      console.log(error);
    }
    setDialogOpen(false);
  };
  const handleApplyUnapply = async () => {
    if (hasApplied === null) return; // Avoid action if the application status is unknown

    try {
      if (hasApplied) {
        // If already applied, handle unapplying
        await internshipApi.unapplyInternship(
          user!.id,
          internshipPostDetail.id
        ); // API call to unapply
        setHasApplied(false); // Update state to reflect that the user has unapplied
      } else {
        // If not applied, handle applying
        await internshipApi.applyInternship(user!.id!, internshipPostDetail.id); // API call to apply for the job
        setHasApplied(true); // Update state to reflect that the user has applied
      }
    } catch (error) {
      console.error("Error applying/unapplying job:", error);
    }
  };

  return (
    <>
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
          <Tooltip title={internshipPostDetail.title}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={1}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {internshipPostDetail.title}
            </Typography>
          </Tooltip>

          {/* Positions and Last Activity */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2" color="text.secondary">
              {/* Còn {internshipPostDetail.createdAt} ngày */}
            </Typography>
          </Box>

          {/* Divider */}
          <Divider sx={{ marginBottom: 2 }} />

          {/* View Details Button */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={user?.role === "ADMIN" ? 6 : 12}>
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  borderColor: "#2196f3",
                  color: "#2196f3",
                  ":hover": {
                    backgroundColor: "#2196f3",
                    color: "#fff",
                  },
                }}
                onClick={() =>
                  handleNavigation(
                    `/internshipDetail/${internshipPostDetail.id}`
                  )
                }
              >
                Xem chi tiết
              </Button>
            </Grid>

            {user?.role === "ADMIN" && (
              <>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderColor: "#2196f3",
                      color: "#2196f3",
                      ":hover": {
                        backgroundColor: "#2196f3",
                        color: "#fff",
                      },
                    }}
                    onClick={() =>
                      handleNavigation(
                        `/internship/editInternship/${internshipPostDetail.id}`
                      )
                    }
                  >
                    Chỉnh sửa
                  </Button>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={12}>
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  borderColor: "#2196f3",
                  color: "#2196f3",
                  ":hover": {
                    backgroundColor: "#2196f3",
                    color: "#fff",
                  },
                }}
                onClick={handleApplyUnapply}
              >
                {hasApplied === null
                  ? "Loading..."
                  : hasApplied
                  ? "Hủy đăng ký"
                  : "Đăng ký"}
              </Button>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  borderColor: "#2196f3",
                  color: "#2196f3",
                  ":hover": {
                    backgroundColor: "#2196f3",
                    color: "#fff",
                  },
                }}
                onClick={() => setDialogOpen(true)}
              >
                Xóa
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="delete-confirmation-dialog-title"
        aria-describedby="delete-confirmation-dialog-description"
      >
        <DialogTitle id="delete-confirmation-dialog-title">
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-confirmation-dialog-description">
            Bạn có chắc chắn muốn xóa bài đăng này không? Hành động này không
            thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={() => handleDelete(internshipPostDetail.id)}
            color="error"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InternshipCard;
