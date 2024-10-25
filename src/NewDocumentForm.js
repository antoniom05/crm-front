import React, { useState } from 'react';

const NewDocumentForm = ({ addDocument }) => {
  const [formData, setFormData] = useState({
    nrDeIesire: '',
    continutConsultatie: '',
    dataApel: '',
    localitate: '',
    persFizica: false,
    persJuridica: false,
    agentEconomic: '',
    categorieInformatie: '',
    detalii: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof addDocument === 'function') {
      addDocument(formData); // Pass form data to addDocument function
      // Reset form after submission
      setFormData({
        nrDeIesire: '',
        continutConsultatie: '',
        dataApel: '',
        localitate: '',
        persFizica: false,
        persJuridica: false,
        agentEconomic: '',
        categorieInformatie: '',
        detalii: '',
      });
    } else {
      console.error('addDocument is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between mt-4">
          <button type="button" className="text-red-500">Anulează</button>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Salvează
          </button>
        </div>
      </div>

      {/* 1. Date Apel Section */}
      <div className="bg-sky-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">1. Date Apel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nr. de iesire */}
          <div>
            <label className="block mb-1">*Nr. de ieșire</label>
            <input
              type="text"
              name="nrDeIesire"
              value={formData.nrDeIesire}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Continut Consultatie - select */}
          <div>
            <label className="block mb-1">*Conținut Consultație</label>
            <select
              name="continutConsultatie"
              value={formData.continutConsultatie}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              <option value="Consultatie1">Consultatie 1</option>
              <option value="Consultatie2">Consultatie 2</option>
            </select>
          </div>

          {/* Data apelului */}
          <div>
            <label className="block mb-1">*Data apelului</label>
            <input
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
            <label className="block mb-1">*Localitatea (CUATM)</label>
            <select
              name="localitate"
              value={formData.localitate}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              <option value="Localitatea1">Localitatea 1</option>
              <option value="Localitatea2">Localitatea 2</option>
            </select>
          </div>

          {/* Checkboxes */}
          <div className="col-span-1">
            <div className="flex items-center justify-between border border-gray-300 rounded-[10px] p-2 hover:bg-blue-500 hover:text-white">
              <label>Pers. Fizică</label>
              <input
                type="checkbox"
                name="persFizica"
                checked={formData.persFizica}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-between border border-gray-300 rounded-[10px] p-2 hover:bg-blue-500 hover:text-white">
              <label>Pers. Juridică</label>
              <input
                type="checkbox"
                name="persJuridica"
                checked={formData.persJuridica}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Consultație Section */}
      <div className="bg-sky-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">2. Consultație</h2>
        <div>
          <label className="block mb-1">*Agent economic / Denumire / IDNO</label>
          <select
            name="agentEconomic"
            value={formData.agentEconomic}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select...</option>
            <option value="Agent1">Agent 1</option>
            <option value="Agent2">Agent 2</option>
          </select>
        </div>
      </div>

      {/* 3. Detalii Apel Section */}
      <div className="bg-sky-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">3. Detalii Apel</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Categorie Informatie */}
          <div>
            <label className="block mb-1">*Categorie Informație</label>
            <select
              name="categorieInformatie"
              value={formData.categorieInformatie}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              <option value="Categorie1">Categorie 1</option>
              <option value="Categorie2">Categorie 2</option>
            </select>
          </div>

          {/* Detalii */}
          <div>
            <label className="block mb-1">*Detalii</label>
            <textarea
              name="detalii"
              value={formData.detalii}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewDocumentForm;
