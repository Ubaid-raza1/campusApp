import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { SignOut } from "../../firebase/Firebase";
import navbarHelper from "./NavbarHelper";
import { useDispatch, useSelector } from "react-redux";
import SimpleButton from "../button/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const settings = ["Profile", "Logout"];

const Navbar = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(#fff, #4a4e69)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              {!!state?.user?.approved && !!state?.user?.block
                ? state?.user?.role
                : !!state?.user?.block
                ? ""
                : ""}
            </Link>
          </Typography>
          {!!state?.user?.approved && !!state?.user?.block ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {navbarHelper(state?.user)?.map((user) => (
                  <MenuItem key={user} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={user?.link}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {user?.url}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : !!state?.user.block ? (
            false
          ) : (
            false
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              {!!state?.user?.approved && !!state?.user?.block
                ? state?.user?.role
                : !!state?.user?.block
                ? false
                : false}
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarHelper(state?.user)?.map((user) => (
              <Link style={{ textDecoration: "none" }} to={user?.link}>
                <Button
                  key={user}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                  }}
                >
                  {!!state?.user?.approved && !!state?.user?.block
                    ? user?.url
                    : !!state?.user?.block
                    ? ""
                    : ""}
                </Button>
              </Link>
            ))}
          </Box>
          {state?.user?.role === "Admin" ? (
            <SimpleButton
              value="SignOut"
              endIcon={<ExitToAppIcon />}
              style={{ color: "black", border: "1px solid black" }}
              Variant="outlined"
              onClick={() => SignOut(settings[1], dispatch, navigate)}
              size="small"
            />
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={state?.user?.name}
                    src={`${
                      state?.user?.fileUrl
                        ? state?.user?.fileUrl
                        : "/static/images/avatar/2.jpg"
                    }`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings?.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => SignOut(setting, dispatch, navigate)}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
