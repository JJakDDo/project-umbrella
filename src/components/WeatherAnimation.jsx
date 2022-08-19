import React, { useState } from "react";
import Lottie from "react-lottie-player";

import sunny from "/public/sunny.json";
import night from "/public/night.json";
import cloudy from "/public/cloudy.json";
import rainNight from "/public/rain_night.json";
import rainDay from "/public/rain_day.json";
import partlyCloudyDay from "/public/partly_cloudy_day.json";
import partlyCloudyNight from "/public/partly_cloudy_night.json";
import { useEffect } from "react";

const WeatherAnimation = ({ ptyValue, skyValue, time }) => {
  const [animation, setAnimation] = useState(sunny);

  useEffect(() => {
    const hour = Number(time.slice(0, 2));
    switch (ptyValue) {
      case "0": {
        switch (skyValue) {
          case "1": {
            if (hour > 6 && hour < 18) {
              setAnimation(sunny);
            } else {
              setAnimation(night);
            }
            break;
          }
          case "3": {
            if (hour > 6 && hour < 18) {
              setAnimation(partlyCloudyDay);
            } else {
              setAnimation(partlyCloudyNight);
            }
            break;
          }
          default: {
            setAnimation(cloudy);
          }
        }
        break;
      }
      case "1":
      case "5": {
        if (hour > 6 && hour < 18) {
          setAnimation(rainDay);
        } else {
          setAnimation(rainNight);
        }
        break;
      }

      default: {
        setAnimation(sunny);
      }
    }
  }, [ptyValue]);

  return (
    <Lottie
      loop
      animationData={animation}
      play
      style={{ width: 150, height: 150 }}
    />
  );
};

export default WeatherAnimation;
