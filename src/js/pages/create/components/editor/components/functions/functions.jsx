import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Tools from './components/tools/tools';
import FontFamily from './components/fontFamily/fontFamily';
import FontSize from './components/fontSize/fontSize';
import FontBorder from './components/fontBorder/fontBorder';
import LineHeight from './components/lineHeight/lineHeight';
import LetterSpacing from './components/letterSpacing/letterSpacing';
import FontAlign from './components/fontAlign/fontAlign';
import ColorPicker from './components/colorPicker/colorPicker';
import { changeStyleTextField } from 'store/actions/editor/';

import './functions.sass';


const mapStateToProps = state => ({
  textFieldsLength: state.editor.textFields.length
});

const mapDispatchToProps = dispatch => ({
  changeStyleTextField: style => dispatch(changeStyleTextField(style))
});


class Functions extends Component {
  static propTypes = {
    textFieldsLength: propTypes.number,
    changeStyleTextField: propTypes.func
  }

  handleChangeStyle = style => {
    this.props.changeStyleTextField(style);
  }

  render() {
    const { textFieldsLength } = this.props;

    return (
      <div className="popupPhotoEditor__functions">
        <Tools />
        <FontFamily handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
        <FontSize handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
        <FontBorder handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
        <LineHeight handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
        <LetterSpacing handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
        <FontAlign handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
        <ColorPicker label="Цвет текста" type="fontColor" handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
        <ColorPicker label="Цвет обводки" type="borderColor" handleChangeStyle={textFieldsLength ? this.handleChangeStyle : () => {}} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Functions);