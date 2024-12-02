import React from "react";
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

const Home = () => {
  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ backgroundColor: "#FFD700", py: 4, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold">
            Khám phá 15000+ việc làm mới hàng tháng!
          </Typography>
          <Box mt={2} display="flex" justifyContent="center ">
            <TextField
              fullWidth
              placeholder="Tìm kiếm việc làm"
              variant="outlined"
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

      {/* Career Exploration Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          KHÁM PHÁ NGHỀ NGHIỆP MƠ ƯỚC
        </Typography>
        <Typography variant="subtitle1" align="center" mb={3}>
          Tìm hiểu nghề nghiệp và chuyên môn dành cho bạn
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            "Phát Triển Kinh Doanh & Bán Hàng",
            "Tài Chính & Kế Toán",
            "Quản Lý Sản Phẩm & Dự Án",
            "Hành Chính Nhân Sự",
            "Quản Lý",
            "Công Nghệ Thông Tin & IT",
            "Thiết Kế",
            "Marketing",
            "Truyền Thông / Media",
            "Vận Hành",
          ].map((career, index) => (
            <Grid item key={index}>
              <Button variant="outlined" sx={{ borderRadius: 3 }}>
                {career}
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
          Người Dùng Glints Nói Gì?
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
        <Typography variant="body2">© Glints Asia Pacific</Typography>
      </Box>
    </Box>
  );
};

export default Home;
