import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { navigation } from "../navigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { JobPost as Original } from "../api/types";
import jobApi from "../api/job";
import JobCard from "./Job/JobCard";

interface JobPost extends Original {
  id: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [jobResults, setJobResults] = useState<JobPost[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  useEffect(() => {
    const fetchRandomJobs = async () => {
      try {
        const jobs = await jobApi.getRandomJobs(6); // Fetch 6 random jobs
        setJobResults(jobs as JobPost[]);
      } catch (error) {
        console.error("Error fetching random jobs:", error);
      }
    };

    fetchRandomJobs();
  }, []);
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchText.trim()) {
      const timeout = setTimeout(async () => {
        try {
          console.log(`Tìm kiếm việc làm với tên: ${searchText}`);
          const jobs = await jobApi.searchJobsByTitle(searchText);
          setJobResults(jobs);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách việc làm:", error);
        }
      }, 2000);

      setTypingTimeout(timeout);
    } else {
      setJobResults([]);
    }

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [searchText, typingTimeout]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleNavigation = (destination: string) => {
    navigate(`/${destination}`);
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#FFD700",
          py: 6,
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 2, color: "#333" }}
          >
            Khám phá hơn 15,000 việc làm mới mỗi tháng!
          </Typography>
          <Box mt={3} display="flex" justifyContent="center">
            <TextField
              fullWidth
              placeholder="Tìm kiếm việc làm"
              variant="outlined"
              value={searchText}
              onChange={handleInputChange}
              sx={{ backgroundColor: "white", borderRadius: 2, mr: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 3, width: "140px" }}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Job Results Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Kết quả tìm kiếm việc làm
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {jobResults.map((job, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <JobCard jobPostDetail={job} />
            </Grid>
          ))}
          {!jobResults.length && (
            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 4, width: "100%", color: "#888" }}
            >
              Không có kết quả phù hợp.
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Career Exploration Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          KHÁM PHÁ NGHỀ NGHIỆP MƠ ƯỜA
        </Typography>
        <Typography variant="subtitle1" align="center" mb={4}>
          Tìm hiểu nghề nghiệp phù hợp với bạn
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {navigation()[0].children?.map((nav, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 4,
                  px: 3,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                }}
                onClick={() => handleNavigation(nav.path)}
              >
                {nav.icon}
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {nav.title}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advertisement Section */}
      <Box
        sx={{
          backgroundColor: "#FFD700",
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#333" }}>
          Tham gia cộng đồng hơn 1,000,000 ứng viên tài năng
        </Typography>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Người Dùng InternHub Nói Gì?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              quote:
                '"Tôi không biết bản thân mình phù hợp với nghề gì, nhưng InternHub giúp tôi tìm ra công việc mơ ước!"',
              name: "Jia Ann, NTU",
            },
            {
              quote:
                '"Nền tảng thực sự tiện lợi, giúp tôi kết nối với doanh nghiệp và tôi đã đặt được 2 cuộc phỏng vấn!"',
              name: "Zai Muhd, NUS",
            },
          ].map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="body1" mb={2}>
                    {testimonial.quote}
                  </Typography>
                  <Divider />
                  <Typography variant="body2" mt={2} fontWeight="bold">
                    — {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">© 2024 InternHub.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
