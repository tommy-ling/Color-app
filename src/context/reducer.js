// export const drawerReducer = (state, action) => {
//   switch(action.type) {
//     case 'REMOVE':
//       return state.filter(color => color.name !== action.name)
//   }
// }


// const removeColor = (colorName) => {
//   const newColors = colors.filter(color => color.name !== colorName)
//   setColors(newColors)
// }

// const addNewColor = () => {
//   const newColor = {color: currentColor, name: newColorName}
//   setColors([...colors, newColor])
//   setnewColorName('')
// }

// const clearColors = () => {
//   setColors([])
// }

// const addRandomColor = () => {
//   const colorsToPick = props.palettes.length !== 0 ? props.palettes : seedColors
//   const allColors = colorsToPick.map(p => p.colors).flat()
//   let rand
//   let randomColor
//   let isDuplicateColor = true
//   while(isDuplicateColor) {
//     rand = Math.floor(Math.random() * allColors.length)
//     randomColor = allColors[rand]
//     isDuplicateColor = colors.some(color => color.name === randomColor.name)
//   }
//   setColors([...colors, randomColor])
// }

// const onSortEnd = ({oldIndex, newIndex}) => {
//   setColors(arrayMove(colors, oldIndex, newIndex));
// };