import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getPictures = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=35659407-8f84b6661cf33c90047b65b03&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
