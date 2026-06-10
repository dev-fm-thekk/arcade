import React, { useState, useEffect, useRef, useCallback } from 'react';

const POOLS = [
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓ',
  '⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻',
  '░▒▓█▄▀▌▐■□▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕',
  '∀∁∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∓∔∕∖∗∘∙√∛∜∝∞∟∠∡∢∣∤∥∦∧∨∩∪∫∬∭∮∯∰∱∲∳',
  'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
  'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω',
];

const cycleChar = (frame) => {
  const pool = POOLS[frame % POOLS.length];
  return pool[Math.floor(Math.random() * pool.length)];
};

export default function ScrambleText({ text, className, speed = 60 }) {
  const [chars, setChars] = useState(() =>
    text.split('').map(ch => ({ final: ch, display: ch === ' ' ? ' ' : cycleChar(0), locked: false }))
  );
  const frameRef = useRef(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(0);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    progressRef.current = 0;
    frameRef.current = 0;

    setChars(text.split('').map(ch => ({
      final: ch,
      display: ch === ' ' ? ' ' : cycleChar(0),
      locked: false,
    })));

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;
      progressRef.current += 0.18;
      const lockedUpTo = Math.floor(progressRef.current);

      setChars(text.split('').map((ch, i) => {
        if (ch === ' ') return { final: ch, display: ' ', locked: true };
        if (i < lockedUpTo) return { final: ch, display: ch, locked: true };
        return {
          final: ch,
          display: cycleChar(frameRef.current + i),
          locked: false,
        };
      }));

      if (progressRef.current >= text.length) {
        stop();
        setChars(text.split('').map(ch => ({ final: ch, display: ch, locked: true })));
      }
    }, speed);
  }, [text, speed, stop]);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className={className}
      style={{ display: 'inline-block', fontVariantLigatures: 'none' }}
      onMouseEnter={start}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            /*
             * Every span is sized to the FINAL character width using a
             * CSS trick: the locked char sits in normal flow; the unlocked
             * char is absolute-positioned inside, so it never affects layout.
             * This kills all horizontal jitter completely.
             */
            display: 'inline-block',
            position: 'relative',
            // Reserve the space of the real character at all times
            width: c.final === ' ' ? '0.3em' : '1ch',
          }}
        >
          {/* Ghost char — always in flow, always the final letter, invisible until locked */}
          <span style={{ visibility: 'hidden', userSelect: 'none' }}>
            {c.final}
          </span>

          {/* Visible char — absolutely positioned so it never shifts layout */}
          <span
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: c.locked ? 'inherit' : "'Courier New', 'Lucida Console', monospace",
              fontSize: 'inherit',           // NO random font size — that was causing the jerk
              opacity: c.locked ? 1 : 0.6,
              transition: c.locked ? 'opacity 0.08s' : 'none',
            }}
          >
            {c.display}
          </span>
        </span>
      ))}
    </span>
  );
}