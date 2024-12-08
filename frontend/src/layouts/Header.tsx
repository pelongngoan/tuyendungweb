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
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { navigation, NavItem } from "../navigation";
import { UserDataType } from "../context/types";

interface HeaderProps {
  title?: string;
  onNavigate: (destination: string) => void;
  user: UserDataType | null;
  onLogout: () => void;
  onUpdateProfile: () => void;
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
  console.log(anchorEl);
  console.log(drawerOpen);

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
        backgroundColor: "#1976d2",
        height: 56,
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          minHeight: "56px",
          padding: "0 16px",
        }}
      >
        <Box
          className="logo"
          onClick={() => onNavigate("")}
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <img
            src="https://raw.githubusercontent.com/pelongngoan/tuyendungweb/224ceb10bbebc23be112aa52a0a4d740eab08967/frontend/src/assets/logo.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />
        </Box>

        {!isMobile ? (
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {navigation().map((nav, index) =>
              nav.children ? (
                <Button
                  key={index}
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    fontWeight: 500,
                    borderRadius: "8px",
                    padding: "6px 12px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
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
                    color: "white",
                    textTransform: "capitalize",
                    fontWeight: 500,
                    borderRadius: "8px",
                    padding: "6px 12px",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
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
          <IconButton
            onClick={() => toggleDrawer(true)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
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
            gap: "0.5rem",
          }}
        >
          {user ? (
            <>
              <Box
                onClick={handleAvatarMenuOpen}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  {user.firstName}
                </Typography>
                <Avatar
                  alt={user.firstName}
                  sx={{ width: 32, height: 32, cursor: "pointer" }}
                />
              </Box>
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
                  color: "white",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  borderRadius: "8px",
                  padding: "6px 12px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => onNavigate("register")}
              >
                Đăng Ký
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  borderRadius: "8px",
                  padding: "6px 12px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
