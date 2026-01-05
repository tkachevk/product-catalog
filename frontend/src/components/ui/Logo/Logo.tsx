import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveCategory, fetchProductsList } from '../../../redux/catalog/catalogActions';
import { AppDispatch } from '../../../redux/store';

const Logo = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setActiveCategory('default'));
    dispatch(fetchProductsList(1, '', ''));
    history.push('/');
    window.scrollTo(0, 0);
  };

  return (
    <a href="/" onClick={handleLogoClick} style={{ textDecoration: 'none' }}>
      <img src="../logo.png" alt="logo" style={{ height: '100px' }} />
    </a>
  );
};

export { Logo };
