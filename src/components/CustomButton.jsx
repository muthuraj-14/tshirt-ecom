import React from 'react'
import state from '../store'
import { getContrastingColor } from '../config/helpers'



import { useSnapshot } from 'valtio'
import { color } from 'framer-motion'
const CustomButton = ({type , title , customStyles , handleClick}) => {
  const snap = useSnapshot(state);
  const generateStyle = (type)=>{
    if(type === 'filled'){
        return {
            backgroundColor : snap.color,
            color: getContrastingColor(snap.color)
        }
    }else if(type === 'outlined'){
      return{
        borderWidth : '1px',
        borderColor :  getContrastingColor(snap.color),
        color :  getContrastingColor(snap.color)
      }
    }
  }

  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
    style={generateStyle(type)}
    onClick={handleClick}>
      {title}
    </button>
  )
}

export default CustomButton
