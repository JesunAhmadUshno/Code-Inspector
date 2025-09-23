
import React from 'react';

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, onCodeChange, language }) => {
  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCodeChange(event.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col">
       <label htmlFor="code-input" className="sr-only">Code Input</label>
      <textarea
        id="code-input"
        value={code}
        onChange={handleCodeChange}
        placeholder={`Paste your ${language} code here...`}
        className="w-full h-[50vh] lg:h-[calc(100vh-250px)] p-4 font-mono text-sm bg-[#010409] border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
        spellCheck="false"
      />
    </div>
  );
};
