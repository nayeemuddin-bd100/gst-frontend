import { useLanguage } from "../modules/LanguageContext";
import "../styles/header.css";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button className="toggle-lang-button" onClick={toggleLanguage}>
      {language === "es" ? <p>ENG <img src="/icons/usa-flag.png" /></p> : <p>ESP <img src="/icons/spain-flag.png" /></p>}
    </button>
  );
};

export default LanguageSwitcher;


