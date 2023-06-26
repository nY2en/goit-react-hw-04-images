import React, { Component } from 'react';
import Notiflix from 'notiflix';

import * as api from '../services/api';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

export class App extends Component {
  state = {
    query: '',
    data: [],
    status: 'idle',
    page: 1,
    id: 0,
    isOpen: false,
    limitOfCollection: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query) {
      this.setState({
        data: [],
        status: 'idle',
        limitOfCollection: false,
      });
    }

    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ status: 'pending' });

      try {
        api.getPictures(query, page).then(pictures => {
          if (pictures.hits.length === 0 && page !== 1) {
            this.setState({
              status: 'resolved',
              limitOfCollection: true,
            });

            Notiflix.Notify.warning('limit of the collection');

            return;
          }

          if (pictures.hits.length === 0 && page === 1) {
            this.setState({ status: 'idle', query });

            Notiflix.Notify.failure('There is nothing been found');

            Promise.reject(new Error('There is nothing been found'));

            return;
          }

          if (pictures.hits.length < 12) {
            this.setState({ limitOfCollection: true });
          }

          this.setState(prevState => ({
            data: [...prevState.data, ...pictures.hits],
            status: 'resolved',
          }));

          Notiflix.Notify.success('WE FOUND PICS');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  submitDataForm = query => {
    this.setState({ query, page: 1 });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleCardClick = cardId => {
    this.setState({
      id: cardId,
    });

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  findBigPic = data => data.filter(({ id }) => id === this.state.id);

  createMarkupBigPic = data =>
    data.map(({ id, largeImageURL, tags }) => (
      <img key={id} src={largeImageURL} alt={tags} />
    ));

  render() {
    const { data, status, isOpen, limitOfCollection } = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.submitDataForm} />;
    }

    if (status === 'resolved' || 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.submitDataForm} />
          <ImageGallery>
            <ImageGalleryItem data={data} onCardClick={this.handleCardClick} />
          </ImageGallery>
          {status === 'pending' && <Loader />}
          {status === 'resolved' && limitOfCollection === false && (
            <Button onBtnClick={this.handleBtnClick} />
          )}

          {isOpen && (
            <Modal toggle={this.toggleModal}>
              {this.createMarkupBigPic(this.findBigPic(data))}
            </Modal>
          )}
        </>
      );
    }
  }
}
