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
import { NewPaletteFormContext } from './context/NewPaletteFormContext';
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
  const { open, setOpen, colors, setColors, paletteIsFull } = React.useContext(NewPaletteFormContext)

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        palettes={props.palettes} 
        savePalette={props.savePalette}
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
          <ColorPickerForm />
          </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList 
          axis="xy"
          distance={1}
          onSortEnd={onSortEnd}
          />
      </Main>
    </Box>
  );
}