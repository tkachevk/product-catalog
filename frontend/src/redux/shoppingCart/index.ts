const SET_VISIBLE_MODAL = 'SHOPPING_CART/SET_VISIBLE_MODAL';

interface ShoppingCartState {
  isVisibleModal: boolean;
}

interface SetVisibleModalAction {
  type: typeof SET_VISIBLE_MODAL;
  payload: boolean;
}

type ShoppingCartAction = SetVisibleModalAction;

const setVisibleModal = (payload: boolean): SetVisibleModalAction => {
  return {
    type: SET_VISIBLE_MODAL,
    payload,
  };
};

const shoppingCartReducer = (
  state: ShoppingCartState = {
    isVisibleModal: false,
  },
  action: ShoppingCartAction
): ShoppingCartState => {
  switch (action.type) {
    case SET_VISIBLE_MODAL:
      return { ...state, isVisibleModal: action.payload };
    default:
      return state;
  }
};

export { SET_VISIBLE_MODAL, setVisibleModal, shoppingCartReducer };
export type { ShoppingCartState, ShoppingCartAction };
