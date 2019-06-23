import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTool } from 'store/actions/editor';
import propTypes from 'prop-types';

const mapStateToProps = state => ({
  currentTool: state.editor.currentTool,
  textFields: state.editor.textFields.slice()
});

const mapDispatchToProps = dispatch => ({
  changeTool: typeTool => dispatch(changeTool(typeTool))
});


class Tools extends Component {
  static propTypes = {
    currentTool: propTypes.string,
    textFields: propTypes.array,
    changeTool: propTypes.func
  }

  handleChangeTool(typeTool) {
    const { currentTool, textFields, changeTool } = this.props;

    if (typeTool !== currentTool && textFields.length) {
      changeTool(typeTool);
    }
  }

  render() {
    const { currentTool } = this.props;

    return (
      <div className="tools">
        <span className="label">Инструменты</span>
        <ul className="tools__items">
          <li className="tool">
            <button
              className={currentTool === 'move' ? 'tool__active' : null}
              onClick={() => this.handleChangeTool('move')}
              title="Инструмент перемещение"
            >
              <img src="img/icons/move.svg" alt="move" />
            </button>
          </li>
          <li className="tool">
            <button
              className={currentTool === 'text' ? 'tool__active' : null}
              onClick={() => this.handleChangeTool('text')}
              title="Инструмент текст"
            >
              <img src="img/icons/text.svg" alt="text" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tools);