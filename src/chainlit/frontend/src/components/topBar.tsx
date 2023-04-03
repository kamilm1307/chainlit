import { IconButton, Stack, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Logo } from "components/logo";
import { Link, useLocation } from "react-router-dom";
import UserAvatar from "./chat/userAvatar";
import { useAuth } from "hooks/auth";
import { useRecoilValue } from "recoil";
import { projectSettingsState } from "state/chat";
import { Key } from "@mui/icons-material";

function Nav() {
  const { isProjectMember } = useAuth();
  const location = useLocation();

  const tabs = [{ to: "/", label: "Chat" }];

  if (isProjectMember) {
    tabs.push({ to: "/dataset", label: "Dataset" });
    tabs.push({ to: "/test", label: "Test" });
  }

  const value = tabs.findIndex((t) => location.pathname === t.to);

  return (
    <Tabs
      value={value}
      indicatorColor="primary"
      TabIndicatorProps={{ sx: { display: "none" } }}
    >
      {tabs.map((t, i) => (
        <Tab component={Link} to={t.to} key={i} value={i} label={t.label} />
      ))}
    </Tabs>
  );
}

export default function TopBar() {
  const pSettings = useRecoilValue(projectSettingsState);
  const requiredKeys = !!pSettings?.userEnv?.length;

  return (
    <AppBar elevation={0} color="transparent" position="static">
      <Toolbar
        sx={{
          minHeight: "60px !important",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: (theme) => theme.palette.divider,
        }}
      >
        <Stack alignItems="center" direction="row">
          <Logo />
          <Nav />
        </Stack>
        <Stack
          alignItems="center"
          sx={{ ml: "auto" }}
          direction="row"
          spacing={2}
        >
          {requiredKeys && (
            <Tooltip title="API keys">
              <IconButton component={Link} to="/env">
                <Key />
              </IconButton>
            </Tooltip>
          )}
          <UserAvatar />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
