import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../components/ChannelCard";
import * as d3 from "d3";
import * as util from "../util.js";
import "./Sport.css";

class Sport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      sports: []
    };
  }

  async componentDidMount() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    Promise.all([d3.json(util.getSportUrl())])
      .then(([sports]) => {
        this.setState({ sports: sports.streams });
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
              id="sportGrid"
            >
              {this.state.sports.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                  <Grid item key={labelId}>
                    <MediaCard
                      //imageUrl={util.fuseSearchIcon(LOGOS, value.title)}
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

export default Sport;
