import { Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const CountDown = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime); // Reset timeLeft when initialTime changes
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount or reset
  }, [timeLeft]);

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return "Time's up!";
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return <Text>{formatTime(timeLeft)}</Text>;
};

export default CountDown;
