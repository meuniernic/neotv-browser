import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
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
  Search,
  Tv
} from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as d3 from "d3";
import * as util from "../util.js";


function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: 0,
      darkChecked: false,
      search: '',
      result: []
    };

    this.handleMenuItemChange = this.handleMenuItemChange.bind(this);
    this.toggleDarkChecked = this.toggleDarkChecked.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleMenuItemChange = (event, newValue) => {
    this.setState({ menuItem: newValue });
  };

  toggleDarkChecked = () => {
    this.props.callbackToggleTheme();
    this.setState({ darkChecked: !this.state.darkChecked });
  };

  handleChangeSearch = (event) => {
    console.log(event.target.value);
    var newValue = event.target.value;
    this.setState({search: newValue});
    if (newValue.length > 2) {
      console.log(util.getSearchUrl(newValue));
      Promise.all([d3.json(util.getSearchUrl(newValue))])
      .then(([data]) => {
        console.log("search result");
        console.log(data);
        this.setState({ result: data });
      })
      .catch(err => console.log("Error loading data"));
    }
  };

  render() {
    const { t  } = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar position="sticky" className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={this.props.classes.menuButton}
              color="inherit"
              aria-label="Home"
            >
              <HomeOutlined />
            </IconButton>

            <Typography
              className={this.props.classes.title}
              variant="h6"
              noWrap
            >
              {t("application.shortName")}
            </Typography>
            <div className={this.props.classes.search}>
              <div className={this.props.classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder={t("application.search")}
                classes={{
                  root: this.props.classes.inputRoot,
                  input: this.props.classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={this.handleChangeSearch}
                value={this.state.search}
              />
            </div>
            <div className={this.props.classes.tab}>
              <Tabs
                value={this.state.menuItem}
                onChange={this.handleMenuItemChange}
                variant="fullWidth"
                aria-label="scrollable prevent tabs example"
              >
                <Tab
                  icon={<Tv />}
                  label={t("menu.tv")}
                  aria-label="TV"
                  {...a11yProps(0)}
                  to="/tv"
                />
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
            <div className={this.props.classes.filler}></div>
            <div className={this.props.classes.root} />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={this.state.darkChecked}
                  onChange={this.toggleDarkChecked}
                />
              }
              label={t("application.dark")}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default withStyles(function(theme){
return {
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
}
})(withTranslation('translation')(Header));
