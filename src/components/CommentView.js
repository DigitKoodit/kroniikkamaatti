import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pushMessage, ERROR_TYPE } from '../core/api';
import './CommentView.css';

function sendMessage(studentId, message, callback) {
  console.log(studentId, message);
  return pushMessage(studentId, message)
    .then(response => {
      console.log(response);
      if (response.type === ERROR_TYPE) {
        alert(response.message);
      } else {
        console.log(response);
        callback();
      }
    })
}

class CommentView extends Component {
  onTextInput(event) {
    const { value } = event.target;
    this.setState({ comment: value })
  }

  sendComment() {
    const { freshman, callback } = this.props;
    const { comment } = this.state;
    return sendMessage(freshman.id, comment, callback);
  }

  render() {
    const { freshman, callback } = this.props;

    return (
      <div className="CommentView">
        <h3>{freshman.name} {freshman.isTutor && '- Tuutori'}</h3>
        <textarea
          onChange={ (event) => this.onTextInput(event) }
        />
        <button onClick={ () => this.sendComment() }>
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