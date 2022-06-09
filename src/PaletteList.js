import React, {Component} from 'react'
import MiniPalette from './MiniPalette'
import Link from 'react-router-dom/Link'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './PaletteList.css'

class PaletteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDeleteDialog: false,
      deletingId: ''
    }
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.goToPalette = this.goToPalette.bind(this)
  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id })
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" })
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId)
    this.closeDialog()
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    const { palettes } = this.props
    const { openDeleteDialog } = this.state
    return (
      <div className='root-PaletteList'>
        <div className='palettes-container'>
          <nav className='nav'>
            <h1>React Colors</h1>
            <Link className='create' to='/palette/new'>Create Palette</Link>
          </nav>
          <TransitionGroup className='palettes'>
            {palettes.map(palette => (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
              <MiniPalette {...palette} 
              openDialog={this.openDialog}
              handleClick={this.goToPalette}
              />
            </CSSTransition>
          ))}
          </TransitionGroup>
        </div>
        <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
          <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default PaletteList