import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import MovieCard from "../components/MovieCard";
import * as d3 from "d3";
import * as util from "../util.js";

class Cartoon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartoons: []
    };
  }

  async componentDidMount() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    Promise.all([d3.json(util.getCartoonUrl())])
      .then(([data]) => {
        this.setState({cartoons: data.streams});
      })
      .catch(err => console.log("Error loading data"));
  }

  render() {
    return (
      <React.Fragment>
        <div id="home">
          <div id="cards">
            <Suspense fallback="Loading...">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
                id="CartoonGrid"
              >
                {this.state.cartoons.map((value, index) => {
                  const itemId = "item-" + index;
                  return (
                    <Grid item key={itemId}>
                      <MovieCard
                        imageUrl={value.image}
                        imageTitle={value.title}
                        cardTitle={value.title}
                        cardDate={value.date}
                        cardIntroText={util.wrapText(value.overview)}
                        cardText={value.overview}
                        link={value.url}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Suspense>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cartoon;
