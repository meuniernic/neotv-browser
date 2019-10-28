import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { blue } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
  HomeOutlined,
  SportsSoccer,
  Movie,
  Reddit,
  Search
} from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: blue[900]
  },
  hide: {
    display: "none"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  filler: {
    flexGrow: 1
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

export default function Header(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [darkChecked, setDarkChecked] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDarkChecked = () => {
    props.callbackToggleTheme();
    setDarkChecked(prev => !prev);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Home"
          >
            <HomeOutlined />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            {t("application.shortName")}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder={t("application.search")}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.tab}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="scrollable prevent tabs example"
            >
              <Tab
                icon={<SportsSoccer />}
                label={t("menu.sport")}
                aria-label="football"
                {...a11yProps(0)}
                to="/sport"
              />
              <Tab
                icon={<Movie />}
                label={t("menu.movie")}
                aria-label="movies"
                {...a11yProps(1)}
                to="/movie"
              />
              <Tab
                icon={<Reddit />}
                label={t("menu.cartoon")}
                aria-label="cartoon"
                {...a11yProps(2)}
                to="/cartoon"
              />
            </Tabs>
          </div>
          <div className={classes.filler}></div>
          <div className={classes.root} />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={darkChecked}
                onChange={toggleDarkChecked}
              />
            }
            label={t("application.dark")}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
