import { useLanguage } from "../modules/LanguageContext";

const ProcessText = (texto) => {
  
    const { language } = useLanguage();
    const clave = "***";
    const index = texto.indexOf(clave);

    if (index === -1) return texto; 

    return language === "en"
      ? texto.substring(0, index) 
      : texto.substring(index + clave.length); 
  
};

export default ProcessText;

// import { useLanguage } from "../modules/LanguageContext";

// const ProcessText = (texto) => {
//     const clave = "***";
//     const index = texto.indexOf(clave);
//     const { language } = useLanguage();  // ✅ Ahora es seguro usarlo dentro de un hook

//     if (index === -1) return texto;
//     return language === "en" ? texto.substring(0, index) : texto.substring(index + clave.length);
// };

// export default ProcessText;
