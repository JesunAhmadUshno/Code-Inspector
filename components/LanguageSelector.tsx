
import React from 'react';

interface Language {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-400 mb-2">
        Select Language
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleChange}
        className="w-full p-3 bg-[#161b22] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
