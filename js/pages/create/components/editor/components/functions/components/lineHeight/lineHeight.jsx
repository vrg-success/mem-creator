import React, { Component } from 'react';
import propTypes from 'prop-types';


export default class LineHeight extends Component {
  static propTypes = {
    handleChangeStyle: propTypes.func
  }

  handleChange = e => {
    const value = e.currentTarget.value;

    if (value.trim()) {
      this.props.handleChangeStyle({ 'lineHeight': +value });
    }
  }

  render() {
    return (
      <div className="lineHeight">
        <label htmlFor="lineHeight">Высота строки</label><br />
        <input type="number" defaultValue="1" id="lineHeight" onChange={this.handleChange} />
      </div>
    );
  }
}