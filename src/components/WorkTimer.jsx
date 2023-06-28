import React, { useState, useEffect } from 'react';

const WorkTimer = ({ cycles, onCycleComplete }) => {
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }

    if (timer === 0) {
      clearInterval(interval);
      onCycleComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timer, onCycleComplete]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimer(25 * 60);
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-[#f4b2f5] mb-4 mt-4 ">Work Timer</h2>
      <div className="flex items-center mb-[30px] ml-[60px] text-[#FADBFA] font-semibold text-2xl">
        <span className="font-bold mr-1">{Math.floor(timer / 60)} : </span>
        <span>{(timer % 60).toString().padStart(2, '0')}</span>
      </div>
      <div className=''>
        <button
          onClick={startTimer}
          className="bg-[#F19CF2] hover:bg-[#B217B5] text-black hover:text-white py-2 px-4 rounded mr-2 w-[120px]"
        >
          Start
        </button>
        <button
          onClick={resetTimer}
          className="bg-[#FFFFFF] hover:bg-[#FADBFA] text-black py-2 px-4 rounded w-[120px]"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WorkTimer;

