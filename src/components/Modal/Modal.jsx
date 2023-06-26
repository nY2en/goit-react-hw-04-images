import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, Window } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPush);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPush);
  }

  onEscPush = e => {
    if (e.code === 'Escape') {
      this.props.toggle();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggle();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <Window>{this.props.children}</Window>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Modal;
