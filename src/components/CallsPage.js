import React, { useState, useEffect } from 'react';

// Utility function to format date to Romanian language
const formatDateToRomanian = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('ro-RO', options);
};

const CallsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [callsData, setCallsData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from API
  useEffect(() => {
    const fetchCalls = async () => {
      const url = 'https://crm.xcore.md/api/calls/all';
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        // Transform API data to match table structure
        const transformedData = jsonData.data.map((item) => ({
          id: item.id,
          statut: item.type === 'out' ? 'Apel ratat' : 'Apel primit',
          statutColor: item.type === 'out' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
          dateApel: formatDateToRomanian(item.start),
          notite: '', // Assuming 'notite' comes from another field; adjust accordingly
          creatDe: item.user.name,
          contact: item.institution.name || '-', // Fallback to '-' if no institution name
        }));
        setCallsData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  // Filter the data based on the search term
  const filteredData = callsData.filter(
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
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  if (loading) {
    return <div className="p-4 md:p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 md:p-6 text-red-600">Error: {error}</div>;
  }

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                  checked={selectAll}
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
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-600">
                  Nu există apeluri care să corespundă criteriilor de căutare.
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 h-14 md:h-16 text-sm md:text-base ${
                    selectedRows.includes(index) ? 'bg-blue-100' : ''
                  }`}
                >
                  <td className="py-2 md:py-3 px-2 md:px-4 border-b">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelection(index)}
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
                      {row.notite || 'Nicio notiță'}
                    </a>
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 border-b text-gray-600">{row.creatDe}</td>
                  <td className="py-2 md:py-3 px-2 md:px-4 border-b text-blue-600 hover:underline">
                    {row.contact}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 border-b text-gray-600">
                    <span className="material-icons">list</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Responsive Cards for Mobile */}
        <div className="md:hidden">
          {filteredData.length === 0 ? (
            <div className="py-4 text-center text-gray-600">
              Nu există apeluri care să corespundă criteriilor de căutare.
            </div>
          ) : (
            filteredData.map((row, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-lg mb-4 p-4 ${
                  selectedRows.includes(index) ? 'bg-blue-100' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`py-1 px-3 rounded-full text-sm ${row.statutColor}`}>
                    {row.statut}
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleRowSelection(index)}
                  />
                </div>
                <div className="text-gray-600 text-sm mb-1">
                  <strong>Data Apel: </strong>
                  {row.dateApel}
                </div>
                <div className="text-gray-600 text-sm mb-1">
                  <strong>Creat de: </strong>
                  {row.creatDe}
                </div>
                {row.contact !== '-' && (
                  <div className="text-blue-600 hover:underline text-sm mb-1">
                    <strong>Contact: </strong>
                    {row.contact}
                  </div>
                )}
                <div className="text-gray-600 text-sm">
                  <a href="#" className="text-blue-600 hover:underline">
                    {row.notite || 'Nicio notiță'}
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CallsPage;
