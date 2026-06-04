import React, { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function ScrambleText({ text, className, speed = 80 }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalId = useRef(null);
  const progress = useRef(0);

  const stop = useCallback(() => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    progress.current = 0;

    intervalId.current = setInterval(() => {
      const scrambled = text
        .split('')
        .map((char, i) =>
          i < Math.floor(progress.current)
            ? char
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join('');

      setDisplayText(scrambled);

      progress.current += 0.2; // Locks one character every 5 frames

      if (progress.current >= text.length) {
        stop();
        setDisplayText(text);
      }
    }, speed);
  }, [text, speed, stop]);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {displayText}
    </span>
  );
}