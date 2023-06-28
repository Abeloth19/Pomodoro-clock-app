import React from 'react';

const Cycle = ({ cycles }) => {
  const totalMinutes = cycles * 30;

  return <div className="text-2xl mb-2 text-[#FCE8FC]">Total Time: {totalMinutes} minutes</div>;
};

export default Cycle;
