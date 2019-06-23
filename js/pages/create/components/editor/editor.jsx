import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { closeEditor } from 'store/actions/editor';
import Functions from './components/functions/functions';
import Preview from './components/preview/preview';
import BtnDowloadPhoto from './components/btnDowloadPhoto/btnDowloadPhoto';
import { BtnClosePopupEditor } from './components/btnClosePopupEditor/btnClosePopupEditor';

import './editor.sass';


const mapStateToProps = state => ({
  isOpen: state.editor.isOpen
});

const mapDispatchToProps = dispatch => ({
  closeEditor: () => dispatch(closeEditor())
});


class Editor extends Component {
  static propTypes = {
    isOpen: propTypes.bool,
    closeEditor: propTypes.func
  }

  handleClose = e => {
    if (
      e.target.classList.contains('popupPhotoEditor') ||
      e.target.classList.contains('popupPhotoEditor__close')
    ) {
      this.props.closeEditor();
    }
  }

  render() {
    if (this.props.isOpen) {
      return (
        <div className="popupPhotoEditor" onClick={this.handleClose}>
          <div className="popupPhotoEditor__body">
            <Functions />
            <Preview addPreviewDomEl={this.addPreviewDomEl} />
            <BtnDowloadPhoto />
            <BtnClosePopupEditor closePopupEditor={this.handleClose} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);