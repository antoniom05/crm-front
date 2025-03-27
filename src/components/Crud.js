import React, { useState } from 'react';

const NewElementForm = () => {
  const initialFormData = {
    elementType: '',
    name: '',
    institution_id: '',
    idno: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const { elementType, name, institution_id, idno } = formData;
    const newErrors = [];

    if (!elementType) newErrors.push('Vă rugăm să selectați tipul de element.');
    if (!name) newErrors.push('Vă rugăm să introduceți numele.');
    if (elementType === 'Domain' && !institution_id)
      newErrors.push('Vă rugăm să introduceți Institution ID pentru Domeniu.');
    if (elementType === 'Business' && !idno)
      newErrors.push('Vă rugăm să introduceți IDNO pentru Business.');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setLoading(true);
    setErrors([]);
    setSuccess(false);
  
    const token = localStorage.getItem('token');
  
    let url = '';
    let body = {};
  
    // Additional check for institution_id validity (only for Domain)
    if (formData.elementType === 'Domain' && !isValidInstitutionId(formData.institution_id)) {
      setErrors(['ID-ul instituției nu este valid.']);
      setLoading(false);
      return;
    }
  
    switch (formData.elementType) {
      case 'Product':
        url = 'https://crm.xcore.md/api/products';
        body = { name: formData.name };
        break;
      case 'Service':
        url = 'https://crm.xcore.md/api/services';
        body = { name: formData.name };
        break;
      case 'Domain':
        url = 'https://crm.xcore.md/api/domains';
        body = {
          name: formData.name,
          institution_id: parseInt(formData.institution_id, 10),
        };
        break;
      case 'Business':
        url = 'https://crm.xcore.md/api/business';
        body = { name: formData.name, idno: formData.idno };
        break;
      default:
        setErrors(['Tip de element invalid.']);
        setLoading(false);
        return;
    }
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          // Handle specific validation errors from the backend
          const errorMessages = Object.values(errorData.errors).flat();
          setErrors(errorMessages);
        } else {
          setErrors([errorData.message || 'Eroare necunoscută.']);
        }
        setLoading(false);
        return;
      }
      
  
      const responseData = await response.json();
      console.log('Element creat:', responseData);
      setSuccess(true);
      // Reset form after successful submission
      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
      setErrors(['A apărut o eroare la trimiterea formularului.']);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to validate Institution ID
  const isValidInstitutionId = (institutionId) => {
    const institutionIdPattern = /^[0-9]+$/; // Only numbers allowed for Institution ID
    return institutionIdPattern.test(institutionId);
  };
  

  // Handle form cancellation
  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors([]);
    setSuccess(false);
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="p-2 max-w-4xl mx-auto">
      {/* Display success message */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Elementul a fost adăugat cu succes!
        </div>
      )}

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

      <div className="mb-6">
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="text-red-500"
            onClick={handleCancel}
          >
            Anulează
          </button>
          <div className='flex items-center justify-center'>
            <button className="mt-4 mr-10 flex justify-center items-center h-full pb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
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
      </div>

      {/* Form Section */}
      <div className="bg-sky-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Adaugă Element Nou</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Element Type */}
          <div>
            <label htmlFor="elementType" className="block mb-1">
              *Tip de Element
            </label>
            <select
              id="elementType"
              name="elementType"
              value={formData.elementType}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Selectează...</option>
              <option value="Product">Produs</option>
              <option value="Service">Serviciu</option>
              <option value="Domain">Domeniu</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1">
              *Nume
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Institution ID (for Domain) */}
          {formData.elementType === 'Domain' && (
            <div>
              <label htmlFor="institution_id" className="block mb-1">
                *Institution ID
              </label>
              <input
                id="institution_id"
                type="number"
                name="institution_id"
                value={formData.institution_id}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                required
              />
            </div>
          )}

          {/* IDNO (for Business) */}
          {formData.elementType === 'Business' && (
            <div>
              <label htmlFor="idno" className="block mb-1">
                *IDNO
              </label>
              <input
                id="idno"
                type="text"
                name="idno"
                value={formData.idno}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                required
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default NewElementForm;
