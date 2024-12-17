import { create } from 'zustand';
import { Document, User } from '../types';

interface Store {
  documents: Document[];
  currentDocument: Document | null;
  user: User | null;
  isAuthenticated: boolean;
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (document: Document) => void;
  setCurrentDocument: (document: Document | null) => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<Store>((set) => ({
  documents: [],
  currentDocument: null,
  user: null,
  isAuthenticated: false,
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  updateDocument: (document) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === document.id ? document : doc
      ),
      currentDocument: state.currentDocument?.id === document.id ? document : state.currentDocument,
    })),
  setCurrentDocument: (document) => set({ currentDocument: document }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));