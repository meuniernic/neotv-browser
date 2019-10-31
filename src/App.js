import React from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import Channels from "./pages/Channels";
import MovieLibrary from "./pages/MovieLibrary";

import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  main: {
    padding: 0,
    flexGrow: 1,
    display: "flex"
  }
}));

export default function App() {
  const [theme, setTheme] = React.useState({
    palette: {
      type: "light"
    }
  });

  const toggleThemeType = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        type: newPaletteType
      }
    });
  };

  const muiTheme = createMuiTheme(theme);
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <div className={classes.root}>
          <Header callbackToggleTheme={toggleThemeType} />
          <Container maxWidth="xl" id="main" className={classes.main}>
            <main className={clsx(classes.content)}>
              <Switch>
                <Route path="/" exact component={() => <Channels source="tv"/>} />
                <Route path="/tv" exact component={() => <Channels source="tv"/>} />
                <Route path="/sport" exact component={() => <Channels source="sport"/>} />
                <Route path="/movie" exact component={() => <MovieLibrary source="movie"/>} />
                <Route path="/cartoon" exact component={() => <MovieLibrary source="cartoon"/>} />
              </Switch>
            </main>
          </Container>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
