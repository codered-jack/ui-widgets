import { useEffect, useState, useRef } from "react";

function useTimer(totalDuration) {
  const [seconds, setSeconds] = useState(totalDuration);
  let timer = useRef(null);
  const start = () => {
    timer.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timer.current);
  };

  useEffect(() => {
    if (seconds < 1) {
      stop();
      setSeconds(totalDuration);
    }
  }, [seconds, stop]);

  return {
    start,
    stop,
    seconds,
  };
}

export default useTimer;
