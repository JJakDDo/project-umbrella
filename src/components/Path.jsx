import React from "react";

import WeatherIcon from "./WeatherIcon";
const Path = ({ id, d, fcst, tx, ty, changeRenderOrder }) => {
  return (
    <>
      <path
        id={id}
        className='OUTLINE'
        d={d}
        onMouseEnter={(e) => changeRenderOrder(e.target.id)}
      ></path>
      <WeatherIcon fcst={fcst} tx={tx} ty={ty} />
    </>
  );
};

export default Path;
