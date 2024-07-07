import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGrid from './components/CardGrid';
import SaveStatus from './components/SaveStatus';
import { useDocuments } from './hooks/useDocuments';
import { Document } from './types/Document';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

const AppTitle = styled.h1`
  text-align: center;
`;

const ImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const OverlayImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const App: React.FC = () => {
  const { documents, isLoading, isSaving, lastSaveTime, updateDocuments } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleReorder = (newOrder: Document[]) => {
    updateDocuments(newOrder);
  };

  const handleCardClick = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleOverlayClick = () => {
    setSelectedDocument(null);
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedDocument(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppContainer>
      <AppTitle>Drag and Drop Card</AppTitle>
      <SaveStatus isSaving={isSaving} lastSaveTime={lastSaveTime} />
      <CardGrid documents={documents} onReorder={handleReorder} onCardClick={handleCardClick} />
      {selectedDocument && (
        <ImageOverlay onClick={handleOverlayClick}>
          <OverlayImage
            src={`https://cataas.com/cat?${selectedDocument.type}`}
            alt={selectedDocument.title}
          />
        </ImageOverlay>
      )}
    </AppContainer>
  );
};

export default App;
