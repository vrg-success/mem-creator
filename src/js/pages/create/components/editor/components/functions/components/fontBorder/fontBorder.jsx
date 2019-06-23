import React, { Component } from 'react';
import propTypes from 'prop-types';


export default class FontBorder extends Component {
  static propTypes = {
    handleChangeStyle: propTypes.func
  }

  handleChange = e => {
    const value = e.currentTarget.value;

    if (value.trim().length) {
      this.props.handleChangeStyle({ 'textBorderSize': +value });
    }
  }

  render() {
    return (
      <div className="fontBorder">
        <label htmlFor="fontBorderInput">Размер обводки</label><br />
        <input type="number" defaultValue="1" id="fontBorderInput" onChange={this.handleChange} />
      </div>
    );
  }
}