import React, { Component } from 'react';
import propTypes from 'prop-types';


export default class FontFamily extends Component {
  static propTypes = {
    handleChangeStyle: propTypes.func
  }

  handleChange = e => {
    this.props.handleChangeStyle({ 'fontFamily': e.currentTarget.value });
  }

  render() {
    return (
      <div className="fontFamily">
        <label htmlFor="fontFamilySelect">Шрифт</label><br />
        <select name="fontFamily" id="fontFamilySelect" onChange={this.handleChange}>
          <option>Impact</option>
          <option>ObelixPro</option>
        </select>
      </div>
    );
  }
}