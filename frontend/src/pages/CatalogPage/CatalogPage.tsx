import ProductList from '../../components/catalog/ProductList/ProductList';
import CategoryMenu from '../../components/catalog/CategoryMenu/CategoryMenu';
import * as React from 'react';

const CatalogPage: React.FC = () => {
  return (
    <>
      <CategoryMenu />
      <ProductList />
    </>
  );
};

export default CatalogPage;

