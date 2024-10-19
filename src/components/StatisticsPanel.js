import React from 'react';

const StatisticsPanel = ({ title, children }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default StatisticsPanel;
