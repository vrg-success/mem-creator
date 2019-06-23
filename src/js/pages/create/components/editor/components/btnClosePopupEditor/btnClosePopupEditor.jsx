import React from 'react';
import propTypes from 'prop-types';

import './btnClosePopupEditor.sass';


export const BtnClosePopupEditor = () => (
  <button className="popupPhotoEditor__close" onClick={e => this.props.closePopupEditor(e)} />
);

BtnClosePopupEditor.propTypes = {
  closePopupEditor: propTypes.func.isRequired
};