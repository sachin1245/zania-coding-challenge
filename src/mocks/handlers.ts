// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { Document } from '../types/Document';

const LOCAL_STORAGE_KEY = 'documents';

// Load initial documents from localStorage or use default if not available
let documents = loadFromLocalStorage(LOCAL_STORAGE_KEY) || [
  { id: '1', type: 'bank-draft', title: 'Bank Draft', position: 0 },
  { id: '2', type: 'bill-of-lading', title: 'Bill of Lading', position: 1 },
  { id: '3', type: 'invoice', title: 'Invoice', position: 2 },
  { id: '4', type: 'bank-draft-2', title: 'Bank Draft 2', position: 3 },
  { id: '5', type: 'bill-of-lading-2', title: 'Bill of Lading 2', position: 4 },
];

export const handlers = [
  http.get('/api/documents', () => {
    return HttpResponse.json(documents);
  }),

  http.post('/api/documents', async ({ request }) => {
    const newDocuments = (await request.json()) as Document[];
    documents = newDocuments;
    saveToLocalStorage(LOCAL_STORAGE_KEY, documents);
    return HttpResponse.json({ message: 'Documents updated successfully' });
  }),
];
