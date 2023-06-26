import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

const Button = ({ onBtnClick }) => {
  return (
    <Btn onClick={onBtnClick} type="button">
      Load more
    </Btn>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};

export default Button;
