import React, { Component } from 'react';
import { FiCompass } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Header, Form, Input, Button } from './Searchbar.styled';

const style = { width: '20px', height: '20px' };

class Searchbar extends Component {
  state = {
    searchQuerry: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchQuerry);

    this.reset();
  };

  reset = () => {
    this.setState({ searchQuerry: '' });
  };

  render() {
    const { searchQuerry } = this.state;

    return (
      <Header>
        <Form onSubmit={this.handleFormSubmit}>
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
            onChange={this.handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
