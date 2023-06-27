import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, Window } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ toggle, children }) => {
  useEffect(() => {
    const onEscPush = e => {
      if (e.code === 'Escape') {
        toggle();
      }
    };

    window.addEventListener('keydown', onEscPush);

    return () => {
      window.removeEventListener('keydown', onEscPush);
    };
  }, [toggle]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Window>{children}</Window>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Modal;
