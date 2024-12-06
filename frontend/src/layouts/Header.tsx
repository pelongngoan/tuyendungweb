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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { navigation } from "../navigation";

interface NavItem {
  title: string;
  path: string;
  icon?: JSX.Element; // Include the icon field
  children?: NavItem[];
}

interface HeaderProps {
  title?: string;
  logo?: React.ReactNode;
  onNavigate: (destination: string) => void;
}

export const Header = ({ onNavigate, logo }: HeaderProps) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<NavItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    children?: NavItem[]
  ) => {
    setAnchorEl(event.currentTarget);
    console.log(children);

    setMenuItems(children || []);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
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
          {logo ? (
            logo
          ) : (
            <Box
              component="img"
              src={"../assets/logo.jpg"}
              alt="Logo"
              sx={{ width: 50, height: 50 }}
            />
          )}
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
                  {child.icon && (
                    // <Box
                    //   sx={{
                    //     display: "flex",
                    //     alignItems: "center",
                    //     marginRight: "10px",
                    //   }}
                    // >
                    <>{child.icon.key}</>
                    // </Box>
                  )}
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

        {/* Mobile Drawer */}
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

        {/* Auth Buttons */}
        <Box
          sx={{
            display: isMobile ? "none" : "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};
