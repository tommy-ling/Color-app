import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';
import './NewPaletteForm.css'

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  width: '100%'
}));

export default function NewPaletteForm(props) {
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState('teal')
  const [colors, setColors] = React.useState(seedColors[0].colors)
  const [newColorName, setnewColorName] = React.useState('')

  const maxColors = 20
  const paletteIsFull = colors.length >= maxColors

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex)
  }

  const addNewColor = () => {
    const newColor = {color: currentColor, name: newColorName}
    setColors([...colors, newColor])
    setnewColorName('')
  }

  const handleColorChange = (e) => {
    setnewColorName(e.target.value)
  }

  const removeColor = (colorName) => {
    const newColors = colors.filter(color => color.name !== colorName)
    setColors(newColors)
  }

  const clearColors = () => {
    setColors([])
  }

  const addRandomColor = () => {
    const colorsToPick = props.palettes.length !== 0 ? props.palettes : seedColors
    const allColors = colorsToPick.map(p => p.colors).flat()
    let rand
    let randomColor
    let isDuplicateColor = true
    while(isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length)
      randomColor = allColors[rand]
      isDuplicateColor = colors.some(color => color.name === randomColor.name)
    }
    setColors([...colors, randomColor])
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav 
        open={open}
        palettes={props.palettes} 
        colors={colors} 
        savePalette={props.savePalette}
        handleDrawerOpen={handleDrawerOpen}
        history={props.history}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className='container'>
          <Typography variant='h4' gutterBottom>
            Deisgn Your Palette
          </Typography>
          <div className='buttons'>
            <Button className='button' variant='contained' color='secondary' onClick={clearColors}>Clear Palette</Button>
            <Button 
              className='button'
              variant='contained' 
              color='primary' 
              onClick={addRandomColor}
              disabled={paletteIsFull}>Random Color</Button>
          </div>
          <ColorPickerForm 
            colors={colors}
            currentColor={currentColor}
            newColorName={newColorName}
            updateCurrentColor={updateCurrentColor}
            handleColorChange={handleColorChange}
            addNewColor={addNewColor}
            paletteIsFull={paletteIsFull}/>
          </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList 
          axis="xy"
          distance
          colors={colors} 
          onSortEnd={onSortEnd}
          removeColor={removeColor} />
      </Main>
    </Box>
  );
}