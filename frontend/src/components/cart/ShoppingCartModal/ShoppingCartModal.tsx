import React, { useCallback } from 'react';
import { ProductQuantityCard } from '../../ui/ProductQuantityCard/ProductQuantityCard';
import { RightModal } from '../../ui/RightModal/RightModal';
import config from '../../../config';
import styles from './ShoppingCartModal.module.scss';
import { Button } from '../../ui/Button/Button';
import { CartProduct, CartItem, ProductDTO } from '../../../types';

const getProductsByIds = async (ids: string[]): Promise<ProductDTO[]> => {
  const response = await fetch(`${config.api.url}/Product/GetByIds`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ids),
  });

  return await response.json();
};

const productMapping = (product: CartProduct): CartItem => {
  return {
    id: product.uuid,
    image: product.images.length === 0 ? '' : product.images[0] || '',
    name: product.name,
    amount: product.amount,
    price: product.price,
  };
};

interface ShoppingCartModalProps {
  onClose: () => void;
  items: CartItem[];
  itemsOnChange: (items: CartItem[]) => void;
}

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({ onClose, items, itemsOnChange }) => {
  const makeOrder = useCallback(() => {
    let url = `${config.whatsapp.url}/${config.contact.phone.value}?text=`;
    items.forEach(
      (item, index) =>
        (url += encodeURIComponent(`${index + 1}. ${item.name} - ${item.amount} шт | `))
    );

    window.open(url);
  }, [items]);

  return (
    <RightModal title="Корзина" onClose={onClose}>
      {items.length > 0 ? (
        items.map((i, index) => (
          <div key={i.id} style={index + 1 !== items.length ? { marginBottom: '15px' } : {}}>
            <ProductQuantityCard
              isQuantityChange={true}
              quantityItem={i}
              downItemHandler={item => {
                itemsOnChange(
                  items
                    .map(i => (i.id === item.id ? { ...item, amount: item.amount - 1 } : i))
                    .filter(i => i.amount > 0)
                );
              }}
              upItemHandler={item => {
                itemsOnChange(
                  items.map(i => (i.id === item.id ? { ...item, amount: item.amount + 1 } : i))
                );
              }}
              removeItemHandler={item => {
                itemsOnChange(items.filter(i => i.id !== item.id));
              }}
            />
          </div>
        ))
      ) : (
        <span className={styles['no-products']}>Товары не добавлены</span>
      )}
      {items.length > 0 && (
        <div className={styles['footer']}>
          <Button onClick={() => makeOrder()} text="Заказать"></Button>
          <div className={styles['order-price']}>
            {items.length === 0
              ? '0 '
              : `${items.reduce((acc, curr) => acc + curr.amount * curr.price, 0)} `}
            ₽
          </div>
        </div>
      )}
    </RightModal>
  );
};

export { ShoppingCartModal, getProductsByIds, productMapping };
