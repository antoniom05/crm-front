import React, { useState } from 'react';
import DocumentTable from './DocumentTable'; // Assuming the DocumentTable component is already created
import BarChart from './BarChart'; // Assuming the BarChart component is already created
import LineChart from './LineChart'; // Assuming the LineChart component is already created

const DocumentPage = () => {
  const [documents] = useState([
    { nr: 1, statut: 'Închisă', orderNr: '20878', formType: 'Apel', date: '19.08.2024', agent: '-', person: 'Elena', subject: 'Ultra Distribution SRL', locality: '100 MUN. CHISINAU', callType: 'Industriale' },
    { nr: 2, statut: 'Închisă', orderNr: '20878', formType: 'Apel', date: '19.08.2024', agent: '-', person: 'Elena', subject: 'Ultra Distribution SRL', locality: '100 MUN. CHISINAU', callType: 'Industriale' },
    { nr: 10, statut: 'Deschisă', orderNr: '20878', formType: 'Apel', date: '19.08.2024', agent: '-', person: 'Elena', subject: 'Ultra Distribution SRL', locality: '100 MUN. CHISINAU', callType: 'Industriale' },
  ]);

  const handleSearch = (searchTerm) => {
    // Add search logic here to filter documents dynamically
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  {/* Statistica 1 (Line Chart) */}
  <div className="bg-white shadow-md rounded-lg p-6 min-h-[300px]">
    <LineChart />
  </div>

  {/* Statistica 2 (Bar Chart) */}
  <div className="bg-white shadow-md rounded-lg p-6 min-h-[300px]">
    <BarChart />
  </div>

  {/* Document Table (full-width on all devices) */}
  <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded-lg p-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <input
        type="text"
        placeholder="Căutare ..."
        className="border rounded-full px-4 py-2 text-gray-600 w-full md:w-64 mb-4 md:mb-0"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="flex space-x-4">
        <button className="text-gray-600">
          Tip <span className="material-icons">expand_more</span>
        </button>
        <button className="text-gray-600">
          Statut <span className="material-icons">expand_more</span>
        </button>
        <button className="text-gray-600">
          Creat <span className="material-icons">expand_more</span>
        </button>
      </div>
    </div>
    <DocumentTable documents={documents} />
  </div>
</div>

    </div>
  );
};

export default DocumentPage;
