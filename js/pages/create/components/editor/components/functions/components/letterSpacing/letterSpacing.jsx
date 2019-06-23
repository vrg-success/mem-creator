import React, { Component } from 'react';
import { func } from 'prop-types';


export default class LetterSpacing extends Component {
  static propTypes = {
    handleChangeStyle: func
  }

  handleChange = e => {
    const value = e.currentTarget.value;

    if (value.trim()) {
      this.props.handleChangeStyle({ 'letterSpacing': +value });
    }
  }

  render() {
    return (
      <div className="letterSpacing">
        <label htmlFor="letterSpacing">Расстояние между букв</label><br />
        <input type="number" defaultValue="1" id="letterSpacing" onChange={this.handleChange} />
      </div>
    );
  }
}