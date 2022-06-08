import React, { Component } from 'react'
import Link from 'react-router-dom/Link';
import Navbar from './Navbar';
import ColorBox from "./ColorBox";
import PaletteFooter from './PaletteFooter';
import './SingleColorPalette.css'

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    this.state = { format: 'hex' }
    this.changeFormat = this.changeFormat.bind(this)
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = []
    let allColors = palette.colors
    
    for(let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => {
          return color.id === colorToFilterBy
        })
      )
    }
    return shades.slice(1)
  }

  changeFormat(val) {
    this.setState({ format: val })
  }

  render() {
    const { paletteName, emoji, id } = this.props.palette
    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.name} name={color.name} background={color[this.state.format]} showingFullPalette={false} />
    ))
    return (
      <div className="SinglePalette">
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className="SinglePalette-colors">{colorBoxes}
          <div className='go-back ColorBox'>
            <Link className='back-button' to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default SingleColorPalette