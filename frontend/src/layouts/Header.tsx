interface NavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  children?: NavItem[];
}
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { navigation } from "../navigation"; // Import the navigation function
import { UserDataType } from "../context/types"; // Ensure you import the necessary types

interface HeaderProps {
  title?: string;
  onNavigate: (destination: string) => void;
  user: UserDataType | null; // User object
  onLogout: () => void; // Logout handler
  onUpdateProfile: () => void; // Update profile handler
}

export const Header = ({
  onNavigate,
  user,
  onLogout,
  onUpdateProfile,
}: HeaderProps) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<NavItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    children?: NavItem[]
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(children || []);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarMenuAnchor(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarMenuAnchor(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
          onClick={() => onNavigate("")}
        >
          <img
            src="https://raw.githubusercontent.com/pelongngoan/tuyendungweb/224ceb10bbebc23be112aa52a0a4d740eab08967/frontend/src/assets/logo.jpg"
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
          />
        </Box>
        {!isMobile ? (
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {navigation().map((nav, index) =>
              nav.children ? (
                <Button
                  key={index}
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: index === 0 ? "bold" : "normal",
                    "&:hover": {
                      color: "#1976d2",
                      borderBottom: "2px solid #1976d2",
                    },
                  }}
                  onClick={(event) => handleOpenMenu(event, nav.children)}
                >
                  {nav.title}
                </Button>
              ) : (
                <Button
                  key={index}
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: index === 0 ? "bold" : "normal",
                    "&:hover": {
                      color: "#1976d2",
                      borderBottom: "2px solid #1976d2",
                    },
                  }}
                  onClick={() => onNavigate(nav.path)}
                >
                  {nav.title}
                </Button>
              )
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {menuItems.map((child, childIndex) => (
                <MenuItem
                  key={childIndex}
                  onClick={() => {
                    handleCloseMenu();
                    onNavigate(child.path);
                  }}
                >
                  {child.icon}
                  {child.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
        )}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <Box sx={{ width: 250 }}>
            <List>
              {navigation().map((nav, index) => (
                <React.Fragment key={index}>
                  <ListItem onClick={() => onNavigate(nav.path)}>
                    <ListItemText primary={nav.title} />
                  </ListItem>
                  {nav.children &&
                    nav.children.map((child, childIndex) => (
                      <ListItem
                        key={childIndex}
                        sx={{ pl: 4 }}
                        onClick={() => onNavigate(child.path)}
                      >
                        <ListItemText primary={child.title} />
                      </ListItem>
                    ))}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {user ? (
            <>
              <Avatar
                src={user.profileUrl || ""}
                alt={user.firstName}
                onClick={handleAvatarMenuOpen}
                sx={{ cursor: "pointer" }}
              />
              <Menu
                anchorEl={avatarMenuAnchor}
                open={Boolean(avatarMenuAnchor)}
                onClose={handleAvatarMenuClose}
              >
                <MenuItem onClick={onUpdateProfile}>Update Profile</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                sx={{
                  color: "#000",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#1976d2",
                  },
                }}
                onClick={() => onNavigate("register")}
              >
                Đăng Ký
              </Button>
              <Button
                sx={{
                  color: "#000",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#1976d2",
                  },
                }}
                onClick={() => onNavigate("login")}
              >
                Đăng Nhập
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
