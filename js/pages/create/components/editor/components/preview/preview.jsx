import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { addTextFieldAction } from 'store/actions/editor/';
import TextField from './TextField/TextField';
import './Preview.sass';


const mapStateToProps = state => ({
  textFields: state.editor.textFields.slice(),
  currentTool: state.editor.currentTool,
  editingPhoto: state.editor.editingPhoto
});

const mapDispatchToProps = dispatch => ({
  addTextField: (top, left, fields) => dispatch(addTextFieldAction(top, left, fields))
});


class Preview extends Component {
  static propTypes = {
    textFields: propTypes.array,
    currentTool: propTypes.string,
    editingPhoto: propTypes.string,
    addTextField: propTypes.func
  }

  state = {
    textFieldIndexToSubscribe: null,
    clientY: null,
    clientX: null,
    movingField: null
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.documentCallBack);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.documentCallBack);
  }

  documentCallBack = e => {
    this.setState({
      clientY: e.clientY,
      clientX: e.clientX
    });
  }

  subscribeDocumentMouseMove = (index, movingField) => {
    this.setState({
      textFieldIndexToSubscribe: index,
      movingField: movingField
    });
  }

  unSbscribeDocumentMouseMove = () => {
    this.setState({
      textFieldIndexToSubscribe: null
    });
  }

  handleAddTextFiled = (e) => {
    if (
      !e.target.classList.contains('textField') &&
      !e.target.closest('.textField') &&
      this.props.currentTool === 'text'
    ) {
      const { addTextField, textFields } = this.props;

      addTextField(e.nativeEvent.offsetY, e.nativeEvent.offsetX, textFields);
    }
  }

  renderTextFields() {
    if (this.props.textFields.length) {
      return (
        this.props.textFields.map((item, index) => (
          <TextField
            id={item.id}
            top={item.top}
            left={item.left}
            style={item.style}
            key={item.id}
            index={index}
            subscribeDocumentMouseMove={this.subscribeDocumentMouseMove}
            unSbscribeDocumentMouseMove={this.unSbscribeDocumentMouseMove}
            documentClientY={this.state.textFieldIndexToSubscribe === index ? this.state.clientY : null}
            documentClientX={this.state.textFieldIndexToSubscribe === index ? this.state.clientX : null}
          />
        ))
      );
    }
    return null;
  }

  render() {
    return (
      <div className="popupPhotoEditor__preview" onClick={this.handleAddTextFiled} >
        <img src={this.props.editingPhoto} alt="dev" draggable="false" />
        {this.renderTextFields()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);