import React, { useState, useEffect } from 'react';

const EditDocumentModal = ({ isOpen, onClose, documentData, updateDocument }) => {
  const [formData, setFormData] = useState({
    nrDeIesire: '',
    continutConsultatie: '',
    dataApel: '',
    localitate: '',
    persFizica: false,
    persJuridica: false,
    agentEconomic: '',
    categorieProdus: '',
    categorieServiciu: '',
    detalii: '',
  });

  // Reference data state variables
  const [cities, setCities] = useState([]);
  const [domains, setDomains] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  // State for form submission
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  // Helper function to fetch all pages of paginated API data
  const fetchAllPages = async (url, headers) => {
    let allData = [];
    let currentPage = 1;
    let lastPage = 1;

    try {
      while (currentPage <= lastPage) {
        const response = await fetch(`${url}?page=${currentPage}`, { headers });
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
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

  // Fetch reference data
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Define the endpoints for reference data
        const endpoints = {
          cities: 'https://crm.xcore.md/api/cities',
          domains: 'https://crm.xcore.md/api/domains',
          businesses: 'https://crm.xcore.md/api/business',
          products: 'https://crm.xcore.md/api/products',
          services: 'https://crm.xcore.md/api/services',
        };

        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        };

        // Fetch all reference data concurrently
        const [
          citiesData,
          domainsData,
          businessesData,
          productsData,
          servicesData,
        ] = await Promise.all([
          fetchAllPages(endpoints.cities, headers),
          fetchAllPages(endpoints.domains, headers),
          fetchAllPages(endpoints.businesses, headers),
          fetchAllPages(endpoints.products, headers),
          fetchAllPages(endpoints.services, headers),
        ]);

        setCities(citiesData || []);
        setDomains(domainsData || []);
        setBusinesses(businessesData || []);
        setProducts(productsData || []);
        setServices(servicesData || []);
      } catch (err) {
        console.error(err);
        setErrors(['Eroare la încărcarea datelor. Vă rugăm să încercați din nou.']);
      }
    };

    fetchReferenceData();
  }, []);

  // Initialize form data with the document data
  useEffect(() => {
    if (documentData) {
      setFormData({
        nrDeIesire: documentData.nrDeIesire || '',
        continutConsultatie: documentData.domain_id || '',
        dataApel: documentData.dataApel || '',
        localitate: documentData.city_id || '',
        persFizica: documentData.persFizica || false,
        persJuridica: documentData.persJuridica || false,
        agentEconomic: documentData.business_id || '',
        categorieProdus: documentData.product_id || '',
        categorieServiciu: documentData.service_id || '',
        detalii: documentData.detalii || '',
      });
    }
  }, [documentData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' || type === 'radio' ? checked : value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const {
      nrDeIesire,
      continutConsultatie,
      dataApel,
      localitate,
      agentEconomic,
      categorieProdus,
      categorieServiciu,
      detalii,
    } = formData;

    const newErrors = [];

    if (!nrDeIesire) newErrors.push('Vă rugăm să completați Nr. de ieșire.');
    if (!continutConsultatie) newErrors.push('Vă rugăm să selectați Domeniul Consultație.');
    if (!dataApel) newErrors.push('Vă rugăm să selectați Data apelului.');
    if (!localitate) newErrors.push('Vă rugăm să selectați Localitatea (CUATM).');
    if (!formData.persFizica && !formData.persJuridica)
      newErrors.push('Vă rugăm să selectați tipul persoanei (Fizică sau Juridică).');
    if (formData.persJuridica && !agentEconomic)
      newErrors.push('Vă rugăm să selectați Agent Economic pentru Persoană Juridică.');
    if (!categorieProdus) newErrors.push('Vă rugăm să selectați Categorie Produs.');
    if (!categorieServiciu) newErrors.push('Vă rugăm să selectați Categorie Serviciu.');
    if (!detalii) newErrors.push('Vă rugăm să completați Detalii consultație.');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors([]);
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors([]);
    setSuccess(false);

    const token = localStorage.getItem('token');

    // Map formData to API fields
    const mappedData = {
      call_id: parseInt(formData.nrDeIesire, 10),
      domain_id: parseInt(formData.continutConsultatie, 10),
      city_id: parseInt(formData.localitate, 10),
      business_id: formData.persJuridica ? parseInt(formData.agentEconomic, 10) : null,
      product_id: parseInt(formData.categorieProdus, 10),
      service_id: parseInt(formData.categorieServiciu, 10),
      details: formData.detalii,
      status: 1,
      name: '',
    };

    try {
      const response = await fetch(`https://crm.xcore.md/api/documents/${documentData.nr}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mappedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setErrors(errorMessages);
        } else if (errorData.message) {
          setErrors([errorData.message]);
        } else {
          setErrors(['Eroare neașteptată la actualizarea documentului.']);
        }
        throw new Error('Eroare la actualizarea documentului.');
      }

      const updatedDocData = await response.json();

      // Map the updated document data to match the structure in DocumentTable
      const updatedDoc = {
        nr: updatedDocData.id,
        statut: updatedDocData.status,
        nrDeIesire: updatedDocData.institution_id,
        continutConsultatie:
          domains.find((d) => d.id === updatedDocData.domain_id)?.name ||
          `ID: ${updatedDocData.domain_id}`,
        dataApel: updatedDocData.created_at ? updatedDocData.created_at.split('T')[0] : 'N/A',
        localitate:
          cities.find((c) => c.id === updatedDocData.city_id)?.name ||
          `ID: ${updatedDocData.city_id}`,
        persFizica: updatedDocData.business_id === null,
        persJuridica: updatedDocData.business_id !== null,
        agentEconomic: updatedDocData.business_id
          ? businesses.find((b) => b.id === updatedDocData.business_id)?.name ||
            `ID: ${updatedDocData.business_id}`
          : 'N/A',
        categorieInformatie:
          services.find((s) => s.id === updatedDocData.service_id)?.name ||
          `ID: ${updatedDocData.service_id}`,
        detalii: updatedDocData.details,
        domain_id: updatedDocData.domain_id,
        city_id: updatedDocData.city_id,
        business_id: updatedDocData.business_id,
        service_id: updatedDocData.service_id,
        product_id: updatedDocData.product_id,
      };

      setSuccess(true);
      updateDocument(updatedDoc);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete document
  const handleDelete = async () => {
    if (!window.confirm('Sigur doriți să ștergeți acest document?')) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://crm.xcore.md/api/documents/${documentData.nr}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors([errorData.message || 'Eroare la ștergerea documentului.']);
        return;
      }

      // Update parent component
      updateDocument(null, documentData.nr);
      onClose();
    } catch (error) {
      setErrors([error.message || 'Eroare la ștergerea documentului.']);
    } finally {
      setLoading(false);
    }
  };

  // Render select options helper function
  const renderSelectOptions = (dataArray) =>
    dataArray.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-full overflow-y-auto">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">Editare Document</h2>

          {/* Display success or error messages */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              Documentul a fost actualizat cu succes!
            </div>
          )}
          {errors.length > 0 && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              <ul className="list-disc pl-5">
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Scrollable content */}
            <div className="max-h-[70vh] overflow-y-auto">
              {/* Form fields */}
              {/* 1. Date Apel Section */}
              <div className="bg-sky-100 p-6 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">1. Date Apel</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nr. de iesire */}
                  <div>
                    <label htmlFor="nrDeIesire" className="block mb-1">
                      *Nr. de ieșire
                    </label>
                    <input
                      id="nrDeIesire"
                      type="text"
                      name="nrDeIesire"
                      value={formData.nrDeIesire}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>

                  {/* Domeniul Consultatie - select */}
                  <div>
                    <label htmlFor="continutConsultatie" className="block mb-1">
                      *Domeniul Consultație
                    </label>
                    <select
                      id="continutConsultatie"
                      name="continutConsultatie"
                      value={formData.continutConsultatie}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    >
                      <option value="">Select...</option>
                      {domains.length > 0 ? (
                        renderSelectOptions(domains)
                      ) : (
                        <option disabled>Se încarcă...</option>
                      )}
                    </select>
                  </div>

                  {/* Data apelului */}
                  <div>
                    <label htmlFor="dataApel" className="block mb-1">
                      *Data apelului
                    </label>
                    <input
                      id="dataApel"
                      type="date"
                      name="dataApel"
                      value={formData.dataApel}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    />
                  </div>

                  {/* Localitatea (CUATM) */}
                  <div>
                    <label htmlFor="localitate" className="block mb-1">
                      *Localitatea (CUATM)
                    </label>
                    <select
                      id="localitate"
                      name="localitate"
                      value={formData.localitate}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    >
                      <option value="">Select...</option>
                      {cities.length > 0 ? (
                        renderSelectOptions(cities)
                      ) : (
                        <option disabled>Se încarcă...</option>
                      )}
                    </select>
                  </div>

                  {/* Radio buttons */}
                  <div className="col-span-1">
                    <div className="flex items-center justify-between border border-gray-300 rounded-[10px] p-2 hover:bg-blue-500 hover:text-white cursor-pointer">
                      <label
                        htmlFor="persFizica"
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <span className="select-none">Persoană Fizică</span>
                        <input
                          id="persFizica"
                          type="radio"
                          name="personType"
                          value="persFizica"
                          checked={formData.persFizica}
                          onChange={() => {
                            setFormData((prevData) => ({
                              ...prevData,
                              persFizica: true,
                              persJuridica: false,
                              agentEconomic: '',
                            }));
                          }}
                          className="cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex items-center justify-between border border-gray-300 rounded-[10px] p-2 hover:bg-blue-500 hover:text-white cursor-pointer">
                      <label
                        htmlFor="persJuridica"
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <span className="select-none">Persoană Juridică</span>
                        <input
                          id="persJuridica"
                          type="radio"
                          name="personType"
                          value="persJuridica"
                          checked={formData.persJuridica}
                          onChange={() => {
                            setFormData((prevData) => ({
                              ...prevData,
                              persFizica: false,
                              persJuridica: true,
                            }));
                          }}
                          className="cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Agent Economic Section */}
              {formData.persJuridica && (
                <div className="bg-sky-100 p-6 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold mb-4">2. Agent Economic</h2>
                  <div>
                    <label htmlFor="agentEconomic" className="block mb-1">
                      *Agent economic Denumire / IDNO
                    </label>
                    <select
                      id="agentEconomic"
                      name="agentEconomic"
                      value={formData.agentEconomic}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    >
                      <option value="">Select...</option>
                      {businesses.length > 0 ? (
                        renderSelectOptions(businesses)
                      ) : (
                        <option disabled>Se încarcă...</option>
                      )}
                    </select>
                  </div>
                </div>
              )}

              {/* 3. Detalii Apel Section */}
              <div className="bg-sky-100 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">3. Conținut Apel</h2>
                <div className="grid grid-cols-1 gap-4">
                  {/* Categorie Produs */}
                  <div>
                    <label htmlFor="categorieProdus" className="block mb-1">
                      A. Produs
                    </label>
                    <select
                      id="categorieProdus"
                      name="categorieProdus"
                      value={formData.categorieProdus}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    >
                      <option value="">Select...</option>
                      {products.length > 0 ? (
                        renderSelectOptions(products)
                      ) : (
                        <option disabled>Se încarcă...</option>
                      )}
                    </select>
                  </div>

                  {/* Categorie Serviciu */}
                  <div>
                    <label htmlFor="categorieServiciu" className="block mb-1">
                      B. Serviciu
                    </label>
                    <select
                      id="categorieServiciu"
                      name="categorieServiciu"
                      value={formData.categorieServiciu}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    >
                      <option value="">Select...</option>
                      {services.length > 0 ? (
                        renderSelectOptions(services)
                      ) : (
                        <option disabled>Se încarcă...</option>
                      )}
                    </select>
                  </div>

                  {/* Detalii */}
                  <div>
                    <label htmlFor="detalii" className="block mb-1">
                      *Detalii consultație
                    </label>
                    <textarea
                      id="detalii"
                      name="detalii"
                      value={formData.detalii}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                      placeholder="Introduceți detalii suplimentare..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="text-red-500"
                onClick={handleDelete}
                disabled={loading}
              >
                Șterge
              </button>
              <div>
                <button
                  type="button"
                  className="text-gray-500 mr-4"
                  onClick={onClose}
                  disabled={loading}
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  className={`bg-blue-500 text-white py-2 px-4 rounded ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Salvând...' : 'Salvează'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditDocumentModal;