import React, { Suspense } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import ChannelCard from "../components/ChannelCard";
import * as d3 from "d3";
import * as util from "../util.js";

class Channels extends React.Component {
  static propTypes = {
    // ...prop type definitions here
    source: PropTypes.oneOf(["sport", "tv"]).isRequired
  };

  static defaultProps = {
    source: "tv"
  };

  constructor(props) {
    super(props);

    this.state = {
      video: null,
      channels: []
    };

    this.isShowing = this.isShowing.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.startVideo = this.startVideo.bind(this);
    this.getChannelsUrl = this.getChannelsUrl.bind(this);
  }

  isShowing() {
    return this.state.video != null;
  }

  stopVideo() {
    this.setState({ video: null });
  }

  startVideo = newValue => {
    this.setState({ video: newValue });
  };

  getChannelsUrl = () => {
    switch (this.props.source) {
      case "sport":
        return util.getSportUrl();
      case "tv":
        return util.getTvUrl();
      default:
        return util.getTvUrl();
    }
  };

  async componentDidMount() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    Promise.all([d3.json(this.getChannelsUrl())])
      .then(([channels]) => {
        this.setState({ channels: channels[0].streams });
      })
      .catch(err => console.log("Error loading channels, ", err));
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
          <video
            controls
            muted
            width="100%"
            height="100%"
            autoPlay
            preload="auto"
            src={this.state.video}
            type="video/mp4"
          ></video>
          <div id="closeButton" className={this.props.classes.closePlayer}>
            <IconButton onClick={this.stopVideo} color="inherit">
              <Close />
            </IconButton>
          </div>
        </div>
        <div id="cards" 
          className={clsx(this.props.classes.cards, this.isShowing() && this.props.classes.hide)}>
          <Suspense fallback="Loading...">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={4}
              id="channelGrid"
            >
              {this.state.channels.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                  <Grid item key={labelId}>
                    <ChannelCard
                      cover={value.image}
                      title={value.title}
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
    cards: {
      padding: "30px"
    },
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
})(Channels);
