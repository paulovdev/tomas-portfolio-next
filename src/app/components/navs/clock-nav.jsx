"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  // Troque para o fuso desejado, exemplo: "America/Sao_Paulo"
  const timeZone = "Atlantic/Canary";

  useEffect(() => {
    let interval;

    const fetchTime = async () => {
      try {
        const res = await fetch(
          `http://worldtimeapi.org/api/timezone/${timeZone}`
        );
        const data = await res.json();

        // data.datetime vem no formato: 2025-11-20T22:15:30.123456+00:00
        const date = new Date(data.datetime);

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // hora 0 vira 12

        const formatted =
          [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
          ].join(":") + ` ${ampm}`;

        setTime(formatted);
      } catch (err) {
        console.error("Erro ao buscar horário:", err);
      }
    };

    fetchTime(); // busca inicial
    interval = setInterval(fetchTime, 1000); // atualiza a cada 1s

    return () => clearInterval(interval);
  }, [timeZone]);

  return <div>{time}</div>;
};

export default Clock;
