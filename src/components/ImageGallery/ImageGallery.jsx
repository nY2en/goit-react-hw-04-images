import PropTypes from 'prop-types';

import { Ul } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ data }) => {
  return (
    <Ul>
      {data.map(el => (
        <ImageGalleryItem key={el.id} data={el} />
      ))}
    </Ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
