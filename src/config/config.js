import routes from "./routes.js";
import themes from "./theme.js";
import neotv from "./neotv.js";

const config = {
  initial_state: {
    themeSource: {
      dark: false
    },
    locale: "en"
  },
  themes,
  routes,
  neotv,
  logos: [
    { name: "canal+ sport", icon: "canal+sport.png" },
    { name: "canal+ sport 1", icon: "canal+sport.png" },
    { name: "canal+ sport 2", icon: "canal+sport2.png" },
    { name: "infosport", icon: "infosport.png" },
    { name: "BFM sport", icon: "bfmsport.png" },
    { name: "eurosport 1", icon: "eurosport.png" },
    { name: "eurosport 2", icon: "eurosport.png" },
    { name: "elevensport 1", icon: "elevensport.webp" },
    { name: "elevensport 2", icon: "elevensport.webp" },
    { name: "RMC sport 1", icon: "rmcsport.svg" },
    { name: "RMC sport 2", icon: "rmcsport.svg" },
    { name: "RMC sport 3", icon: "rmcsport.svg" },
    { name: "beinsport", icon: "beinsport.svg" }
  ]
};

export default config;
