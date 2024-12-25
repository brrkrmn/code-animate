import BackgroundPicker from "./components/BackgroundPicker/BackgroundPicker";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import RadiusSelector from "./components/RadiusSelector/RadiusSelector";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";

const Toolbar = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <ThemeSelector />
      <LanguageSelector />
      <RadiusSelector />
      <BackgroundPicker />
    </div>
  );
};

export default Toolbar;
