import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibleModal } from '../../../redux/shoppingCart';
import { ShoppingCartButton } from '../ShoppingCartButton/ShoppingCartButton';
import {
  ShoppingCartModal,
  getProductsByIds,
  productMapping,
} from '../ShoppingCartModal/ShoppingCartModal';
import config from '../../../config';
import { useLocalStorage } from 'usehooks-ts';
import { ShoppingCartItem, CartItem } from '../../../types';
import { RootState } from '../../../redux/store';

const ShoppingCart = () => {
  const isVisible = useSelector((state: RootState) => state.shoppingCart.isVisibleModal);
  const dispatch = useDispatch();
  const [shoppingCart, setShoppingCart] =       useLocalStorage<ShoppingCartItem[]>(
        config.storage.keys.shoppingCart,
        []
      );
  const [items, setItems] = useState<CartItem[]>([]);
  const prevIdsRef = useRef<string>('');

  useEffect(() => {
    // Запрашиваем товары только когда модалка открыта
    if (!isVisible) {
      return;
    }

    const productIds = shoppingCart.map((p) => p.id);
    const idsString = productIds.join(',');

    // Пропускаем, если ID не изменились
    if (prevIdsRef.current === idsString && items.length > 0) {
      // Обновляем количество из shoppingCart, если оно изменилось
      setItems(prevItems => 
        prevItems.map(item => {
          const cartItem = shoppingCart.find((itm) => itm.id === item.id);
          return cartItem ? { ...item, amount: cartItem.amount } : item;
        })
      );
      return;
    }

    prevIdsRef.current = idsString;

    if (productIds.length === 0) {
      setItems([]);
      return;
    }

    getProductsByIds(productIds).then(data =>
      setItems(
        data.map(v => {
          const cartItem = shoppingCart.find((itm) => itm.id === v.uuid);
          return productMapping({
            ...v,
            amount: cartItem?.amount || 0,
          });
        })
      )
    );
  }, [shoppingCart, isVisible, items.length]);

  return isVisible ? (
    <ShoppingCartModal
      onClose={() => dispatch(setVisibleModal(false))}
      itemsOnChange={(updatedItems) => {
        // Обновляем и localStorage, и локальное состояние items
        const newShoppingCart = updatedItems.map(item => ({ id: item.id, amount: item.amount }));
        setShoppingCart(newShoppingCart);
        setItems(updatedItems);
      }}
      items={items}
    />
  ) : (
    <ShoppingCartButton onClick={() => dispatch(setVisibleModal(true))} />
  );
};

export { ShoppingCart };
