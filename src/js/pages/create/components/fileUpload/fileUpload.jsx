import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { openEditor } from 'store/actions/editor/';

import './fileUpload.sass';


const mapDispatchToProps = dispatch => ({
  openEditor: imageUrl => dispatch(openEditor(imageUrl))
});

class FileUpload extends Component {
  static propTypes = {
    openEditor: propTypes.func
  };

  state = {
    fileName: 'Или загрузите своё'
  };

  handleChange = e => {
    let typeFile = e.target.files[0].type.split('/');

    if (typeFile[0] !== 'image') {
      this.setState({
        fileName: 'Файл не соответсвует формату изображений!'
      });
      return;
    }

    const FR = new FileReader();
    FR.readAsDataURL(e.target.files[0]);

    FR.addEventListener('load', e => {
      this.props.openEditor(e.target.result);
    });
  }

  render() {
    return (
      <div className="fileUpload">
        <input type="file" id="uploader" className="hidden" onChange={this.handleChange} />
        <label htmlFor="uploader">
          <span className="fileUpload__name">{this.state.fileName}</span>
          <span className="fileUpload__btn">Выбрать</span>
        </label>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FileUpload);