import React from 'react'
import DraggableColorBox from './DraggableColorBox'
import { SortableContainer } from 'react-sortable-hoc'
import { NewPaletteFormContext } from './context/NewPaletteFormContext';

const DraggableColorList = SortableContainer(() => {
  const { colors, setColors } = React.useContext(NewPaletteFormContext)

  const removeColor = (colorName) => {
    const newColors = colors.filter(color => color.name !== colorName)
    setColors(newColors)
  }

  return (
    <div style={{height: '100%'}}>
      {colors.map((color, i) => (
          <DraggableColorBox 
            index={i}
            color={color.color} 
            name={color.name} 
            key={color.name} 
            handleClick={() => removeColor(color.name)}
            />
        ))}
    </div>
  )
})

export default DraggableColorList