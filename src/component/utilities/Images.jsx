import React from 'react'

const Images = ({source, alt, styleing, onClick, style}) => {
  return (
      <img src= {source} alt={alt} style={style} className={styleing} onClick={onClick}/>     
  )
}

export default Images
