import React from "react";

import {
  BsSunFill,
  BsFillCloudRainHeavyFill,
  BsFillCloudRainFill,
} from "react-icons/bs";

const WeatherIcon = ({ fcst, tx, ty }) => {
  switch (fcst) {
    case "0": {
      return (
        <BsSunFill
          style={{ fill: "orange", fontSize: "1.1rem" }}
          x={tx}
          y={ty}
        ></BsSunFill>
      );
    }
    case "1": {
      return (
        <BsFillCloudRainHeavyFill
          style={{ fill: "#C4D3DF", fontSize: "1.1rem" }}
          x={tx}
          y={ty}
        ></BsFillCloudRainHeavyFill>
      );
    }
    case "5": {
      return (
        <BsFillCloudRainFill
          style={{ fill: "#C4D3DF", fontSize: "1.1rem" }}
          x={tx}
          y={ty}
        ></BsFillCloudRainFill>
      );
    }
    default: {
      return null;
    }
  }
  return <div>WeatherIcon</div>;
};

export default WeatherIcon;
