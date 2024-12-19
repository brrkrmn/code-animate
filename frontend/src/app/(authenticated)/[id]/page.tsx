"use client";

import BackgroundPicker from "@/components/BackgroundPicker/BackgroundPicker";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector";
import RadiusSelector from "@/components/RadiusSelector/RadiusSelector";
import ThemeSelector from "@/components/ThemeSelector/ThemeSelector";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";

const Scene = () => {
  const [value, setValue] = useState<string>();

  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <ThemeSelector />
        <LanguageSelector />
        <RadiusSelector />
        <BackgroundPicker />
      </div>
      <div>
        <CodeMirror
          minHeight="200px"
          className="w-full h-full"
          value={value}
          onChange={onChange}
          autoFocus={true}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
        />
      </div>
    </div>
  );
};

export default Scene;
