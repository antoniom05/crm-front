import React, { useState } from 'react';

const NewDocumentForm = ({ addDocument }) => {
  const [formData, setFormData] = useState({
    nrOrdine: '',
    tipForma: '',
    dataApel: '',
    tipApel: '',
    localitate: '',
    agentEconomic: '',
    persoanaFizica: '',
    reclamat: '',
    serviciuReclamat: '',
    subiectDetalii: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof addDocument === 'function') {
      addDocument(formData); // Pass form data to addDocument function
      // Reset form after submission
      setFormData({
        nrOrdine: '',
        tipForma: '',
        dataApel: '',
        tipApel: '',
        localitate: '',
        agentEconomic: '',
        persoanaFizica: '',
        reclamat: '',
        serviciuReclamat: '',
        subiectDetalii: '',
      });
    } else {
      console.error('addDocument is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between mt-4">
          <button className="text-red-500">Anulează</button>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Salvează
          </button>
        </div>
      </div>

      {/* 1. Date Apel Section */}
      <div className="bg-sky-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">1. Date Apel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">*Nr. de ieșire</label>
            <input
              type="text"
              name="nrOrdine"
              value={formData.nrOrdine}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">*Tip forma</label>
            <select
              name="tipForma"
              value={formData.tipForma}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              <option value="Apel">Apel</option>
              <option value="Consultatie">Consultatie</option>
            </select>
          </div>
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
          <div>
            <label className="block mb-1">*Tip apel / Consultație</label>
            <select
              name="tipApel"
              value={formData.tipApel}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              <option value="Industriale">Industriale</option>
              <option value="Consultatie">Consultatie</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">*Localitatea (CUATM)</label>
            <input
              type="text"
              name="localitate"
              value={formData.localitate}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
        </div>
      </div>

      {/* 2. Agent Economic Section */}
      <div className="bg-sky-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">2. Agent Economic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">*Agentul economic din INSPECT</label>
            <select
              name="agentEconomic"
              value={formData.agentEconomic}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              <option value="Company1">Company 1</option>
              <option value="Company2">Company 2</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Persoana fizică</label>
            <input
              type="text"
              name="persoanaFizica"
              value={formData.persoanaFizica}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1">Pe cine se plânge / Agent economic / Denumire / IDNO</label>
            <input
              type="text"
              name="reclamat"
              value={formData.reclamat}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
        </div>
      </div>

      {/* 3. Reclamație Section */}
      <div className="bg-sky-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">3. Reclamație</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">*Produsul reclamat</label>
            <input
              type="text"
              name="produsReclamat"
              value={formData.produsReclamat}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">*Serviciul reclamat</label>
            <input
              type="text"
              name="serviciuReclamat"
              value={formData.serviciuReclamat}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1">*Subiect / Detalii</label>
            <textarea
              name="subiectDetalii"
              value={formData.subiectDetalii}
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
