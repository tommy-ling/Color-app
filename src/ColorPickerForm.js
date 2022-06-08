import * as React from 'react'
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import './ColorPickerForm.css'

function ColorPickerForm(props) {
  const { paletteIsFull, colors, currentColor,newColorName, updateCurrentColor, handleColorChange, addNewColor } = props

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
    })
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return colors.every(({color}) => color !== currentColor)
    })
  })

  return (
    <div>
      <ChromePicker 
          color={currentColor}
          onChangeComplete={updateCurrentColor}
          className='picker'
        />
        <ValidatorForm
          onSubmit={addNewColor}
          instantValidate={false}>
          <TextValidator
            className='colorNameInput'
            variant='filled'
            margin='normal'
            placeholder="color name"
            value={newColorName}
            name='newColorName'
            onChange={handleColorChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'This field is required',
              'Color name must be unique',
              'Color already taken']}
          />
          <Button 
            className='addColor'
            variant='contained' 
            color='primary' 
            style={{background: paletteIsFull ? 'gray' : currentColor}}
            type='submit'
            disabled={paletteIsFull}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
    </div>
  )
}

export default ColorPickerForm