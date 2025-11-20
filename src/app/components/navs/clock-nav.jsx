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

      const formatted = date
        .toLocaleTimeString(userLocale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: userTimeZone,
        })
        .replace(" ", " ");

      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [userLocale, userTimeZone]);

  return <div>{time}</div>;
};

export default Clock;
