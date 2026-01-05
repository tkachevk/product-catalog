import * as React from 'react';
import { Layout } from './components/layout/Layout/Layout';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProductCard } from './pages/ProductCard/ProductCard';
import CatalogPage from './pages/CatalogPage/CatalogPage';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={CatalogPage} />
          <Route path="/:card" exact component={ProductCard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

