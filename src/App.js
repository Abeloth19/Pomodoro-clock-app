import React, { useState, useEffect } from 'react';
import WorkTimer from './components/WorkTimer';
import BreakTimer from './components/BreakTimer';
import Cycle from './components/Cycle';



const App = () => {
  const [cycles, setCycles] = useState(1);
  const [workTimerActive, setWorkTimerActive] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);

  useEffect(() => {
    if (workTimerActive && cycles > 0) {
      const timer = setTimeout(() => {
        setWorkTimerActive(false);
        setShowResetButton(true);
      }, 25 * 60 * 1000);
      return () => clearTimeout(timer);
    } else if (!workTimerActive) {
      setShowResetButton(true);
    }
  }, [workTimerActive, cycles]);

  const handleCycleChange = (e) => {
    setCycles(parseInt(e.target.value));
  };

  const handleCycleComplete = () => {
    setWorkTimerActive(false);
    setCycles((prevCycles) => prevCycles - 1);
  };

  const handleBreakComplete = () => {
    setWorkTimerActive(true);
    setShowResetButton(false);
  };

  const handleReset = () => {
    setWorkTimerActive(true);
    setCycles(1);
    setShowResetButton(false);
  };

  return (

  <div className="w-full h-screen relative text-white">
<img className=" w-full h-screen object-cover " src="https://images.pexels.com/photos/1178684/pexels-photo-1178684.jpeg?auto=compress&cs=tinysrgb&w=2070&q=80" alt="Timer img"/>
<div className='absolute  top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] flex justify-end items-center'>
    <div className="flex flex-col top-0 w-full h-screen justify-center  items-center absolute " >
      
      
      <h1 className="md:text-[50px] sm:text-[40px] text-4xl underline font-extrabold mb-[50px] text-[#f4b2f5]">POMODORO CLOCK</h1>

      <div className="mb-4">
        <label htmlFor="cycleInput" className="mr-2 text-xl font-semibold text-[#fce8fc]">
          Number of Cycles:
        </label>
        <input
          id="cycleInput"
          type="number"
          min="1"
          max="20"
          value={cycles}
          onChange={handleCycleChange}
          className="border-2 border-[#f4b2f5] px-2 py-1 text-black rounded-sm"
        />
      </div>

      <Cycle cycles={cycles} />

      {workTimerActive ? (
        <WorkTimer cycles={cycles} onCycleComplete={handleCycleComplete} />
      ) : (
        <BreakTimer onStart={handleBreakComplete} />
      )}

      {showResetButton && (
        <div>
          <button
            onClick={handleReset}
            className="bg-[#FFFFFF] hover:bg-[#FADBFA] text-black py-2 px-4 rounded mt-4 w-[120px]"
          >
            Reset
          </button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default App;


