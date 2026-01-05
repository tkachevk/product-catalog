import * as React from 'react';
import Header from '../Header/Header';
import { ShoppingCart } from '../../cart/ShoppingCart/ShoppingCart';
import Footer from '../Footer/Footer';
import classes from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Header />
      <ShoppingCart />
      <main className={classes.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { Layout };

