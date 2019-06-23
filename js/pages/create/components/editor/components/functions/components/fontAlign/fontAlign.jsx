import React, { Component } from 'react';
import propTypes from 'prop-types';


export default class FontAlign extends Component {
  static propTypes = {
    handleChangeStyle: propTypes.func
  }

  state = {
    activeClass: 'left'
  }

  handleChange = align => {
    this.props.handleChangeStyle({ 'textAlign': align });
    this.setState({ activeClass: align });
  }

  render() {
    return (
      <div className="fontAlign">
        <span className="label">Выровнять</span>
        <ul className="fontAlign__items">
          <li className="fontAlign__item">
            <button
              title="По левому краю"
              className={this.state.activeClass === 'left' ? 'active' : null}
              onClick={() => this.handleChange('left')}
            >
              <img src="img/icons/left-alignment.svg" alt="text left" />
            </button>
          </li>
          <li className="fontAlign__item">
            <button
              title="По центру"
              className={this.state.activeClass === 'center' ? 'active' : null}
              onClick={() => this.handleChange('center')}
            >
              <img src="img/icons/central-align.svg" alt="text center" />
            </button>
          </li>
          <li className="fontAlign__item">
            <button
              title="По правому краю"
              className={this.state.activeClass === 'right' ? 'active' : null}
              onClick={() => this.handleChange('right')}
            >
              <img src="img/icons/right-alignment.svg" alt="text right" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}