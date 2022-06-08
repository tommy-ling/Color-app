import React from 'react'
import { memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './MiniPalette.css'

function MiniPalette(props) {
  const { paletteName, emoji, colors, id, handleClick, openDialog } = props
  const miniColorBoxes = colors.map(color => (
    <div 
      className='minicolor' 
      style={{ backgroundColor: color.color }}
      key={color.name} 
    />
  ))

  const deleteMiniPalette = (e) => {
    e.stopPropagation();
    openDialog(id)
  }
  console.log('rendering ', paletteName)
  return (
    <div className="root" onClick={() => handleClick(id)}>
      <DeleteIcon 
        className="miniPalette-deleteIcon" 
        style={{transition: "all 0.3s ease-in-out"}}
        onClick={deleteMiniPalette}/>
      <div className='colors'>
        {miniColorBoxes}
      </div>
      <h5 className='title'>
        {paletteName} <span className='emoji'>{emoji}</span>
      </h5>
    </div>
  )
}

export default React.memo(MiniPalette)