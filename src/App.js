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
import SportPage from "./pages/Sport";
import CartoonPage from "./pages/Cartoon";
import MoviePage from "./pages/Movie";
import TvPage from "./pages/Tv";

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

  const toggleTheme = () => {
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
          <Header callbackToggleTheme={toggleTheme} />
          <Container maxWidth="xl" id="main" className={classes.main}>
            <main className={clsx(classes.content)}>
              <Switch>
                <Route path="/" exact component={SportPage} />
                <Route path="/tv" exact component={TvPage} />
                <Route path="/sport" exact component={SportPage} />
                <Route path="/movie" exact component={MoviePage} />
                <Route path="/cartoon" exact component={CartoonPage} />
              </Switch>
            </main>
          </Container>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
