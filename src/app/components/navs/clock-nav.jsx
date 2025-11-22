"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  const userTimeZone =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();

      let hours = date.toLocaleString("en-US", {
        hour: "2-digit",
        hour12: true,
        timeZone: userTimeZone,
      });

      let [_, hourOnly, suffix] = hours.match(/(\d{1,2})\s?(AM|PM)/);

      hourOnly = hourOnly.padStart(2, "0");

      const minute = date
        .toLocaleString("en-US", { minute: "2-digit", timeZone: userTimeZone })
        .padStart(2, "0");

      const second = date
        .toLocaleString("en-US", { second: "2-digit", timeZone: userTimeZone })
        .padStart(2, "0");

      setTime(`${hourOnly}:${minute}:${second} ${suffix}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [userTimeZone]);

  return <div>{time}</div>;
};

export default Clock;
