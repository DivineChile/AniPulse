import { useState, useEffect } from "react";
import moment from "moment";

export default function useCountdown(releaseDate) {
  const target = moment(releaseDate, "MMMM DD, YYYY"); // parse "January 16, 2026"

  const calculate = () => {
    const now = moment();
    const diff = moment.duration(target.diff(now));

    return {
      days: Math.floor(diff.asDays()),
      hours: diff.hours(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
      completed: diff.asMilliseconds() <= 0,
    };
  };

  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [releaseDate]);

  return time;
}
