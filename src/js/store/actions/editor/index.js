import newId from 'utils/newId';


export function addTextFieldAction(top, left, fields) {
  return {
    type: 'ADD_TEXT_FIELD',
    id: newId(fields),
    top: top,
    left: left
  };
}

export function removeTextFieldAction(id) {
  return {
    type: 'REMOVE_TEXT_FIELD',
    id
  };
}

export function changeTool(typeTool) {
  return {
    type: 'CHANGE_TOOL',
    typeTool
  };
}

export function addCurrentTextFiled(index) {
  return {
    type: 'CURRENT_TEXT_FIELD',
    index
  };
}

export function changeStyleTextField(style) {
  return {
    type: 'CHANGE_STYLE_TEXT_FIELD',
    style
  };
}

export function openEditor(imageUrl) {
  return {
    type: 'OPEN_EDITOR',
    imageUrl
  };
}

export function closeEditor() {
  return {
    type: 'CLOSE_EDITOR'
  };
}