import { Select, SelectItem } from "@nextui-org/react";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";

export type Language = keyof typeof langs;

const LanguageSelector = () => {
  const [language, setLanguage] = useState<Language>();

  return (
    <Select
      disallowEmptySelection={true}
      fullWidth={false}
      size="sm"
      label="Language"
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
    >
      {Object.keys(langs)
        .sort()
        .map((option) => (
          <SelectItem key={option}>{option}</SelectItem>
        ))}
    </Select>
  );
};

export default LanguageSelector;
