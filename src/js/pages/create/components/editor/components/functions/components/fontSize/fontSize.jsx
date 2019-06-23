import React, { Component } from 'react';
import propTypes from 'prop-types';


export default class FontFamily extends Component {
  static propTypes = {
    handleChangeStyle: propTypes.func
  }
  
  handleChange = e => {
    const value = e.currentTarget.value;

    if (value.trim().length) {
      this.props.handleChangeStyle({'fontSize': +value});
    }
  }

  render() {
    return (
      <div className="fontSize">
        <label htmlFor="fontSizeInput">Размер шрифта</label><br/>
        <input type="number" defaultValue="25" id="fontSizeInput" onChange={this.handleChange} />
      </div>
    );
  }
}