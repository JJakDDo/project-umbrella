import { useState, useEffect } from "react";

/**
 * Convert 24 hour time to AM/PM time
 * @param {number} time 24 hour clock time (e.g. 1500)
 * @returns {Array} AM/PM time
 */
const useConversion = (time) => {
  const [timeStr, setTimeStr] = useState("");

  const convertTimeToString = (time) => {
    const hour = Number(time.slice(0, 2));
    if (hour === 18) {
      setStyles(true);
    }
    if (hour < 12) {
      setTimeStr(`오전 ${hour}시`);
      return;
    }

    setTimeStr(`오후 ${hour - 12}시`);
  };

  useEffect(() => {
    convertTimeToString(time);
  }, []);

  return [timeStr];
};

export default useConversion;
