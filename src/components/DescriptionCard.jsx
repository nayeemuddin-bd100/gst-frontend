import React from 'react'
import "../styles/why-gst.css";
import ProcessText from '../functions/LanguageSorter';

const DescriptionCard = ({title, img, miniImg, text}) => {
  return (
    <div className='dc-description-card'>
        <h4>{ProcessText(title)}</h4>
        <img className='dc-image' src={img} alt='landscape' />
        <p><img className='dc-icon' src={miniImg} alt={`${title} icon`}/> {ProcessText(text)}</p>
       
    </div>
  )
}

export default DescriptionCard