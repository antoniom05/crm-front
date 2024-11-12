import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for route detection
import ProfileImg from './../assets/profile.jpg';
import { ChartBarSquareIcon, DocumentIcon, PhoneIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import './../App.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // Hook to get the current route

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-80 h-max-screen bg-[#1E293B] p-5 flex flex-col justify-between transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 z-40`}
      >
        <div>
          {/* Logo */}
          <div className="text-white text-2xl font-bold mb-8">LOGO</div>

          {/* Profile */}
          <div className="bg-gray-700 p-4 rounded-lg flex items-center space-x-4 mb-8">
            <img src={ProfileImg} alt="Admin" className="rounded-full h-12 w-12" />
            <div>
              <p className="text-gray-200 font-medium">Nicu</p>
              <p className="text-gray-200 text-sm">nicumk@gmail.com</p>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="remove-padding text-white flex flex-col space-y-4">
            {/* Statistică link */}
            <li
              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200 ${
                location.pathname === '/' ? 'bg-gray-700' : ''
              }`}
            >
              <ChartBarSquareIcon className="h-6 w-6" />
              <Link to="/" className="flex-1 text-white no-underline">
                Statistică
              </Link>
            </li>

            {/* Apeluri link */}
            <li
              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200 ${
                location.pathname === '/documente' ? 'bg-gray-700' : ''
              }`}
            >
              <DocumentIcon className="h-6 w-6" />
              <Link to="/documente" className="flex-1 text-white no-underline">
                Documente
              </Link>
            </li>

            {/* Contacte link */}
            <li
              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200 ${
                location.pathname === '/apeluri' ? 'bg-gray-700' : ''
              }`}
            >
              <PhoneIcon className="h-6 w-6" />
              <Link to="/apeluri" className="flex-1 text-white no-underline">
                Apeluri
              </Link>
            </li>

            {/* Setări link */}
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200">
              <Cog6ToothIcon className="h-6 w-6" />
              <span className="text-white">Setări</span>
            </li>
          </ul>
        </div>

        {/* Footer Section: Activități Deschise / Închise */}
        <div className="mt-auto">
          <div className="flex items-center text-green-400 mb-2">
            <span className="h-3 w-3 rounded-full bg-green-400 mr-2"></span>
            <span>Activități Deschise ( 2 )</span>
          </div>
          <div className="flex items-center text-red-400">
            <span className="h-3 w-3 rounded-full bg-red-400 mr-2"></span>
            <span>Activități Închise ( 45 )</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
