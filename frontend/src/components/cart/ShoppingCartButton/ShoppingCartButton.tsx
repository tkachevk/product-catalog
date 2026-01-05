import React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import styles from './ShoppingCartButton.module.scss';
import { FaShoppingCart } from 'react-icons/fa';

interface IProps {
  onClick: () => void;
}

const ShoppingCartButton: React.FC<IProps> = ({ onClick }) => {
  const [shoppingCart] = useLocalStorage('shoppingCart', []);

  return (
    <div className={styles['cart-button']} onClick={onClick}>
      <FaShoppingCart className={styles['cart-button__icon']} size={50} />
      {shoppingCart.length >= 1 && (
        <div className={styles['styled-num']}>
          {shoppingCart.reduce((acc, curr: any) => acc + curr.amount, 0)}
        </div>
      )}
    </div>
  );
};

export { ShoppingCartButton };
