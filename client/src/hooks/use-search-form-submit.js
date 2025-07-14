import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useSearchFormSubmit = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText) {
      let route = `/search?searchText=${searchText}`;

      if (category && category !== 'Select Category') {
        route += `&productType=${category}`;
        setCategory('');
      }

      navigate(route);
      setSearchText('');
    } else {
      navigate('/');
      setSearchText('');
      setCategory('');
    }
  };

  return {
    searchText,
    category,
    setSearchText,
    setCategory,
    handleSubmit,
  };
};

export default useSearchFormSubmit;
