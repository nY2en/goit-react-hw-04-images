import PropTypes from 'prop-types';
import { Li, Img } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';
import { useState } from 'react';

const ImageGalleryItem = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <Li>
      <div onClick={toggle}>
        <Img src={data.webformatURL} alt={data.tags} />
      </div>

      {isModalOpen && (
        <Modal toggle={toggle}>
          <img src={data.largeImageURL} alt={data.tags} />
        </Modal>
      )}
    </Li>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
