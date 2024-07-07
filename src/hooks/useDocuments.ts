import { useState, useEffect, useCallback } from 'react';
import { Document } from '../types/Document';
import { fetchDocuments, saveDocuments } from '../services/api';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  //load documents on the initial laod
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.log('Failed to load documents', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  //save documents if there is a change
  const saveChanges = useCallback(async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      await saveDocuments(documents);
      setLastSaveTime(Date.now());
      setHasChanges(false);
    } catch (error) {
      console.log('Failed to save documents', error);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 500); // adding setTimeout to see loading spinner
    }
  }, [documents, hasChanges]);

  //set 5 interval to save documents
  useEffect(() => {
    const saveInterval = setInterval(saveChanges, 5000);
    return () => clearInterval(saveInterval);
  }, [saveChanges]);

  const updateDocuments = (newDocuments: Document[]) => {
    setDocuments(newDocuments);
    setHasChanges(true);
  };

  return {
    documents,
    isLoading,
    isSaving,
    lastSaveTime,
    updateDocuments,
  };
};
