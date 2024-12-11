import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { JobPost as OriginalJobPost } from "../../api/types";
import { useAuth } from "../../context/useAuth";
import dayjs from "dayjs";
import jobApi from "../../api/job";

interface JobPost extends OriginalJobPost {
  id: string;
}
interface JobCardProps {
  jobPostDetail: JobPost;
}

const JobCard = ({ jobPostDetail }: JobCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState<boolean | null>(null); // To track if the user has applied

  useEffect(() => {
    const checkIfApplied = async () => {
      if (user?.id) {
        try {
          const applied = await jobApi.checkApplicationStatus(
            user.id,
            jobPostDetail.id
          );
          setHasApplied(applied);
        } catch (error) {
          console.error("Error checking application status:", error);
        }
      }
    };

    checkIfApplied();
  }, [jobPostDetail.id, user?.id]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleDelete = async (id: string) => {
    try {
      await jobApi.deleteJobPost(id);
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
        await jobApi.unapplyJob(user!.id, jobPostDetail.id); // API call to unapply
        setHasApplied(false); // Update state to reflect that the user has unapplied
      } else {
        // If not applied, handle applying
        await jobApi.applyJob(user!.id!, jobPostDetail.id); // API call to apply for the job
        setHasApplied(true); // Update state to reflect that the user has applied
      }
    } catch (error) {
      console.error("Error applying/unapplying job:", error);
    }
  };

  // Calculate remaining days and format dates
  // const remainingDays = dayjs(jobPostDetail.expireDate).diff(dayjs(), "day");

  return (
    <>
      <Card
        sx={{
          width: "100%",
          margin: "16px",
          borderRadius: "8px",
          border: "1px solid #2196f3",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <img
              src={jobPostDetail.imageUrl}
              alt={jobPostDetail.company}
              style={{ width: 50, height: 50, marginRight: 16 }}
            />
            <Tooltip title={jobPostDetail.company}>
              <Typography variant="h6" fontWeight="bold" noWrap>
                {jobPostDetail.company}
              </Typography>
            </Tooltip>
          </Box>

          <Tooltip title={jobPostDetail.title}>
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
              {jobPostDetail.title}
            </Typography>
          </Tooltip>

          <Box mb={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Địa điểm: {jobPostDetail.location}
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              fontWeight="bold"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Lương: {jobPostDetail.salary}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2" color={"green"}>
              {"Còn thời gian ứng tuyển"}
              {/* {remainingDays > 0 ? `Còn ${remainingDays} ngày` : "Đã hết hạn"} */}
            </Typography>
          </Box>

          <Divider sx={{ marginBottom: 2 }} />

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
                  handleNavigation(`/jobDetail/${jobPostDetail.id}`)
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
                      handleNavigation(`/job/editJob/${jobPostDetail.id}`)
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
            onClick={() => handleDelete(jobPostDetail.id)}
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

export default JobCard;
