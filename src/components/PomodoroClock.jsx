import React, { useState, useEffect } from 'react';
import Cycle from './Cycle';

const PomodoroClock = () => {
  const [time, setTime] = useState(25 * 60); 
  const [cycle, setCycle] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [cyclesLimit, setCyclesLimit] = useState(2);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      clearInterval(interval);
      setIsRunning(false);

      if (isBreak) {
       
        setIsBreak(false);
        setCycle((prevCycle) => prevCycle + 1);

        if (cycle === cyclesLimit) {
        
          stopTimer();
        } else {
        
          if (completedCycles === cyclesLimit) {
            
            setCompletedCycles(0);
          }
          startTimer();
        }
      } else {
   
        setIsBreak(true);
        setTime(5 * 60);
        setIsRunning(true);
      }
    }

    return () => clearInterval(interval);
  }, [time, isRunning, cycle, isBreak, cyclesLimit, completedCycles]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (completedCycles === cyclesLimit) {
    
      setCompletedCycles(0);
    }
    setIsRunning(true);
    const duration = isBreak ? 5 * 60 : 25 * 60;
    setTime(duration);
    setShouldReset(false); 
  };

  const stopTimer = () => {
    setIsRunning(false);
    setShouldReset(true); 
  };

  const resetTimer = () => {
    stopTimer();
    setTime(25 * 60);
    setIsBreak(false);
    setCycle(0);
    setCompletedCycles(0);
    setShouldReset(false); 
  };

  const handleCyclesLimitChange = (event) => {
    const limit = parseInt(event.target.value);
    setCyclesLimit(limit);
  };

  useEffect(() => {
    if (cycle === cyclesLimit) {
      stopTimer();
    }
  }, [cycle, cyclesLimit]);

  useEffect(() => {
    if (completedCycles === cyclesLimit) {
      stopTimer();
    }
  }, [completedCycles, cyclesLimit]);

  useEffect(() => {
    if (!isRunning && completedCycles === cyclesLimit) {
      resetTimer();
    }
  }, [isRunning, completedCycles, cyclesLimit]);

  return (
    <div className="w-full h-screen relative text-white">

    <img className=" w-full h-screen object-cover " src="https://images.pexels.com/photos/1178684/pexels-photo-1178684.jpeg?auto=compress&cs=tinysrgb&w=2070&q=80" alt="Timer img"/>

    <div className='absolute  top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] flex justify-end items-center'>

        <div className="flex flex-col top-0 w-full h-screen justify-center  items-center absolute " >

      <h1 className="text-4xl sm:text-[80px] md:text-[100px] font-bold mt-8 text-[#FFA500] mb-5  underline">Pomodoro Clock</h1>
      <div className="mt-8">
        <Cycle isBreak={isBreak} time={time} formatTime={formatTime} />
        <div className="mt-4">
          <button
            className="bg-[#00FF00] hover:bg-[#00A300] text-black font-bold py-2 px-4 rounded mr-4 w-[120px]"
            onClick={startTimer}
            disabled={isRunning || completedCycles === cyclesLimit || shouldReset} 
          >
            Start
          </button>
    
          <button
            className="bg-[#FF6666] hover:bg-[#FF0A0A] text-black font-bold py-2 px-4 rounded ml-2  w-[120px]"
            onClick={resetTimer}
            disabled={isRunning || !shouldReset} 
          >
            Reset
          </button>
        </div>
        <div className="mt-7 ml-[50px]">
          <label htmlFor="cyclesLimit" className="mr-2 text-[#999999] text-xl">
            Cycles Limit:
          </label>
          <input
            id="cyclesLimit"
            type="number"
            min="1"
            max="20"
            value={cyclesLimit}
            onChange={handleCyclesLimitChange}
            className="border-2 border-[#999999] py-1 px-2 rounded text-black"
          />
        </div>
        <div className="mt-4 ml-[50px] text-[#999999] text-xl">
          Cycle: <span className='text-[#f5f5f5]'>  {cycle} / {cyclesLimit} </span>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PomodoroClock;
