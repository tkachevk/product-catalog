import * as React from 'react';
import classes from './CategoryMenu.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../ui/Container/Container';
import { NavLink, useHistory } from 'react-router-dom';
import { setActiveCategory, fetchProductsList } from '../../../redux/catalog/catalogActions';
import { RootState, AppDispatch } from '../../../redux/store';
import config from '../../../config';

const CategoryMenu: React.FC = () => {
  const { activeCategory } = useSelector((state: RootState) => state.catalog);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const onClickActiveCategory = (category: string, e: React.MouseEvent) => {
    if (activeCategory === category) {
      e.preventDefault();
      return;
    }
    history.push('/');
    dispatch(setActiveCategory(category));
    dispatch(fetchProductsList(1, '', category));
  };

  const categories = config.categories || [];

  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.categoriesWrapper}>
          {categories.map((category, index) => {
            return (
              <NavLink
                to="/"
                onClick={(e) => onClickActiveCategory(category.name, e)}
                className={`${classes.categoriesItem} ${
                  activeCategory === category.name ? classes.active : ''
                }`}
                data-category-name={category.name}
                key={index}
              >
                <p className={classes.categoriesItemName}>{category.name}</p>
              </NavLink>
            );
          })}
        </div>
      </Container>
    </header>
  );
};

export default CategoryMenu;
