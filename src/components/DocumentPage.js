import React from 'react';
import DocumentTable from './DocumentTable';  // Your DocumentTable component
import BarChart from './BarChart';  // Your BarChart component
import LineChart from './LineChart';  // Your LineChart component

const DocumentPage = ({ documents }) => {  // Accept documents as a prop

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded-lg p-6">
          {/* Pass documents to DocumentTable */}
          <DocumentTable documents={documents} />
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
