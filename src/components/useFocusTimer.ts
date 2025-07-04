import { useEffect, useState } from 'react';

export type TimerStatus = 'running' | 'paused' | 'finished';

export function useFocusTimer(initialTime: number, onFinish? : () => void) {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [status, setStatus] = useState<TimerStatus>('paused');
  const [inputTime, setInputTime] = useState(initialTime);

  useEffect(() => {
    setInputTime(initialTime);
    setRemainingTime(initialTime);
    setStatus('paused');
  }, [initialTime]);

  useEffect(() => {
    if (status === 'running') {
      const intervalId = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 0) {
            setStatus('finished');
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [status, onFinish]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setInputTime(value);
  };

  return {
    remainingTime,
    setRemainingTime,
    status,
    setStatus,
    inputTime,
    setInputTime,
    handleInputChange,
    formatTime,
  };
}