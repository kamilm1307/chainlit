import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  ListItem,
  Button,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilValue } from "recoil";
import { projectSettingsState } from "state/chat";
import { Link } from "react-router-dom";

export default function UserAvatar() {
  const { user, logout } = useAuth0();
  const pSettings = useRecoilValue(projectSettingsState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return (
      <Button component={Link} to="/login" variant="outlined">
        Login
      </Button>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <IconButton
        edge="end"
        onClick={handleClick}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          p: 0,
        }}
      >
        <Avatar sx={{ width: 32, height: 32 }} src={user.picture || undefined}>
          {user.name?.[0]}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Typography width="100%" fontSize="14px" fontWeight={700}>
            {user.name}
          </Typography>
          <Typography width="100%" fontSize="13px" fontWeight={400}>
            {user.email}
          </Typography>
        </ListItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            });
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
