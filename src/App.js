import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './components/HomePage'; // Statistica page
import CallsPage from './components/CallsPage'; // Apeluri page
import NewDocumentForm from './NewDocumentForm';  // NewDocumentForm as a separate page
import DocumentPage from './components/DocumentPage';
import LoginPage from './LoginPage';  // Import LoginPage

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState([]); // Moved document state here

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to add a new document
  const addDocument = (newDoc) => {
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      { ...newDoc, nr: prevDocuments.length + 1, statut: 'Deschisă' },  // Default to 'Deschisă'
    ]);
  };

  return (
    <Router>
      <MainApp 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        addDocument={addDocument} 
        documents={documents}  // Pass documents and addDocument down
      />
    </Router>
  );
}

// Separate component to access the Router's useLocation
function MainApp({ isSidebarOpen, toggleSidebar, addDocument, documents }) {
  const location = useLocation();

  // Check if the current route is '/login'
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex">
      {/* Only render Sidebar and Header if not on the login page */}
      {!isLoginPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="flex-1 flex flex-col">
        {!isLoginPage && <Header toggleSidebar={toggleSidebar} />}
        <div className="flex-1 p-2">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} /> {/* Login route without sidebar/header */}
            <Route path="/apeluri" element={<CallsPage />} />
            
            {/* Document page */}
            <Route path="/documente" element={<DocumentPage documents={documents} />} />
            
            {/* NewDocumentForm as a separate page */}
            <Route 
              path="/new-document" 
              element={<NewDocumentForm addDocument={addDocument} />}  // Pass addDocument to the form
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
