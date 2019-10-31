import React, { Suspense } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
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
      isLoading: true,
      channels: []
    };

    this.getChannelsUrl = this.getChannelsUrl.bind(this);
  }

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
        this.setState({ channels: channels.streams });
      })
      .catch(err => console.log("Error loading channels, ", err));
  }

  render() {
    return (
      <React.Fragment>
        <div id="cards" className={this.props.classes.cards}>
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
      padding: '30px'
    }
  };
})(Channels);
