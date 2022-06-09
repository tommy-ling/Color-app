import React, { createContext, useState } from 'react'
import seedColors from '../seedColors';

export const NewPaletteFormContext = createContext()

export function NewPaletteFormProvider(props) {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('teal')
  const [colors, setColors] = useState(seedColors[0].colors)
  const [newColorName, setnewColorName] = useState('')
  const [formShowing, setFormShowing] = useState(false)
  const [newPaletteName, setNewPaletteName] = React.useState('')
  const maxColors = 20
  const paletteIsFull = colors.length >= maxColors

  return (
    <NewPaletteFormContext.Provider value={{
      open, setOpen, currentColor, setCurrentColor, colors, setColors, newColorName, setnewColorName, formShowing, setFormShowing,
      newPaletteName, setNewPaletteName, paletteIsFull}}>
      {props.children}
    </NewPaletteFormContext.Provider>
  )
}