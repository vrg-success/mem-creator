import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeTextFieldAction } from 'store/actions/editor/';
import { addCurrentTextFiled } from 'store/actions/editor/';


const mapStateToProps = state => ({
  currentTool: state.editor.currentTool
});

const mapDispatchToProps = dispatch => ({
  removeTextFieldAction: id => dispatch(removeTextFieldAction(id)),
  addCurrentTextFiled: index => dispatch(addCurrentTextFiled(index))
});


class TextField extends Component {
  static propTypes = {
    id: propTypes.number,
    top: propTypes.number,
    left: propTypes.number,
    style: propTypes.object,
    index: propTypes.number,
    subscribeDocumentMouseMove: propTypes.func,
    unSbscribeDocumentMouseMove: propTypes.func,
    documentClientY: propTypes.number,
    documentClientX: propTypes.number,
    currentTool: propTypes.string,
    removeTextFieldAction: propTypes.func,
    addCurrentTextFiled: propTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      top: this.props.top,
      left: this.props.left,
      zIndex: null
    }
    this.textField = React.createRef();
    this.isDragging = false;
    this.initMoveData;
  }

  componentDidMount() {
    this.textField.current.focus();
  }

  handleMouseDown = e => {
    this.props.subscribeDocumentMouseMove(this.props.index, this.textField)

    this.isDragging = true;

    this.initMoveData = {
      clientY: e.clientY,
      clientX: e.clientX,
      offsetY: e.currentTarget.offsetTop,
      offsetX: e.currentTarget.offsetLeft
    };
    // Add z-index for moving element
    this.setState({ zIndex: 9 });
  }

  handleMouseUp = e => {
    this.props.unSbscribeDocumentMouseMove();
    this.isDragging = false;
    this.setState({
      top: e.currentTarget.offsetTop,
      left: e.currentTarget.offsetLeft,
      zIndex: null
    });
  }

  handleBlur = (e, id) => {
    const { removeTextFieldAction, addCurrentTextFiled, index } = this.props;

    addCurrentTextFiled(index);

    if (!e.currentTarget.textContent.length) {
      removeTextFieldAction(id);
      addCurrentTextFiled(null);
    }
  }

  setPosition = (direction, documentClient) => {
    if (this.isDragging && this.props.currentTool === 'move') {
      let moveDataDirection = null;
      let initDataClientDirection = null;

      if (direction === 'top') {
        moveDataDirection = 'offsetY';
        initDataClientDirection = 'clientY';
      } else {
        moveDataDirection = 'offsetX';
        initDataClientDirection = 'clientX';
      }

      const differenceClientDirection = documentClient - this.initMoveData[initDataClientDirection];

      // Return position
      if (documentClient > this.initMoveData[moveDataDirection]) {
        return this.initMoveData[moveDataDirection] + differenceClientDirection;
      }
      else if (documentClient < this.initMoveData[moveDataDirection]) {
        return this.initMoveData[moveDataDirection] - Math.abs(differenceClientDirection);
      }
    }
    return this.state[direction];
  }

  render() {
    const { id, currentTool, style, documentClientY, documentClientX } = this.props;
    const { textBorderColor, textBorderSize, ...cutStyle } = style;

    return (
      <div
        className="textField"
        spellCheck="false"
        contentEditable={currentTool === 'text' ? true : false}
        style={{
          top: this.setPosition('top', documentClientY),
          left: this.setPosition('left', documentClientX),
          zIndex: this.state.zIndex,
          userSelect: currentTool === 'text' ? null : 'none',
          cursor: currentTool === 'text' ? 'text' : 'default',
          textShadow: `${textBorderSize}px ${textBorderSize}px 0 ${textBorderColor}, ${textBorderSize}px -${textBorderSize}px 0 ${textBorderColor}, -${textBorderSize}px ${textBorderSize}px 0 ${textBorderColor}, -${textBorderSize}px -${textBorderSize}px 0 ${textBorderColor}`,
          ...cutStyle,
        }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={e => this.handleMouseUp(e)}
        onBlur={e => this.handleBlur(e, id)}
        ref={this.textField}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextField);