import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Box } from "@mui/material";

const UserLayout = () => {
  const navigate = useNavigate();

  const handleNavigation = (destination: string) => {
    navigate(`/${destination}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header title="My App" onNavigate={handleNavigation} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "2rem",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Outlet />
      </Box>
      <Footer footerText="© 2024 My App" onNavigate={handleNavigation} />
    </Box>
  );
};

export default UserLayout;
