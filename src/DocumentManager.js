import React, { useState } from 'react';
import NewDocumentForm from './NewDocumentForm';  // Your NewDocumentForm component
import DocumentPage from './components/DocumentPage';  // The page where documents are listed

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);

  // Function to add a new document to the list
  const addDocument = (newDoc) => {
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      { ...newDoc, nr: prevDocuments.length + 1, statut: 'Deschisă' }  // Default to 'Deschisă'
    ]);
  };

  return (
    <div>
      {/* Pass addDocument to NewDocumentForm */}
      <NewDocumentForm addDocument={addDocument} />
      
      {/* Render your documents in DocumentPage */}
      <DocumentPage documents={documents} />
    </div>
  );
};

export default DocumentManager;
