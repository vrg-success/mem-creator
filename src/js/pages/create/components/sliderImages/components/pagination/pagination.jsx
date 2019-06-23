import React, { Component } from 'react';
import propTypes from 'prop-types'; 

import './pagination.sass';


export default class Pagination extends Component {
  static propTypes = {
    countPages: propTypes.number,
    currentPage: propTypes.number,
    handleChangePage: propTypes.func.isRequired
  }

  handleClick = page => {
    this.props.handleChangePage(page);
  }

  render() {
    const { countPages, currentPage } = this.props;

    return (
      <ul className="memes__pagination">
        {
          [...Array(countPages)].map((item, index) => (
            <li className={currentPage === index ? 'memes__pagination_item current-page' : 'memes__pagination_item'} key={index}>
              <button onClick={() => this.handleClick(index)} >
                {index + 1}
              </button>
            </li>
          ))
        }
      </ul>
    );
  }
}