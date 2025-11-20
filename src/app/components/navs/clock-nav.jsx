"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "en-US";
  const userTimeZone =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();

      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: userTimeZone,
      };

      let formatted = date
        .toLocaleTimeString(userLocale, options)
        .replace(/\./g, "");

      const match = formatted.match(/(\d{1,2}):(\d{2}):(\d{2})\s?(AM|PM)/i);

      if (match) {
        let [, hour, minute, second, suffix] = match;

        hour = hour.padStart(2, "0");

        formatted = `${hour}:${minute}:${second} ${suffix.toUpperCase()}`;
      }

      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [userLocale, userTimeZone]);

  return <div>{time}</div>;
};

export default Clock;
