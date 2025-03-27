import React, { useState } from 'react';

const Table = () => {
  // Lista de activități (15 intrări)
  const data = [
    { titlu: 'Lorem ipsum dolor 1', dataScadentei: 'August 28, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 2', dataScadentei: 'August 29, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 3', dataScadentei: 'August 30, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 4', dataScadentei: 'August 31, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 5', dataScadentei: 'Sept 1, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 6', dataScadentei: 'Sept 2, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 7', dataScadentei: 'Sept 3, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 8', dataScadentei: 'Sept 4, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 9', dataScadentei: 'Sept 5, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 10', dataScadentei: 'Sept 6, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 11', dataScadentei: 'Sept 7, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 12', dataScadentei: 'Sept 8, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 13', dataScadentei: 'Sept 9, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 14', dataScadentei: 'Sept 10, 2024, 18:00', tipActivitate: 'Deadline' },
    { titlu: 'Lorem ipsum dolor 15', dataScadentei: 'Sept 11, 2024, 18:00', tipActivitate: 'Deadline' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Calculează datele pentru pagina curentă
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculează numărul total de pagini
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Funcție pentru a schimba pagina
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-6">
      {/* Header de tabel */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Arată</span>
          <select className="border rounded px-3 py-1 text-gray-600">
            <option value="15">15</option>
            <option value="7">7</option>
          </select>
          <span className="text-gray-600">intrări</span>
        </div>
        <div className="relative w-full md:w-auto mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Căutare ..."
            className="border rounded-full px-4 py-2 text-gray-600 w-full md:w-64"
          />
        </div>
      </div>

      {/* Tabel - Add responsive behavior */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">Titlu</th>
              <th className="py-3 px-4 border-b">Data scadenței</th>
              <th className="py-3 px-4 border-b">Tip activitate</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">
                  <a href="#" className="text-blue-600 hover:underline">
                    {item.titlu}
                  </a>
                </td>
                <td className="py-3 px-4 border-b text-gray-600">{item.dataScadentei}</td>
                <td className="py-3 px-4 border-b">
                  <button className="bg-pink-100 text-pink-600 py-1 px-3 rounded-full flex items-center space-x-1">
                    <span className="material-icons text-pink-600">schedule</span>
                    <span>{item.tipActivitate}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginare */}
      <div className="flex justify-end space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 border rounded-full ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
