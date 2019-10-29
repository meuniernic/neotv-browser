import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../components/ChannelCard";
import * as d3 from "d3";
import * as util from "../util.js";

class Tv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      channels: []
    };
  }

  async componentDidMount() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    Promise.all([d3.json(util.getTvUrl())])
      .then(([channels]) => {
        this.setState({ channels: channels.streams });
      })
      .catch(err => console.log("Error loading data"));
  }

  render() {
    return (
      <React.Fragment>
        <div id="cards">
          <Suspense fallback="Loading...">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={4}
              id="tvGrid"
            >
              {this.state.channels.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                  <Grid item key={labelId}>
                    <MediaCard
                      imageUrl={value.image}
                      imageTitle={value.title}
                      cardTitle={value.title}
                      cardText={value.title}
                      link={value.url}
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

export default Tv;
