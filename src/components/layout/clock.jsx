"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const userTimeZone =
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "UTC";

    const updateClock = () => {
      const now = new Date();

      // Formata a hora, minuto e segundo de forma limpa usando a timezone do usuário
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: userTimeZone,
      });

      // O resultado vem algo como "09:57:19 PM"
      const formattedTime = formatter.format(now);
      setTime(formattedTime);
    };

    updateClock(); // Executa imediatamente no mount
    const interval = setInterval(updateClock, 1000); // Atualiza a cada 1 segundo em tempo real

    return () => clearInterval(interval);
  }, []);

  // Evita flash/mismatch no SSR exibindo vazio até o client hidratar
  if (!time) {
    return <span>--:--:-- --</span>;
  }

  return <span>{time}</span>;
};

export default Clock;
