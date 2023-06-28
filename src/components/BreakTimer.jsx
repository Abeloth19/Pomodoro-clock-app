import React, { useState, useEffect } from 'react';

const BreakTimer = ({ onStart }) => {
  const [timer, setTimer] = useState(5 * 60);

  useEffect(() => {
    let interval = null;

    if (timer === 0) {
      onStart();
    }

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, onStart]);

  return (
    <div>
      <h2 className="text-4xl text-[#f4b2f5] font-bold mb-2">Break Timer</h2>
      <div className="flex items-center mb-[30px] ml-[60px] text-[#FADBFA] mt-4 font-semibold text-2xl">
        <span className="font-bold mr-1">{Math.floor(timer / 60)} : </span>
        <span>{(timer % 60).toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default BreakTimer;


