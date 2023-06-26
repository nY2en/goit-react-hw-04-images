import { InfinitySpin } from 'react-loader-spinner';
import { Span } from './Loader.styled';

const Loader = () => {
  return (
    <Span>
      <InfinitySpin width="200" color="#3b4ec3" />
    </Span>
  );
};

export default Loader;
