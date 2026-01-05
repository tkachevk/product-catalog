import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../ui/ProductCard/ProductCard';
import Container from '../../ui/Container/Container';
import classes from './ProductList.module.scss';
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchProductsList } from '../../../redux/catalog/catalogActions';
import { ProductDTO } from '../../../types';

const ProductList: React.FC = () => {
  const { filterData, hasMore, loading, searchQuery, currentPage, activeCategory } = useSelector(
    (state: RootState) => state.catalog
  );
  const dispatch = useDispatch<AppDispatch>();
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  // Загружаем список товаров при монтировании компонента или изменении searchQuery/activeCategory
  React.useEffect(() => {
    const category = activeCategory && activeCategory !== 'default' ? activeCategory : '';
    dispatch(fetchProductsList(1, searchQuery, category));
  }, [dispatch, searchQuery, activeCategory]);

  React.useEffect(() => {
    // Не создаем observer если данных нет, идет загрузка, или нет больше данных
    if (!loadMoreRef.current || loading || !hasMore || filterData.length === 0) {
      return;
    }

    // Удаляем старый observer
    if (observerRef.current && loadMoreRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading && filterData.length > 0) {
          const nextPage = currentPage + 1;
          const category = activeCategory && activeCategory !== 'default' ? activeCategory : '';
          dispatch(fetchProductsList(nextPage, searchQuery, category));
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, currentPage, searchQuery, activeCategory, dispatch, filterData.length]);

  return (
    <div className={classes['product-list']}>
      <Container>
        <div className={classes['product-list-wrapper']}>
          {filterData && filterData.length > 0 &&
            filterData.map((item: ProductDTO, index: number) => (
              <ProductCard data={item} key={`${item.uuid}-${index}`} id={index} />
            ))}
        </div>
        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div>}
        {hasMore && filterData.length > 0 && (
          <div ref={loadMoreRef} style={{ height: '20px' }} />
        )}
      </Container>
    </div>
  );
};

export default ProductList;

