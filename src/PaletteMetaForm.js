import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function PaletteMetaForm(props) {
  const [newPaletteName, setNewPaletteName] = React.useState('')
  const { colors, history, savePalette, palettes, open, setOpen } = props

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setNewPaletteName(e.target.value)
  }

  const handleSubmit = () => {
    let newName = newPaletteName
    const newPalette = { 
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors }
    savePalette(newPalette)
    handleClose()
    history.push('/')
  }

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
    })
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new palette. Make sure the name is unique.
          </DialogContentText>
          <TextValidator 
            label='Palette Name' 
            name='newPaletteName'
            value={newPaletteName}
            onChange={handleNameChange} 
            fullWidth
            margin='normal'
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={['Enter Palette Name', 'Name already taken']}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
              type='submit'
              variant='contained' 
              color='primary'>
              Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}