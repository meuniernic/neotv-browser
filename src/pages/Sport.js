import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../components/ChannelCard";
import * as d3 from "d3";
import './Sport.css';
import * as util from '../util.js';


const LOGOS = [
  { name: 'canal+ sport', icon: 'canal+sport.png'},
  { name: 'canal+ sport 1', icon: 'canal+sport.png'},
  { name: 'canal+ sport 2', icon: 'canal+sport2.png'},
  { name: 'infosport', icon: 'infosport.png'},
  { name: 'BFM sport', icon: 'bfmsport.png'},
  { name: 'eurosport 1', icon: 'eurosport.png'},
  { name: 'eurosport 2', icon: 'eurosport.png'},
  { name: 'elevensport 1', icon: 'elevensport.webp'},
  { name: 'elevensport 2', icon: 'elevensport.webp'},
  { name: 'RMC sport 1', icon: 'rmcsport.svg'},
  { name: 'RMC sport 2', icon: 'rmcsport.svg'},
  { name: 'RMC sport 3', icon: 'rmcsport.svg'},
  { name: 'beinsport', icon: 'beinsport.svg'}
];

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
    Promise.all([
      d3.json(util.getSportUrl())
    ])
      .then(([sports]) => {
        this.setState({sports: sports.streams});
      })
      .catch(err => console.log("Error loading data"));
  }

  render() {
    return (
      <React.Fragment>
        <div id="home">
          <div id="cards" >
            <Suspense fallback="Loading...">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
              >
                {this.state.sports.map((value, index) => {
                  const labelId = `checkbox-list-secondary-label-${index}`;
                  return (
                    <Grid item key={labelId}>
                      <MediaCard
                        imageUrl={util.fuseSearchIcon(LOGOS, value.title)}
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
        </div>
      </React.Fragment>
    );
  }
}

export default Sport;