import { useState, useEffect } from "react";

function useDate(): string {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    setDate(
      year.toString() +
        (month < 10 ? "0" + month.toString() : month.toString()) +
        (date < 10 ? "0" + date.toString() : date.toString())
    );
  }, []);

  return date;
}

export default useDate;
