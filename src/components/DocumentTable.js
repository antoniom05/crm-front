import React, { useState } from 'react';

const DocumentTable = ({ documents = [] }) => {
  // Add some dummy data to the documents array if it's empty
  const sampleDocuments = documents.length === 0 ? [
    {
      nr: 1,
      statut: 'Deschisă',
      nrDeIesire: 'A001',
      continutConsultatie: 'Consultatie1',
      dataApel: '2023-09-12',
      localitate: 'Localitatea1',
      persFizica: true,
      persJuridica: false,
      agentEconomic: 'Agent1',
      categorieInformatie: 'Categorie1',
      detalii: 'Detalii exemplu',
    },
    {
      nr: 2,
      statut: 'Închisă',
      nrDeIesire: 'A002',
      continutConsultatie: 'Consultatie2',
      dataApel: '2023-09-15',
      localitate: 'Localitatea2',
      persFizica: false,
      persJuridica: true,
      agentEconomic: 'Agent2',
      categorieInformatie: 'Categorie2',
      detalii: 'Alte detalii',
    },
  ] : documents;

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  // Handle filtering based on status
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  // Filtered documents based on selected status
  const filteredDocuments = selectedStatus
    ? sampleDocuments.filter((doc) => doc.statut === selectedStatus)
    : sampleDocuments;

  // Handle select/deselect all
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.nr)); // Select all
    } else {
      setSelectedDocuments([]); // Deselect all
    }
  };

  // Handle selecting an individual document
  const handleSelectDocument = (nr) => {
    if (selectedDocuments.includes(nr)) {
      setSelectedDocuments(selectedDocuments.filter((docNr) => docNr !== nr));
    } else {
      setSelectedDocuments([...selectedDocuments, nr]);
    }
  };

  return (
    <div className="p-4">
      {/* Filtering and search section */}
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg">
        <div>
          <input
            type="text"
            placeholder="Căutare ..."
            className="border p-2 rounded"
          />
        </div>
        <div className="flex space-x-4">
          <div className="relative group">
            <button className="border px-4 py-2 rounded-lg">Tip</button>
          </div>
          <div>
            <button className="border px-4 py-2 rounded-lg">Statut</button>
          </div>
          <div>
            <button className="border px-4 py-2 rounded-lg">Creat</button>
          </div>
        </div>
        <div>{filteredDocuments.length} Documente</div> {/* Dynamic document count */}
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-2 px-4 border-b text-left">Nr.</th>

              {/* Added back hover functionality for "Statut" */}
              <th className="py-2 px-4 border-b text-left relative group">
                Statut
                {/* Hover dropdown for "Statut" */}
                <div className="absolute hidden group-hover:block bg-white border mt-2 p-2 rounded-lg shadow-lg w-32">
                  <ul className="ul-onhover space-y-2">
                    <li
                      className="cursor-pointer rounded-full bg-green-100 text-green-600 py-1 text-center"
                      onClick={() => handleStatusFilter('Închisă')}
                    >
                      Închisă
                    </li>
                    <li
                      className="cursor-pointer rounded-full bg-red-100 text-red-600 py-1 text-center"
                      onClick={() => handleStatusFilter('Deschisă')}
                    >
                      Deschisă
                    </li>
                    <li
                      className="cursor-pointer rounded-full bg-blue-100 text-blue-600 py-1 text-center"
                      onClick={() => handleStatusFilter('În Lucru')}
                    >
                      În Lucru
                    </li>
                    <li
                      className="cursor-pointer rounded-full bg-gray-100 text-gray-600 py-1 text-center"
                      onClick={() => handleStatusFilter('')}
                    >
                      Toate
                    </li>
                  </ul>
                </div>
              </th>

              <th className="py-2 px-4 border-b text-left">Nr. de ieșire</th>
              <th className="py-2 px-4 border-b text-left">Conținut Consultație</th>
              <th className="py-2 px-4 border-b text-left">Data apelului</th>
              <th className="py-2 px-4 border-b text-left">Localitatea (CUATM)</th>
              <th className="py-2 px-4 border-b text-left">Pers. Fizică</th>
              <th className="py-2 px-4 border-b text-left">Pers. Juridică</th>
              <th className="py-2 px-4 border-b text-left">Agent economic / Denumire / IDNO</th>
              <th className="py-2 px-4 border-b text-left">Categorie Informație</th>
              <th className="py-2 px-4 border-b text-left">Detalii</th>
              <th className="py-2 px-4 border-b text-left">
                <span className="material-icons text-gray-500">settings</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedDocuments.includes(doc.nr)}
                    onChange={() => handleSelectDocument(doc.nr)}
                  />
                </td>
                <td className="py-3 px-4 border-b">{doc.nr}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      doc.statut === 'Închisă'
                        ? 'bg-green-100 text-green-600'
                        : doc.statut === 'Deschisă'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {doc.statut}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">{doc.nrDeIesire}</td>
                <td className="py-3 px-4 border-b">{doc.continutConsultatie}</td>
                <td className="py-3 px-4 border-b">{doc.dataApel}</td>
                <td className="py-3 px-4 border-b">{doc.localitate}</td>
                <td className="py-3 px-4 border-b">{doc.persFizica ? 'Da' : 'Nu'}</td>
                <td className="py-3 px-4 border-b">{doc.persJuridica ? 'Da' : 'Nu'}</td>
                <td className="py-3 px-4 border-b">{doc.agentEconomic}</td>
                <td className="py-3 px-4 border-b">{doc.categorieInformatie}</td>
                <td className="py-3 px-4 border-b">{doc.detalii}</td>
                <td className="py-3 px-4 border-b text-gray-600">
                  <span className="material-icons">list</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
