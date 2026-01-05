import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import catalogReducer from './catalog/catalogReducer';
import { shoppingCartReducer } from './shoppingCart';
import { AnyAction } from 'redux';

const reducers = combineReducers({
  catalog: catalogReducer,
  shoppingCart: shoppingCartReducer,
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export default store;

