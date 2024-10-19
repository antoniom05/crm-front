import React, { useState } from 'react';

const CallsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [selectAll, setSelectAll] = useState(false); // Track if all rows are selected

  const data = [
    {
      statut: 'Apel ratat',
      statutColor: 'bg-red-100 text-red-600',
      dateApel: 'August 28, 2024 18:00',
      notite: 'Lorem ipsum dolor sit amet consectetur. Malesuada imperdiet ut sapien in a eu diam massa. Sit viverra ullamcorper massa hendrerit.',
      creatDe: 'Op. John Doe',
      contact: '-',
    },
    {
      statut: 'Apel primit',
      statutColor: 'bg-green-100 text-green-600',
      dateApel: 'August 28, 2024 18:00',
      notite: 'Lorem ipsum dolor sit amet consectetur. Malesuada imperdiet ut sapien in a eu diam massa. Sit viverra ullamcorper massa hendrerit.',
      creatDe: 'Op. John Doe',
      contact: 'Elena Dumitrescu',
    },
    {
      statut: 'Număr greșit',
      statutColor: 'bg-gray-100 text-gray-600',
      dateApel: 'August 28, 2024 18:00',
      notite: 'Lorem ipsum dolor sit amet consectetur. Malesuada imperdiet ut sapien in a eu diam massa. Sit viverra ullamcorper massa hendrerit.',
      creatDe: 'Op. John Doe',
      contact: '-',
    },
    {
      statut: 'Număr greșit',
      statutColor: 'bg-gray-100 text-gray-600',
      dateApel: 'August 28, 2024 18:00',
      notite: 'Lorem ipsum dolor sit amet consectetur. Malesuada imperdiet ut sapien in a eu diam massa. Sit viverra ullamcorper massa hendrerit.',
      creatDe: 'Op. John Doe',
      contact: '-',
    },
  ];

  // Filter the data based on the search term
  const filteredData = data.filter(
    (row) =>
      row.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.notite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.creatDe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle selecting/deselecting a single row
  const handleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  // Handle selecting/deselecting all rows
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all rows
    } else {
      setSelectedRows(filteredData.map((_, index) => index)); // Select all visible rows
    }
    setSelectAll(!selectAll); // Toggle the select all state
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">Toate apelurile</h1>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Căutare ..."
            className="border rounded-full px-4 py-2 text-gray-600 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Handle search input
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-left text-sm md:text-base">
              <th className="py-2 md:py-3 px-2 md:px-4 border-b">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectAll} // Master checkbox
                />
              </th>
              <th className="py-2 md:py-3 px-2 md:px-4 border-b">Statut</th>
              <th className="py-2 md:py-3 px-2 md:px-4 border-b">Date Apel</th>
              <th className="py-2 md:py-3 px-2 md:px-4 border-b max-w-xs">Notițe</th>
              <th className="py-2 md:py-3 px-2 md:px-4 border-b">Creat de</th>
              <th className="py-2 md:py-3 px-2 md:px-4 border-b">Contacte</th>
              <th className="py-2 md:py-3 px-2 md:px-4 border-b">
                <span className="material-icons text-gray-500">settings</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 h-14 md:h-16 text-sm md:text-base ${
                  selectedRows.includes(index) ? 'bg-blue-100' : ''
                }`} // Highlight selected rows
              >
                <td className="py-2 md:py-3 px-2 md:px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowSelection(index)} // Select individual rows
                  />
                </td>
                <td className="py-2 md:py-3 px-2 md:px-4 border-b whitespace-nowrap">
                  <span className={`py-1 px-3 rounded-full text-sm ${row.statutColor}`}>
                    {row.statut}
                  </span>
                </td>
                <td className="py-2 md:py-3 px-2 md:px-4 border-b text-gray-600">{row.dateApel}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 border-b text-gray-600 max-w-xs truncate">
                  <a href="#" className="text-blue-600 hover:underline">
                    {row.notite}
                  </a>
                </td>
                <td className="py-2 md:py-3 px-2 md:px-4 border-b text-gray-600">{row.creatDe}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 border-b text-blue-600 hover:underline">{row.contact}</td>
                <td className="py-2 md:py-3 px-2 md:px-4 border-b text-gray-600">
                  <span className="material-icons">list</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Responsive Cards for Mobile */}
        <div className="md:hidden">
          {filteredData.map((row, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-200 rounded-lg mb-4 p-4 ${
                selectedRows.includes(index) ? 'bg-blue-100' : ''
              }`} // Highlight selected rows
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`py-1 px-3 rounded-full text-sm ${row.statutColor}`}>
                  {row.statut}
                </span>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleRowSelection(index)} // Select individual rows
                />
              </div>
              <div className="text-gray-600 text-sm mb-1">
                <strong>Data Apel: </strong>{row.dateApel}
              </div>
              <div className="text-gray-600 text-sm mb-1">
                <strong>Creat de: </strong>{row.creatDe}
              </div>
              {row.contact !== '-' && (
                <div className="text-blue-600 hover:underline text-sm mb-1">
                  <strong>Contact: </strong>{row.contact}
                </div>
              )}
              <div className="text-gray-600 text-sm">
                <a href="#" className="text-blue-600 hover:underline">
                  {row.notite}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallsPage;
