import { useLanguage } from "../modules/LanguageContext";

const useProcessText = (texto) => {
    const clave = "***";
    const index = texto.indexOf(clave);
    const { language } = useLanguage();  // ✅ Hook dentro de un hook = Correcto ✅

    if (index === -1) return texto;
    return language === "en" ? texto.substring(0, index) : texto.substring(index + clave.length);
};

export default useProcessText;
