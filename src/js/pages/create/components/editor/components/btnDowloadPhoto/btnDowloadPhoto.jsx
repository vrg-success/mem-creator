import React, { Component } from 'react';
import html2canvas from 'html2canvas';

import './btnDowloadPhoto.sass';


export default class BtnDowloadPhoto extends Component {
  handleClick = () => {
    html2canvas(document.querySelector('.popupPhotoEditor__preview'), { useCORS: true })
      .then(canvas => {
        let a = document.createElement('a');
        a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
        a.download = 'mem.jpg';
        a.click();
      });
  }

  render() {
    return (
      <div className="btnDowloadPhoto__wrp">
        <button className="btnDowloadPhoto" onClick={this.handleClick}>Скачать изображение</button>
      </div>
    );
  }
}