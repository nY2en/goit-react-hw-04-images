import { useState } from 'react';
import { FiCompass } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Header, Form, Input, Button } from './Searchbar.styled';

const style = { width: '20px', height: '20px' };

const Searchbar = ({ onSubmit }) => {
  const [searchQuerry, setSearchQuerry] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;

    setSearchQuerry(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    onSubmit(searchQuerry);

    reset();
  };

  const reset = () => {
    setSearchQuerry('');
  };

  return (
    <Header>
      <Form onSubmit={handleFormSubmit}>
        <Button type="submit">
          <FiCompass style={style} />
        </Button>

        <Input
          name="searchQuerry"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuerry}
          onChange={handleInputChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
