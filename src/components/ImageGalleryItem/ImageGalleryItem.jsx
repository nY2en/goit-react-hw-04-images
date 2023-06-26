import PropTypes from 'prop-types';
import { Li, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ data, onCardClick }) => {
  return (
    <>
      {data.map(el => (
        <Li
          key={el.id}
          onClick={() => {
            onCardClick(el.id);
          }}
        >
          <Img src={el.webformatURL} alt={el.tags} />
        </Li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGalleryItem;
