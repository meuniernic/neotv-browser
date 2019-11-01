import React, { Suspense } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import MediaCard from "../components/MediaCard";
//import * as d3 from "d3";
import * as util from "../util";
import request from "superagent";
import debounce from "lodash.debounce";

const PAGE_SIZE = 20;

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
      error: false,
      hasMore: true,
      isLoading: false,
      page: 0,
      video: null,
      library: [],
      display: []
    };

    this.isShowing = this.isShowing.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.startVideo = this.startVideo.bind(this);
    this.getLibraryUrl = this.getLibraryUrl.bind(this);

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadLibrary,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      //window.innerHeight + document.documentElement.scrollTop
      //=== document.documentElement.offsetHeight
      console.log(window.innerHeight + document.documentElement.scrollTop);
      console.log(document.documentElement.offsetHeight);
      if (
        window.innerHeight + document.documentElement.scrollTop
        > document.documentElement.offsetHeight
      ) {
        loadLibrary();
      }
    }, 100);
  }

  isShowing() {
    return this.state.video != null;
  }

  stopVideo() {
    this.setState({ video: null });
  }

  startVideo = (newValue) => {
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

  loadLibrary = () => {
    if (this.state.library.length === 0) {
      console.log("Initial loading");
      // Initial loading of full list
      this.setState({ isLoading: true }, () => {
        request
          .get(this.getLibraryUrl())
          .then((results) => {
            const fullData = results.body.streams;
            const nextDisplay = fullData.slice(0, PAGE_SIZE);
            
            // Merges the next users into our existing users
            this.setState({
              // Note: Depending on the API you're using, this value may
              // be returned as part of the payload to indicate that there
              // is no additional data to be loaded
              page: 1,
              hasMore: (fullData.length > PAGE_SIZE),
              isLoading: false,
              library: fullData,
              display: nextDisplay
            });
          })
          .catch((err) => {
            this.setState({
              error: err.message,
              isLoading: false,
             });
          })
      });
    } else {
      // Load next for display
      this.setState({ isLoading: true }, () => {
        const nextDisplay = this.state.library.slice(this.state.page*PAGE_SIZE, (this.state.page+1)*PAGE_SIZE);
        
        // Merges the next users into our existing users
        this.setState({
          // Note: Depending on the API you're using, this value may
          // be returned as part of the payload to indicate that there
          // is no additional data to be loaded
          page: this.state.page+1,
          hasMore: (this.state.library.length > this.state.display.length + PAGE_SIZE),
          isLoading: false,
          display: [
            ...this.state.display,
            ...nextDisplay,
          ],
        });

      });
    }  
  }


  componentWillMount() {
    // Loads library on initial load
    this.loadLibrary();
  }
/*
  async componentDidMount2() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    Promise.all([d3.json(this.getLibraryUrl())])
      .then(([data]) => {
        this.setState({ library: data.streams });
      })
      .catch(err => console.log("Error loading libary, ", err ));
  }
*/
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
          <video 
            controls
            muted
            width="100%"
            height="100%"
            autoPlay
            preload="auto"
            src={this.state.video} type="video/mp4">
          </video>
          <div id="closeButton" className={this.props.classes.closePlayer}>
            <IconButton onClick={this.stopVideo} color="inherit">
              <Close />
            </IconButton>
          </div>
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
              {this.state.display.map((value, index) => {
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
          {this.state.error &&
          <div style={{ color: '#900' }}>
            {this.state.error}
          </div>
        }
        {this.state.isLoading &&
          <div>Loading...</div>
        }
        {!this.state.hasMore &&
          <div>You did it! You reached the end!</div>
        }
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(function(theme) {
  return {
    player: {
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
