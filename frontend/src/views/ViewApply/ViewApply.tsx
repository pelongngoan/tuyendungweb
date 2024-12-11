import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import authApi from "../../api/auth";
import { useAuth } from "../../context/useAuth";
import JobSmallCard from "../Profile/JobSmallCard";
import InternSmallCard from "../Profile/InternSmallCard";

const ViewApply = () => {
  const { user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [appliedInterns, setAppliedInterns] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (user?.id) {
        try {
          const jobs = await authApi.getAppliedJobs(user?.id);
          setAppliedJobs(jobs);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError("Error fetching applied jobs");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppliedJobs();
  }, [user?.id]); // Ensure it reruns when user.id changes
  useEffect(() => {
    const fetchAppliedInterns = async () => {
      if (user?.id) {
        try {
          const interns = await authApi.getAppliedInterns(user?.id);
          setAppliedInterns(interns);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError("Error fetching applied interns");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppliedInterns();
  }, [user?.id]); // Ensure it reruns when user.id changes

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

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h5">Các đơn đã đăng ký</Typography>
      <Box sx={{ marginTop: "20px" }}>
        {appliedJobs.length === 0 ? (
          <Typography variant="h6">Bạn chưa apply đơn nào cả</Typography>
        ) : (
          <Box>
            {appliedJobs.map((jobId, index) => (
              <Box key={index} sx={{ marginBottom: "20px" }}>
                <JobSmallCard id={jobId} />
              </Box>
            ))}
          </Box>
        )}
        {appliedInterns.length === 0 ? (
          <Typography variant="h6">Bạn chưa apply đơn nào cả</Typography>
        ) : (
          <Box>
            {appliedInterns.map((internId, index) => (
              <Box key={index} sx={{ marginBottom: "20px" }}>
                <InternSmallCard id={internId} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ViewApply;
