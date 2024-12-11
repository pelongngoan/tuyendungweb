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
import { JobPost } from "../api/types";
import jobApi from "../api/job";

const Home = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [jobResults, setJobResults] = useState<JobPost[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout); // Clear previous timeout if user keeps typing
    }

    if (searchText.trim()) {
      const timeout = setTimeout(async () => {
        try {
          console.log(
            `Searching for jobs with title containing: ${searchText}`
          );
          const jobs = await jobApi.searchJobsByTitle(searchText); // API call
          setJobResults(jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      }, 2000);

      setTypingTimeout(timeout);
    } else {
      setJobResults([]); // Clear results when input is empty
    }

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [searchText, typingTimeout]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleNavigation = (destination: string) => {
    console.log(destination);

    navigate(`/${destination}`);
  };
  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ backgroundColor: "#FFD700", py: 4, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold">
            Khám phá 15000+ việc làm mới hàng tháng!
          </Typography>
          <Box mt={2} display="flex" justifyContent="center">
            <TextField
              fullWidth
              placeholder="Tìm kiếm việc làm"
              variant="outlined"
              value={searchText}
              onChange={handleInputChange}
              sx={{ backgroundColor: "white", borderRadius: 1, mr: 2 }}
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
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Kết quả tìm kiếm việc làm
        </Typography>
        <Grid container spacing={2}>
          {jobResults.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {job.company} - {job.location}
                  </Typography>
                  <Typography variant="body1" mt={2}>
                    {job.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!jobResults.length && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, width: "100%" }}
            >
              Không có kết quả phù hợp.
            </Typography>
          )}
        </Grid>
      </Container>
      {/* Career Exploration Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          KHÁM PHÁ NGHỀ NGHIỆP MƠ ƯỚC
        </Typography>
        <Typography variant="subtitle1" align="center" mb={3}>
          Tìm hiểu nghề nghiệp và chuyên môn dành cho bạn
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {navigation()[0].children?.map((nav, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                sx={{ borderRadius: 3, display: "flex", alignItems: "center" }}
                onClick={() => handleNavigation(nav.path)}
              >
                {nav.icon}
                {nav.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advertisement Section */}
      <Box sx={{ backgroundColor: "#FFD700", py: 4, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Tham gia cộng đồng 1,000,000+ ứng viên tài năng
        </Typography>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Người Dùng InternHub Nói Gì?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              quote:
                '"I didn\'t really know what I wanted to do and what were all the career paths out there, but now I found my dream career!"',
              name: "Jia Ann, NTU",
            },
            {
              quote:
                '"The platform is really convenient to reach out to companies, and I’ve secured 2 interviews already!"',
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
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">© InternHub</Typography>
      </Box>
    </Box>
  );
};

export default Home;
