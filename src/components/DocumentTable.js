import React from 'react';

const DocumentTable = ({ documents }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Nr.</th>
            <th className="py-2 px-4 border-b text-left">Statut</th>
            <th className="py-2 px-4 border-b text-left">Nr. de ordine</th>
            <th className="py-2 px-4 border-b text-left">Tip formă</th>
            <th className="py-2 px-4 border-b text-left">Dată Apel</th>
            <th className="py-2 px-4 border-b text-left">Agent Economic</th>
            <th className="py-2 px-4 border-b text-left">Persoana Fizică</th>
            <th className="py-2 px-4 border-b text-left">Pe cine se plânge</th>
            <th className="py-2 px-4 border-b text-left">Localitate</th>
            <th className="py-2 px-4 border-b text-left">Tip apel</th>
            <th className="py-2 px-4 border-b text-left">
              <span className="material-icons text-gray-500">settings</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{doc.nr}</td>
              <td className="py-3 px-4 border-b">
                <span
                  className={`py-1 px-3 rounded-full text-sm ${
                    doc.statut === 'Închisă'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {doc.statut}
                </span>
              </td>
              <td className="py-3 px-4 border-b">{doc.orderNr}</td>
              <td className="py-3 px-4 border-b">{doc.formType}</td>
              <td className="py-3 px-4 border-b">{doc.date}</td>
              <td className="py-3 px-4 border-b">{doc.agent}</td>
              <td className="py-3 px-4 border-b">{doc.person}</td>
              <td className="py-3 px-4 border-b">{doc.subject}</td>
              <td className="py-3 px-4 border-b">{doc.locality}</td>
              <td className="py-3 px-4 border-b">{doc.callType}</td>
              <td className="py-3 px-4 border-b text-gray-600">
                <span className="material-icons">list</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
