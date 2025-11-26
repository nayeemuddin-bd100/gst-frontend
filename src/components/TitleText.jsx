import React from 'react'
import "../styles/title-text.css";
import { useLanguage } from '../modules/LanguageContext';

const TitleText = ({title, text}) => {

  const { language } = useLanguage();
  
    const processText = (texto) => {
      if (texto) {
        const clave = "***";
        const index = texto.indexOf(clave);
        return index === -1
          ? texto
          : language === "en"
          ? texto.substring(0, index)
          : texto.substring(index + clave.length);
      }
      return texto;
    };
  return (
    <div className='tt-title-text'>
        <h4>{processText(title)}</h4>
        <p>{processText(text)}</p>
    </div>
  )
}

export default TitleText