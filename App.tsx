
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { LanguageSelector } from './components/LanguageSelector';
import { ReviewOutput } from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { LANGUAGES } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(LANGUAGES[0].value);
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReview('');

    try {
      const feedback = await reviewCode(code, language);
      setReview(feedback);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          {/* Left Panel: Input */}
          <div className="flex flex-col gap-4">
            <LanguageSelector
              languages={LANGUAGES}
              selectedLanguage={language}
              onLanguageChange={setLanguage}
            />
            <CodeInput
              code={code}
              onCodeChange={setCode}
              language={language}
            />
            <button
              onClick={handleReview}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform motion-safe:hover:scale-105 shadow-lg shadow-green-600/20 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Review Code
                </>
              )}
            </button>
          </div>

          {/* Right Panel: Output */}
          <div className="mt-8 lg:mt-0">
            <ReviewOutput review={review} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-gray-500">
        <p>Powered by Jesun. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
