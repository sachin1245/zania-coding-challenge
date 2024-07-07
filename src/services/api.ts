import { Document } from '../types/Document';

const API_URL = '/api';

export const fetchDocuments = async (): Promise<Document[]> => {
  const response = await fetch(`${API_URL}/documents`);
  if (!response.ok) {
    throw new Error('Failed to fetch Documents');
  }
  return response.json();
};

export const saveDocuments = async (documents: Document[]): Promise<void> => {
  const response = await fetch(`${API_URL}/documents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(documents),
  });

  if (!response.ok) {
    throw new Error('Failed to save documents');
  }
};
