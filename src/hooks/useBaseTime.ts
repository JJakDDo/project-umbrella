import { useState, useEffect } from "react";

function useBaseTime(): string {
  const [baseTime, setBaseTime] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 45) {
      hours -= 1;
    }
    minutes = 30;
    setBaseTime(hours.toString() + minutes.toString());
  }, []);

  return baseTime;
}

export default useBaseTime;
