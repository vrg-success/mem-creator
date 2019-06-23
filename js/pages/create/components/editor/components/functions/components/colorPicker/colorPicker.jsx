import React, { Component } from 'react';
import propTypes from 'prop-types';
import { SketchPicker } from 'react-color';


export default class ColorPicker extends Component {
  static propTypes = {
    label: propTypes.string,
    type: propTypes.string,
    handleChangeStyle: propTypes.func.isRequired
  };

  static defaultProps = {
    label: 'Выбор цвета'
  };

  state = {
    displayColorPicker: false,
    color: this.props.type === 'fontColor' ?
      { r: '255', g: '255', b: '255', a: '1' } :
      { r: '0', g: '0', b: '0', a: '1' }
  };

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  }

  handleChange = color => {
    this.setState({
      color: color.rgb
    });

    let colorPickerType;
    let style = {};
    colorPickerType = this.props.type === 'fontColor' ? 'color' : 'textBorderColor';
    style[colorPickerType] = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;

    this.props.handleChangeStyle(style);
  }

  handleClose = () => {
    this.setState({
      displayColorPicker: false
    })
  };

  render() {
    return (
      <div className="colorPicker">
        <span className="label">{this.props.label}</span><br />
        <button
          style={{ backgroundColor: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})` }}
          onClick={this.handleClick}
        />
        {this.state.displayColorPicker ? (
          <div className="colorPickerWrapper">
            <div className="colorPickerCover" onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}