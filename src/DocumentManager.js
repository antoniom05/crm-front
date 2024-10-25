import React, { useState } from 'react';
import NewDocumentForm from './NewDocumentForm';  // Your NewDocumentForm component
import DocumentTable from './DocumentTable';      // Adjusted to use DocumentTable

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
      
      {/* Render your documents in DocumentTable */}
      <DocumentTable documents={documents} />
    </div>
  );
};

export default DocumentManager;
