import React, { Suspense } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import MediaCard from "../components/MediaCard";
import * as d3 from "d3";
import * as util from "../util.js";

class MovieLibrary extends React.Component {
  static propTypes = {
    // ...prop type definitions here
    source: PropTypes.oneOf(["cartoon", "movie"]).isRequired,
    language: PropTypes.oneOf(["fr", "en"]).isRequired,
  };

  static defaultProps = {
    source: "movie",
    language: "fr"
  };

  constructor(props) {
    super(props);

    this.state = {
      video: null,
      library: []
    };

    this.isShowing = this.isShowing.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.startVideo = this.startVideo.bind(this);
    this.getLibraryUrl = this.getLibraryUrl.bind(this);
  }

  isShowing() {
    return this.state.video !== null;
  }

  stopVideo() {
    this.setState({ video: null });
  }

  startVideo = newValue => {
    this.setState({ video: newValue });
  };

  getLibraryUrl = () => {
    switch (this.props.source) {
      case "movie":
        return util.getMovieUrl(this.props.language);
      case "cartoon":
        return util.getCartoonUrl(this.props.language);
      default:
        return util.getCartoonUrl(this.props.language);
    }
  };

  async componentDidMount() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    Promise.all([d3.json(this.getLibraryUrl())])
      .then(([data]) => {
        this.setState({ library: data.streams });
      })
      .catch(err => console.log("Error loading libary, ", err ));
  }

  render() {
    return (
      <React.Fragment>
        <div
          id="player"
          className={clsx(
            this.props.classes.player,
            !this.isShowing() && this.props.classes.hide
          )}
        >
          <div id="closeButton" className={this.props.classes.closePlayer}>
            <IconButton onClick={this.stopVideo} color="inherit">
              <Close />
            </IconButton>
          </div>
          <video
            controls
            preload="auto"
            poster=""
            autoPlay
            muted
            width="100%"
            height="100%"
          >
            <source src={this.state.video} type="video/mp4" />
          </video>
        </div>
        <div
          id="cards"
          className={clsx(this.isShowing() && this.props.classes.hide)}
        >
          <Suspense fallback="Loading...">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={4}
              id="LibraryGrid"
            >
              {this.state.library.map((value, index) => {
                const itemId = "item-" + index;
                return (
                  <Grid item key={itemId}>
                    <MediaCard
                      variant="full"
                      cover={value.image}
                      title={value.title}
                      date={value.date}
                      description={value.overview}
                      media={value.url}
                      callback={() => {
                        this.startVideo(value.url);
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Suspense>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(function(theme) {
  return {
    player: {
      height: "100%",
      width: "100%"
    },
    closePlayer: {
      position: "absolute",
      top: 70,
      right: 10,
      zIndex: theme.zIndex.tooltip,
      color: grey[300]
    },
    hide: {
      display: "none"
    }
  };
})(MovieLibrary);
