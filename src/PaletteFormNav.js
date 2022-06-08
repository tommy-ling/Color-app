import * as React from 'react';
import Link from 'react-router-dom/Link';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import PaletteMetaForm from './PaletteMetaForm';
import './PaletteFormNav.css'

const drawerWidth = 350;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    height: '64px'
  }),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PaletteFormNav(props) {
  const { open, handleDrawerOpen } = props
  const [formShowing, setFormShowing] = React.useState(false)

  const handleClickOpen = () => {
    setFormShowing(true);
  };

  return (
    <div className='PaletteFormNavRoot'>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='default'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create a Palette
          </Typography>
        </Toolbar>
        <div className='navBtns'>
          <Link to='/' className="link">
            <Button variant='contained' color='secondary' className='navButton'>Go Back</Button>
          </Link>
          <Button variant="contained" color="primary" className='navButton' onClick={handleClickOpen}>
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && <PaletteMetaForm {...props} open={formShowing} setOpen={setFormShowing}/>}
    </div>
  )
}