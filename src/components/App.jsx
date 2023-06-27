import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import * as api from '../services/api';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(0);
  const [limitOfCollection, setLimitOfCollection] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    try {
      api.getPictures(query, page).then(pictures => {
        if (pictures.hits.length === 0 && page === 1) {
          setStatus('idle');

          Notiflix.Notify.failure('There is nothing been found');

          Promise.reject(new Error('There is nothing been found'));

          return;
        }

        setData(prevData => [...prevData, ...pictures.hits]);

        if (pictures.hits.length < 12) {
          setStatus('resolved');

          setLimitOfCollection(true);

          Notiflix.Notify.warning('limit of the collection');

          return;
        }

        setStatus('resolved');

        Notiflix.Notify.success('WE FOUND PICS');
      });
    } catch (error) {
      setError(true);
    }
  }, [page, query]);

  useEffect(() => {
    if (!query) {
      return;
    }

    setData([]);
    setStatus('idle');
    setPage(1);
    setLimitOfCollection(false);
  }, [query]);

  const submitDataForm = query => {
    setQuery(query);
    setPage(1);
  };

  const handleBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'idle') {
    return <Searchbar onSubmit={submitDataForm} />;
  }

  if (status === 'resolved' || 'pending') {
    return (
      <>
        {error ? (
          Notiflix.Notify.failure('There is nothing been found')
        ) : (
          <>
            <Searchbar onSubmit={submitDataForm} />
            <ImageGallery data={data}></ImageGallery>
            {status === 'pending' && <Loader />}
            {status === 'resolved' && limitOfCollection === false && (
              <Button onBtnClick={handleBtnClick} />
            )}
          </>
        )}
      </>
    );
  }
};

export default App;
