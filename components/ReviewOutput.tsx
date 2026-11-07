
import React from 'react';
import { parseReview } from './parseReview';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="prose prose-invert prose-sm max-w-none">
            {parseReview(content).map((block, index) => {
                switch (block.kind) {
                    case 'h3': return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-green-400">{block.text}</h3>;
                    case 'h2': return <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-green-300 border-b border-gray-700 pb-2">{block.text}</h2>;
                    case 'h1': return <h1 key={index} className="text-2xl font-extrabold mt-8 mb-4 text-green-200">{block.text}</h1>;
                    case 'label': return <p key={index} className="my-2"><strong className="text-gray-300">{block.label}</strong>{block.text}</p>;
                    case 'li': return <li key={index} className="ml-5 list-disc">{block.text}</li>;
                    case 'hr': return <hr key={index} className="my-4 border-gray-700" />;
                    case 'pre': return <pre key={index} className="bg-[#010409] p-3 rounded-md my-2 overflow-x-auto"><code className="font-mono">{block.text}</code></pre>;
                    default: return <p key={index} className="my-1">{block.text}</p>;
                }
            })}
        </div>
    );
};

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <svg className="animate-spin h-10 w-10 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h3 className="text-lg font-semibold">Jesun is thinking...</h3>
          <p className="text-sm text-gray-400">Analyzing your code for greatness.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-300">An Error Occurred</h3>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      );
    }

    if (review) {
      return <SimpleMarkdownRenderer content={review} />;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673" />
        </svg>
        <h3 className="text-lg font-semibold">Ready for Review</h3>
        <p className="text-sm text-gray-500">Your code analysis will appear here once you submit your code.</p>
      </div>
    );
  };

  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6 w-full min-h-[50vh] lg:min-h-[calc(100vh-180px)] overflow-y-auto">
      {renderContent()}
    </div>
  );
};
