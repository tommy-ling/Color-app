import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from 'react-sortable-hoc';
import chroma from 'chroma-js';
import './DraggableColorBox.css'

function DraggableColorBox(props) {
  const luminance = chroma(props.color).luminance()
  return (
    <div className='DragColorBox' style={{ backgroundColor: props.color }}>
      <div className='boxContent'>
        <span className={luminance <= 0.15 ? 'light-text' : 'dark-text'}>{props.name}</span>
        <DeleteIcon className='deleteIcon'
          onClick={props.handleClick}
          style={{transition: "all 0.3s ease-in-out"}} />
      </div>
    </div>
  )
}

export default SortableElement(DraggableColorBox)