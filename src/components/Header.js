import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to detect current route
import { useNavigate } from 'react-router-dom';
import './../App.css';
const Header = ({ toggleSidebar }) => {
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // Hook for navigation

  // Determine page title based on current route
  const getTitle = () => {
    if (location.pathname === '/') return 'Statistică';
    if (location.pathname === '/apeluri') return 'Apeluri';
    if (location.pathname === '/contacte') return 'Contacte';
    if (location.pathname === '/documente') return 'Documente'; // Assuming you have a "Contacte" page    // Assuming you have a "Contacte" page
    if (location.pathname === '/new-document') return 'Document Nou'; // Assuming you have a "Setări" page
    if (location.pathname === '/setari') return 'Setări'; // Assuming you have a "Setări" page
    return 'Pagina necunoscută'; // Default fallback
  };

  return (
    <div className="flex flex-wrap justify-between items-center mb-8 border-b-4 border-slate-100 p-4">
      {/* Left side: Burger Menu (on mobile), Title, Search Icon (on mobile), and Ctrl K (only on desktop) */}
      <div className="flex items-center space-x-4 md:mb-0">
        {/* Burger Menu Icon for mobile */}
        <button className="md:hidden" onClick={toggleSidebar}>
          <span className="material-icons text-gray-500 cursor-pointer">menu</span>
        </button>

        {/* Dynamic Page Title */}
        <h1 className="text-2xl font-bold">{getTitle()}</h1>

        {/* Search input for desktop, Search icon for mobile */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Căutare..."
            className="border rounded p-2 w-64"
          />
        </div>
        <div className="md:hidden">
          <span className="material-icons text-gray-500 cursor-pointer">search</span>
        </div>

        {/* Ctrl K button only visible on desktop */}
        <button className="hidden md:block text-blue-500 p-2 border rounded">Ctrl K</button>
      </div>

      {/* Right side: Notifications, Document Icon on mobile / full button on desktop */}
      <div className="flex items-center space-x-4">
        <div className="relative notificari">
          <span className="material-icons text-gray-500">notifications</span>
        </div>

        {/* Full "Document Nou" button on desktop, Icon button on mobile */}
        <button 
        onClick={() => navigate('/new-document')}
        className="bg-blue-500 text-white py-2 px-4 rounded hidden md:flex items-center">
          Document Nou
        </button>
        <button className="bg-blue-500 text-white p-2 rounded-full flex md:hidden" onClick={() => navigate('/new-document')}
>
          
          <span className="material-icons">add</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
