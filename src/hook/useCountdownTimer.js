import { useEffect, useState } from "react";

export function useCountdownTimer(initialSeconds = 600) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return {
    timeLeft,
    formattedTime,
    reset: () => setTimeLeft(initialSeconds),
    isExpired: timeLeft <= 0,
  };
}
