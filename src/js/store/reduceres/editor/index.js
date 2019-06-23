const initialState = {
  isOpen: false,
  editingPhoto: null,
  currentTool: 'text',
  functions: {
    fontFamily: 'Impact',
    fontSize: 25,
    color: '#fff',
    textAlign: 'left',
    textBorderColor: '#000',
    textBorderSize: 1,
    lineHeight: 1,
    letterSpacing: 1
  },
  textFields: [],
  currentTextField: null
};


export default (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch( action.type ) {

    case 'OPEN_EDITOR':
      newState.isOpen = true;
      newState.editingPhoto = action.imageUrl;
      return newState;

    case 'CLOSE_EDITOR':
      newState.isOpen = false;
      newState.editingPhoto = null;
      return newState;

    case 'ADD_TEXT_FIELD':      
      newState.textFields.push(
      {
        id: action.id,
        top: action.top,
        left: action.left,
        style: {
          fontFamily: newState.functions.fontFamily,
          fontSize: newState.functions.fontSize,
          color: newState.functions.color,
          textAlign: newState.functions.textAlign,
          textBorderColor: newState.functions.textBorderColor,
          textBorderSize: newState.functions.textBorderSize,
          lineHeight: newState.functions.lineHeight,
          letterSpacing: newState.functions.letterSpacing
        }
      });
      return newState;

    case 'REMOVE_TEXT_FIELD': 
      newState.textFields = newState.textFields.filter( item => item.id !== action.id);
      return newState;

    case 'CHANGE_TOOL': 
      newState.currentTool = action.typeTool;
      return newState;

    case 'CURRENT_TEXT_FIELD': 
      newState.currentTextField = action.index;
      return newState;

    case 'CHANGE_STYLE_TEXT_FIELD': 
      let prevStyle = newState.textFields[newState.currentTextField].style;

      prevStyle = {
        ...prevStyle,
        ...action.style
      };
      newState.functions = prevStyle;
      newState.textFields[newState.currentTextField].style = prevStyle;
      return newState;

    default: 
      return state;
  }
}