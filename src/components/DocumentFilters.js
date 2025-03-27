import React, { useState } from 'react';

const DocumentFilters = ({ onSearch, documentCount }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Căutare..."
          className="border rounded px-4 py-2 w-full md:w-64"
          value={searchTerm}
          onChange={handleSearch}
        />
        
        {/* Filter Dropdowns */}
        <div className="flex space-x-4">
          <select className="border rounded px-3 py-1 text-gray-600">
            <option>Tip</option>
          </select>
          <select className="border rounded px-3 py-1 text-gray-600">
            <option>Statut</option>
          </select>
          <select className="border rounded px-3 py-1 text-gray-600">
            <option>Creat</option>
          </select>
        </div>
        
        {/* Document Count */}
        <span className="text-gray-600">{documentCount} Documente</span>
      </div>
    </div>
  );
};

export default DocumentFilters;
