import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pushMessage, ERROR_TYPE } from '../core/api';
import './CommentView.css';

function sendMessage(studentId, message, callback) {
  return pushMessage(studentId, message)
    .then(response => {
      if (response.type === ERROR_TYPE) {
        alert(response.message);
      } else {
        callback();
      }
    })
}

class CommentView extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: '' };
  }

  onTextInput(event) {
    const { value } = event.target;
    this.setState({ comment: value })
  }

  sendComment() {
    const { freshman, callback } = this.props;
    const { comment } = this.state;
    if (comment.length === 0) return;
    return sendMessage(freshman.id, comment, callback);
  }

  render() {
    const { freshman, callback } = this.props;
    const { comment } = this.state;
    const cantSubmit = comment.length === 0;

    return (
      <div className="CommentView">
        <h3>{freshman.name} {freshman.isTutor && '- Tuutori'}</h3>
        <textarea
          onChange={ (event) => this.onTextInput(event) }
        />
        <button className={cantSubmit ? 'Button--disabled' : ''} onClick={ () => this.sendComment() }>
          Lähetä kroniikka
        </button>
        <button onClick={ () => callback() }>
          Palaa ryhmiin
        </button>
      </div>
    );
  }
}

CommentView.propTypes = {
  freshman: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
}

export default CommentView;