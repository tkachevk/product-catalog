import {
  SET_FILTER_DATA,
  SET_ACTIVE_CATEGORY,
  APPEND_FILTER_DATA,
  SET_HAS_MORE,
  SET_LOADING,
  SET_SEARCH_QUERY,
  SET_CURRENT_PAGE,
} from './catalogTypes';
import { ProductDTO } from '../../types';

interface CatalogState {
  filterData: ProductDTO[];
  activeCategory: string;
  hasMore: boolean;
  loading: boolean;
  searchQuery: string;
  currentPage: number;
}

type CatalogAction =
  | { type: typeof SET_FILTER_DATA; payload: ProductDTO[] }
  | { type: typeof APPEND_FILTER_DATA; payload: ProductDTO[] }
  | { type: typeof SET_ACTIVE_CATEGORY; payload: string }
  | { type: typeof SET_HAS_MORE; payload: boolean }
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof SET_SEARCH_QUERY; payload: string }
  | { type: typeof SET_CURRENT_PAGE; payload: number };

const INITIAL_STATE: CatalogState = {
  filterData: [],
  activeCategory: 'default',
  hasMore: true,
  loading: false,
  searchQuery: '',
  currentPage: 1,
};

const catalogReducer = (
  state: CatalogState = INITIAL_STATE,
  action: CatalogAction
): CatalogState => {
  switch (action.type) {
    case SET_FILTER_DATA:
      return { ...state, filterData: action.payload, currentPage: 1 };
    case APPEND_FILTER_DATA:
      return { ...state, filterData: [...state.filterData, ...action.payload], currentPage: state.currentPage + 1 };
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload, currentPage: 1, searchQuery: '' };
    case SET_HAS_MORE:
      return { ...state, hasMore: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload, currentPage: 1, activeCategory: 'default' };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default catalogReducer;

