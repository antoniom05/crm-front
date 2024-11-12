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
    categorieProdus: '',
    categorieServiciu: '',
    detalii: '',
  });

  // Lista localităților din Moldova
  const localitati = [
    'Chișinău',
    'Bălți',
    'Cahul',
    'Orhei',
    'Ungheni',
    'Soroca',
    'Comrat',
    'Căușeni',
    'Edineț',
    'Hîncești',
    'Strășeni',
    'Călărași',
  ];

  // Lista domeniilor de consultație
  const domeniiConsultatie = [
    'Inspectoratul de Stat pentru Supravegherea Produselor Nealimentare și Protecția Consumatorilor',
    'Industriale',
    'Alimentare',
    'Persoane Juridice',
    'Servicii',
    'Metrologie',
    'Reguli de Comerț',
  ];

  // Lista produselor
  const produse = [
    'Aparate Electrocasnice (conectate la priză)',
    'Telefon Mobil (accesorii)',
    'Produse Digitale (calculator + accesorii)',
    'Dispozitive medicale',
    'Automobile + Piese Auto',
    'Mijloace de transport (tractor, trotinetă electrică, giro board)',
    'Produse Petroliere',
    'Articole de grădinărit (unelte manuale)',
    'Materiale de construcții (amestecuri uscate)',
    'Materiale Plastice',
    'Materiale Metalice',
    'Materiale Ceramice, Piatră',
    'Materiale din Sticlă',
    'Mobila + Accesorii',
    'Contoare (apă, gaz, lumină)',
    'Produse Chimice',
    'Produse Cosmetice',
    'Produse Alimentare',
    'Articole de bucătărie (veselă, tacâmuri)',
    'Mărfuri textile (lenjerie de pat, pernă, plapumă, saltea)',
    'Articole de Îmbrăcăminte + Accesorii (mănuși, căciulă, geantă, centură)',
    'Articole de Încălțăminte',
    'Echipament Individual de Protecție (cască, ham, centura de siguranță)',
    'Articole pentru Copii (leagăne, căruț)',
    'Jucării',
    'Bijuterii (metale prețioase)',
  ];

  // Lista serviciilor
  const servicii = [
    'Servicii Electrocasnice',
    'Servicii Turistice',
    'Servicii Taxi',
    'Servicii Transportare Pasageri și Mărfuri',
    'Servicii Auto (reparare, testare)',
    'Servicii Reparații Accesorii',
    'Servicii Reparații Produse Digitale (PC, tel. mob, ceas smartwatch)',
    'Servicii Informaționale (foto, xerox, tipografie)',
    'Servicii Reparații Încălțăminte',
    'Servicii Reparații Îmbrăcăminte',
    'Servicii Curățare Chimică',
    'Servicii Comerț On-line',
    'Servicii Cosmetice + Frizerie',
    'Servicii Culturale',
    'Servicii Jocuri de Noroc',
    'Servicii Instruiri (școli, grădinițe)',
    'Servicii de Agrement (parcuri, terenuri de distracții)',
    'Servicii Închiriere',
    'Servicii Funerare',
    'Servicii Preambalare Produse',
    'Servicii Fabricare Mobilă',
    'Servicii Reparații Mobilă',
    'Serviciul Metrologic',
    'Servicii Veterinare',
    'Servicii de Odihnă și Sport (sala de sport, saună)',
    'Servicii Pază',
    'Alte Servicii',
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof addDocument === 'function') {
      addDocument(formData);
      // Reset form after submission
      setFormData({
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
    } else {
      console.error('addDocument is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between mt-4">
          <button type="button" className="text-red-500">
            Anulează
          </button>
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

          {/* Domeniul Consultatie - select */}
          <div>
            <label className="block mb-1">*Domeniul Consultație</label>
            <select
              name="continutConsultatie"
              value={formData.continutConsultatie}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              {domeniiConsultatie.map((domeniu, index) => (
                <option key={index} value={domeniu}>
                  {domeniu}
                </option>
              ))}
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
              {localitati.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes */}
          <div className="col-span-1">
            <div className="flex items-center justify-between border border-gray-300 rounded-[10px] p-2 hover:bg-blue-500 hover:text-white">
              <label>Persoană Fizică</label>
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
              <label>Persoană Juridică</label>
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

      {/* 2. Agent Economic Section */}
      <div className="bg-sky-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">2. Agent Economic</h2>
        <div>
          <label className="block mb-1">*Agent economic Denumire / IDNO</label>
          <input
            type="text"
            name="agentEconomic"
            value={formData.agentEconomic}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="Introduceți denumirea sau IDNO"
            required
            list="agentiEconomici"
          />
          <datalist id="agentiEconomici">
            <option value="SRL MoldTelecom" />
            <option value="SA Orange Moldova" />
            <option value="SRL StârNet" />
            <option value="SA Termoelectrica" />
            <option value="SRL Agropiese TGR" />
          </datalist>
        </div>
      </div>

      {/* 3. Detalii Apel Section */}
      <div className="bg-sky-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">3. Conținut Apel</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Categorie Produs */}
          <div>
            <label className="block mb-1">A. Produs</label>
            <select
              name="categorieProdus"
              value={formData.categorieProdus}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="">Select...</option>
              {produse.map((produs, index) => (
                <option key={index} value={produs}>
                  {produs}
                </option>
              ))}
            </select>
          </div>

          {/* Categorie Serviciu */}
          <div>
            <label className="block mb-1">B. Serviciu</label>
            <select
              name="categorieServiciu"
              value={formData.categorieServiciu}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="">Select...</option>
              {servicii.map((serviciu, index) => (
                <option key={index} value={serviciu}>
                  {serviciu}
                </option>
              ))}
            </select>
          </div>

          {/* Detalii */}
          <div>
            <label className="block mb-1">*Detalii consultație</label>
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
