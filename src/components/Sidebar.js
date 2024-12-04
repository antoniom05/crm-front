import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileImg from './../assets/profile.jpg';
import {
  ChartBarSquareIcon,
  DocumentIcon,
  PhoneIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import './../App.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after logout
  const [user, setUser] = useState({ name: '', email: '' });
  const [activityCounts, setActivityCounts] = useState({
    inchis: 0,
    respins: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchActivityCounts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const url = 'https://crm.xcore.md/api/documents';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();

          // Count statuses
          const inchisCount = data.data.filter((item) => item.status === 'Inchis').length;
          const respinsCount = data.data.filter((item) => item.status === 'Respins').length;

          setActivityCounts({ inchis: inchisCount, respins: respinsCount });
        } else {
          console.error('Failed to fetch activity data');
        }
      } catch (error) {
        console.error('An error occurred while fetching activity counts:', error);
      }
    };

    fetchActivityCounts();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error('No token found');
      return;
    }

    const url = 'https://crm.xcore.md/api/logout';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`, // Dynamically use the token
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        // Clear all localStorage data
        localStorage.clear();

        // Reset user state and navigate to login
        setUser({ name: '', email: '' });
        navigate('/login'); // Ensure '/login' is a valid route in your app
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <div
        className={`fixed md:static inset-y-0 left-0 w-80 h-max-screen bg-[#1E293B] p-5 flex flex-col justify-between transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 z-40`}
      >
        <div>
          {/* Logo */}
          <div className="text-white text-2xl font-bold mb-8">LOGO</div>

          {/* Profile */}
          <div className="bg-gray-700 p-4 rounded-lg flex items-center relative space-x-4 mb-8">
            <img src={ProfileImg} alt="Admin" className="rounded-full h-12 w-12" />
            <div>
              <p className="text-gray-200 font-medium">{user.name || 'Guest'}</p>
              <p className="text-gray-200 text-sm break-all w-full">{user.email || 'guest@example.com'}</p>
              <button className="text-red-500 hover:underline mt-2" onClick={handleLogout}>
                Log Out
              </button>
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

            {/* Documente link */}
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

            {/* Apeluri link */}
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
            <li
              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200 ${
                location.pathname === '/setari' ? 'bg-gray-700' : ''
              }`}
            >
              <Cog6ToothIcon className="h-6 w-6" />
              <Link to="/setari" className="text-white no-underline flex-1">
                Setări
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer Section */}
        <div className="mt-auto">
          <div className="flex items-center text-green-400 mb-2">
            <span className="h-3 w-3 rounded-full bg-green-400 mr-2"></span>
            <span>Activități Închise ( {activityCounts.inchis} )</span>
          </div>
          <div className="flex items-center text-red-400">
            <span className="h-3 w-3 rounded-full bg-red-400 mr-2"></span>
            <span>Activități Respinse ( {activityCounts.respins} )</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
