import BackgroundPicker from "./components/BackgroundPicker/BackgroundPicker";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import RadiusSelector from "./components/RadiusSelector/RadiusSelector";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";

const Toolbar = () => {
  return (
    <div className="flex items-center justify-start tablet:justify-center gap-2 tablet:gap-4 flex-wrap">
      <LanguageSelector />
      <ThemeSelector />
      <RadiusSelector />
      <BackgroundPicker />
    </div>
  );
};

export default Toolbar;
