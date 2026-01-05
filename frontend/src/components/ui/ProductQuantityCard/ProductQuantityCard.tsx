import React from 'react';
import styles from './ProductQuantityCard.module.scss';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';

interface IProps {
  quantityItem: any;
  downItemHandler?: (item: any) => void;
  upItemHandler?: (item: any) => void;
  removeItemHandler: (item: any) => void;
  isQuantityChange: boolean;
}

const ProductQuantityCard: React.FC<IProps> = ({
  quantityItem,
  downItemHandler,
  upItemHandler,
  removeItemHandler,
  isQuantityChange = false,
}) => {
  return (
    <div className={styles['product-quantity__item']}>
      <div className={styles['image']}>
        <img src={quantityItem.image} alt="Картинка товара" />
      </div>
      <div className={styles['name-and-amount']}>
        <div className={styles['name']}>
          <span>{quantityItem.name}</span>
        </div>
        {isQuantityChange && (
          <div className={styles['amount']}>
            <div
              onClick={() => {
                if (downItemHandler) downItemHandler(quantityItem);
              }}
              className={`${styles['down-btn']} ${styles['change-amount-btn']}`}
            >
              <FaMinus size={15} />
            </div>
            <div className={styles['value']}>
              <span>{quantityItem.amount}</span>
            </div>
            <div
              onClick={() => {
                if (upItemHandler) upItemHandler(quantityItem);
              }}
              className={`${styles['up-btn']} ${styles['change-amount-btn']}`}
            >
              <FaPlus size={15} />
            </div>
          </div>
        )}
      </div>
      {isQuantityChange && (
        <div className={styles['total-cost']}>
          <span>{quantityItem.price * quantityItem.amount} ₽</span>
        </div>
      )}
      <div onClick={() => removeItemHandler(quantityItem)} className={styles['remove-btn-wrapper']}>
        <div className={styles['btn']}>
          <FaTimes size={20} />
        </div>
      </div>
    </div>
  );
};

export { ProductQuantityCard };
