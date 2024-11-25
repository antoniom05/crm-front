import React, { useState, useEffect } from 'react';

// Helper function to fetch all pages of paginated API data
const fetchAllPages = async (url, headers) => {
  let allData = [];
  let currentPage = 1;
  let lastPage = 1;

  try {
    while (currentPage <= lastPage) {
      const response = await fetch(`${url}?page=${currentPage}`, { headers });
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url} (Page ${currentPage})`);
      }
      const data = await response.json();
      allData = [...allData, ...data.data];
      lastPage = data.last_page;
      currentPage += 1;
    }
    return allData;
  } catch (error) {
    throw error;
  }
};

const DocumentTable = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Lookup maps
  const [citiesMap, setCitiesMap] = useState({});
  const [domainsMap, setDomainsMap] = useState({});
  const [businessesMap, setBusinessesMap] = useState({});
  const [servicesMap, setServicesMap] = useState({});

  // Fetch documents and related entities from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrors([]);

      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setErrors(['Tokenul de autentificare nu a fost găsit. Vă rugăm să vă autentificați din nou.']);
        setLoading(false);
        return;
      }

      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      // Define API endpoints for related entities
      const endpoints = {
        documents: 'https://crm.xcore.md/api/documents',
        cities: 'https://crm.xcore.md/api/cities',
        domains: 'https://crm.xcore.md/api/domains',
        businesses: 'https://crm.xcore.md/api/business', // Ensure this is the correct endpoint
        services: 'https://crm.xcore.md/api/services',
      };

      try {
        // Fetch all related entities concurrently (excluding institutions)
        const [
          documentsData,
          citiesData,
          domainsData,
          businessesData,
          servicesData,
        ] = await Promise.all([
          fetchAllPages(endpoints.documents, headers),
          fetchAllPages(endpoints.cities, headers),
          fetchAllPages(endpoints.domains, headers),
          fetchAllPages(endpoints.businesses, headers),
          fetchAllPages(endpoints.services, headers),
        ]);

        // Create lookup maps
        const citiesLookup = {};
        citiesData.forEach((city) => {
          citiesLookup[city.id] = city.name; // Adjust 'name' if the field is different
        });
        setCitiesMap(citiesLookup);

        const domainsLookup = {};
        domainsData.forEach((domain) => {
          domainsLookup[domain.id] = domain.name; // Adjust 'name' if the field is different
        });
        setDomainsMap(domainsLookup);

        const businessesLookup = {};
        businessesData.forEach((business) => {
          businessesLookup[business.id] = business.name; // Adjust 'name' if the field is different
        });
        setBusinessesMap(businessesLookup);

        const servicesLookup = {};
        servicesData.forEach((service) => {
          servicesLookup[service.id] = service.name; // Adjust 'name' if the field is different
        });
        setServicesMap(servicesLookup);

        // Map documents to include names instead of IDs (except institution_id)
        const mappedDocuments = documentsData.map((doc) => ({
          nr: doc.id,
          statut: doc.status,
          nrDeIesire: doc.institution_id, // Display institution_id directly
          continutConsultatie: domainsLookup[doc.domain_id] || `ID: ${doc.domain_id}`,
          dataApel: doc.created_at ? doc.created_at.split('T')[0] : 'N/A', // Extract date from timestamp
          localitate: citiesLookup[doc.city_id] || `ID: ${doc.city_id}`,
          persFizica: doc.business_id === null,
          persJuridica: doc.business_id !== null,
          agentEconomic: doc.business_id ? businessesLookup[doc.business_id] || `ID: ${doc.business_id}` : 'N/A',
          categorieInformatie: servicesLookup[doc.service_id] || `ID: ${doc.service_id}`,
          detalii: doc.details,
        }));

        setDocuments(mappedDocuments);
        setFilteredDocuments(mappedDocuments);
        setLastPage(documentsData.length > 0 ? Math.ceil(documentsData.length / 10) : 1); // Adjust based on API pagination
      } catch (error) {
        console.error(error);
        setErrors([error.message || 'Eroare la încărcarea datelor. Vă rugăm să încercați din nou.']);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Handle filtering based on status
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (status) {
      const filtered = documents.filter((doc) => doc.statut === status);
      setFilteredDocuments(filtered);
      setSelectedDocuments([]);
      setSelectAll(false);
    } else {
      setFilteredDocuments(documents);
      setSelectedDocuments([]);
      setSelectAll(false);
    }
  };

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

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {/* Display error messages */}
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <ul className="list-disc pl-5">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Filtering and search section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg">
        <div className="mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Căutare ..."
            className="border p-2 rounded w-full md:w-64"
            // Implement search functionality as needed
          />
        </div>
        <div className="flex space-x-4 mb-2 md:mb-0">
          <div className="relative group">
            <button className="border px-4 py-2 rounded-lg">Tip</button>
            {/* Implement Tip dropdown as needed */}
          </div>
          <div className="relative group">
            <button className="border px-4 py-2 rounded-lg">Statut</button>
            {/* Hover dropdown for "Statut" */}
            <div className="absolute hidden group-hover:block bg-white border mt-2 p-2 rounded-lg shadow-lg w-40 z-10">
              <ul className="space-y-2">
                <li
                  className="cursor-pointer rounded-full bg-green-100 text-green-600 py-1 text-center hover:bg-green-200"
                  onClick={() => handleStatusFilter('Închisă')}
                >
                  Închisă
                </li>
                <li
                  className="cursor-pointer rounded-full bg-red-100 text-red-600 py-1 text-center hover:bg-red-200"
                  onClick={() => handleStatusFilter('Deschisă')}
                >
                  Deschisă
                </li>
                <li
                  className="cursor-pointer rounded-full bg-blue-100 text-blue-600 py-1 text-center hover:bg-blue-200"
                  onClick={() => handleStatusFilter('În Lucru')}
                >
                  În Lucru
                </li>
                <li
                  className="cursor-pointer rounded-full bg-gray-100 text-gray-600 py-1 text-center hover:bg-gray-200"
                  onClick={() => handleStatusFilter('')}
                >
                  Toate
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button className="border px-4 py-2 rounded-lg">Creat</button>
            {/* Implement Creat dropdown as needed */}
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
              <th className="py-2 px-4 border-b text-left cursor-pointer">
                Nr.
                {/* Implement sorting if needed */}
              </th>

              {/* Hover functionality for "Statut" */}
              <th className="py-2 px-4 border-b text-left relative group">
                Statut
                {/* Hover dropdown for "Statut" */}
                <div className="absolute hidden group-hover:block bg-white border mt-2 p-2 rounded-lg shadow-lg w-32 z-10">
                  <ul className="space-y-2">
                    <li
                      className="cursor-pointer rounded-full bg-green-100 text-green-600 py-1 text-center hover:bg-green-200"
                      onClick={() => handleStatusFilter('Închisă')}
                    >
                      Închisă
                    </li>
                    <li
                      className="cursor-pointer rounded-full bg-red-100 text-red-600 py-1 text-center hover:bg-red-200"
                      onClick={() => handleStatusFilter('Deschisă')}
                    >
                      Deschisă
                    </li>
                    <li
                      className="cursor-pointer rounded-full bg-blue-100 text-blue-600 py-1 text-center hover:bg-blue-200"
                      onClick={() => handleStatusFilter('În Lucru')}
                    >
                      În Lucru
                    </li>
                    <li
                      className="cursor-pointer rounded-full bg-gray-100 text-gray-600 py-1 text-center hover:bg-gray-200"
                      onClick={() => handleStatusFilter('')}
                    >
                      Toate
                    </li>
                  </ul>
                </div>
              </th>

              <th className="py-2 px-4 border-b text-left">Nr. de ieșire</th>
              <th className="py-2 px-4 border-b text-left">Domeniul Consultație</th>
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
            {loading ? (
              <tr>
                <td colSpan="12" className="py-4 text-center">
                  Încarcă...
                </td>
              </tr>
            ) : filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <tr key={doc.nr} className="hover:bg-gray-50">
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
              ))
            ) : (
              <tr>
                <td colSpan="12" className="py-4 text-center">
                  Nu există documente de afișat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Anterior
        </button>
        <span>
          Pagina {currentPage} din {lastPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className={`px-4 py-2 rounded-lg ${
            currentPage === lastPage
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Următoarea
        </button>
      </div>
    </div>
  );
};

export default DocumentTable;
