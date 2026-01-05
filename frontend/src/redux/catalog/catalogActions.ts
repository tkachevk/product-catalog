import {
  SET_FILTER_DATA,
  SET_ACTIVE_CATEGORY,
  APPEND_FILTER_DATA,
  SET_HAS_MORE,
  SET_LOADING,
  SET_SEARCH_QUERY,
  SET_CURRENT_PAGE,
} from './catalogTypes';
import config from '../../config';
import { ProductDTO } from '../../types';
import { AppDispatch } from '../store';

export const setFilterData = (payload: ProductDTO[]) => {
  return {
    type: SET_FILTER_DATA,
    payload,
  };
};

export const appendFilterData = (payload: ProductDTO[]) => {
  return {
    type: APPEND_FILTER_DATA,
    payload,
  };
};

export const setActiveCategory = (payload: string) => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload,
  };
};

export const setHasMore = (payload: boolean) => {
  return {
    type: SET_HAS_MORE,
    payload,
  };
};

export const setLoading = (payload: boolean) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const setSearchQuery = (payload: string) => {
  return {
    type: SET_SEARCH_QUERY,
    payload,
  };
};

export const setCurrentPage = (payload: number) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const fetchProductsList = (page: number = 1, searchQuery: string = '', category: string = '') => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    let url: string;
    if (searchQuery) {
        url = `${config.api.url}/Product/Search?query=${encodeURIComponent(searchQuery)}&page=${page}&pageSize=16`;
      } else if (category && category !== 'default') {
        url = `${config.api.url}/Product/GetByCategory?category=${encodeURIComponent(category)}&page=${page}&pageSize=16`;
      } else {
        url = `${config.api.url}/Product/GetList?page=${page}&pageSize=16`;
    }
    
    const data: ProductDTO[] = await fetch(url).then(
      (response) => response.json()
    );
    
    if (page === 1) {
      dispatch(setFilterData(data));
      dispatch(setCurrentPage(1));
    } else {
      dispatch(appendFilterData(data));
    }
    
    dispatch(setHasMore(data.length === 16));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error('Error fetching data:', error);
  }
};

export const searchProducts = (query: string) => async (dispatch: AppDispatch) => {
  dispatch(setSearchQuery(query));
  dispatch(fetchProductsList(1, query));
};

