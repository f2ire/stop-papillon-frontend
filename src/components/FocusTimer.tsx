import React from 'react';
import { useFocusTimer} from './useFocusTimer';

type TimerProps = {
  initialTime: number;
  onFinish?: () => void;
};

const FocusTimer: React.FC<TimerProps> = ({ initialTime, onFinish }) => {
  const {
    remainingTime,
    setRemainingTime,
    status,
    setStatus,
    inputTime,
    handleInputChange,
    formatTime,
  } = useFocusTimer(initialTime, onFinish);

  return (
    <div>
      <h1>Flutter Time</h1>
      <p>Status : {status}</p>
      <p>
        Time : {formatTime(remainingTime)}
        <br />. Target ={' '}
        <input
          type="number"
          min={1}
          value={inputTime}
          onChange={handleInputChange}
          disabled={status === 'running'}
        />{' '}
        secondes
        <button
          onClick={() => {
            setRemainingTime(inputTime);
            setStatus('paused');
          }}
          disabled={status === 'running' || inputTime === remainingTime}
        >
          Appliquer
        </button>
      </p>

      <button
        onClick={() => setStatus('running')}
        disabled={
          status === 'running' || remainingTime === 0 || status === 'finished'
        }
      >
        Start
      </button>
      <button
        onClick={() => setStatus('paused')}
        disabled={status !== 'running'}
      >
        Pause
      </button>
      <button
        onClick={() => {
          setStatus('running');
          setRemainingTime(inputTime);
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default FocusTimer;
