import React, { useState } from 'react';
import { PromptInput } from './components/PromptInput';
import { DocumentPreview } from './components/DocumentPreview';
import { ErrorMessage } from './components/ErrorMessage';
import { DocumentList } from './components/documents/DocumentList';
import { Header } from './components/Header';
import { generateDocument } from './lib/api';
import { useStore } from './store/useStore';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentDocument, setCurrentDocument, addDocument, user } = useStore();

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    const response = await generateDocument(prompt);

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      const newDocument = {
        id: crypto.randomUUID(),
        content: response.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addDocument(newDocument);
      setCurrentDocument(newDocument);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Generate Beautiful Documents
            </h2>
            <p className="mt-2 text-gray-600">
              Enter your prompt below and let AI create a well-formatted document for you
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
            {error && (
              <ErrorMessage
                message={error}
                onDismiss={() => setError(null)}
              />
            )}
            {user && <DocumentList />}
            <DocumentPreview
              content={currentDocument?.content || ''}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;