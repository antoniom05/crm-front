import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './components/HomePage'; // Statistica page
import CallsPage from './components/CallsPage'; // Apeluri page
import NewDocumentForm from './NewDocumentForm';  // New form page
import DocumentPage from './components/DocumentPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex"> {/* Use min-h-screen to ensure full page height */}
        {/* Pass isOpen and toggleSidebar to Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col"> {/* Main content area */}
          {/* Pass toggleSidebar to Header */}
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex-1 p-2"> {/* Content area grows dynamically */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apeluri" element={<CallsPage />} />
              <Route path="/documente" element={<DocumentPage />} />
              <Route path="/new-document" element={<NewDocumentForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
