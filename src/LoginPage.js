import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logoimg from './assets/profile.jpg';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    try {
      const response = await fetch('https://crm.xcore.md/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, name, email } = data;

        // Save the token to localStorage or any secure storage
        localStorage.setItem('token', token);

        // Optionally save user details
        localStorage.setItem('user', JSON.stringify({ name, email }));

        // Redirect to the homepage
        navigate('/');
      } else {
        switch (response.status) {
          case 401:
            setError('Unauthorized. Please check your login credentials.');
            break;
          case 403:
            setError('Authorization error. You do not have permission to access this.');
            break;
          case 422:
            setError('Validation error. Please ensure all fields are filled out correctly.');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
            break;
        }
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          src={Logoimg}
          alt="Avatar"
          className="rounded-full w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-semibold mb-2">Logare</h1>
        <p className="text-gray-500">
          Bine ați venit, vă rugăm să vă conectați la contul dvs.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Login</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Parola</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <input name='remember' id='remember' type="checkbox" className="mr-2" />
            <label for='remember' className="text-gray-600 select-none">Memorează logarea</label>
          </div>
          <div>
            <a href="#" className="text-blue-500">Ați uitat parola?</a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5046E5] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Intră în cont
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
