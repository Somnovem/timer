import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Target: 1 August 2026, 05:00 local time
const TARGET = new Date(2026, 7, 1, 5, 0, 0).getTime();

function getRemaining() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: diff <= 0 };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function Unit({ value, label, formatted }) {
  return (
    <div className="unit">
      <span className="unit-value">{formatted}</span>
      <span className="unit-label">{label}</span>
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState(getRemaining());
  const rootRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getRemaining());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds, done } = time;

  return (
    <div className="page" ref={rootRef}>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <main className="content">
        <p className="eyebrow">until you're home</p>

        {done ? (
          <h1 className="arrived">she's home</h1>
        ) : (
          <div className="timer" role="timer" aria-live="polite">
            <Unit value={days} formatted={days} label={days === 1 ? 'day' : 'days'} />
            <span className="colon">:</span>
            <Unit value={hours} formatted={pad(hours)} label="hrs" />
            <span className="colon">:</span>
            <Unit value={minutes} formatted={pad(minutes)} label="min" />
            <span className="colon">:</span>
            <Unit value={seconds} formatted={pad(seconds)} label="sec" />
          </div>
        )}

        <p className="target-date">01 August 2026 &middot; 05:00</p>

        <div className="candle" aria-hidden="true">
          <div className="flame" />
        </div>
      </main>
    </div>
  );
}
