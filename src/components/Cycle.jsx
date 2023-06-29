import React from 'react';

const Cycle = ({ isBreak, time, formatTime }) => {
  return (
    <div>
      <div className="text-4xl sm:text-[50px] md:text-[50px] ml-[50px] my-[40px] text-[#85E0FF] underline  decoration-dashed">{isBreak ? 'Break' : 'Work'}</div>
      <div className="text-[60px] font-extrabold mt-2 mb-6 ml-[30px] text-[#f5f5f5]">{formatTime(time)}</div>
    </div>
  );
};

export default Cycle;
