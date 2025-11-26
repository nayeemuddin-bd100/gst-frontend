import React from 'react'
import { useAutoResizeTextarea } from '../../../functions/useAutoResizeTextarea';

const FormTitleText = ({title, text, fieldKey, onTitleChange}) => {
    const { ref, onInput } = useAutoResizeTextarea();
  return (
        <div className='tt-title-text'>
        <input type="text" className='input-field d-tt-title-h4' value={title} onChange={e => onTitleChange(e, "title", fieldKey)}/>
        <textarea                 ref={ref}
                onInput={onInput} type="text" value={text} className='input-field d-tt-title-p' onChange={e => onTitleChange(e, "text", fieldKey)}/>
    </div>
  )
}

export default FormTitleText