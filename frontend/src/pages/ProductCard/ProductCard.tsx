import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useParams } from 'react-router-dom';
import config from '../../config';
import Container from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import classes from './ProductCard.module.scss';
import { ProductDTO } from '../../types';
import { ShoppingCartItem } from '../../types';
import { MdLocationOn } from 'react-icons/md';

const ProductCard: React.FC = () => {
  const [responseData, setResponseData] = useState<ProductDTO | null>(null);
  const [shoppingCart, setShoppingCart] =       useLocalStorage<ShoppingCartItem[]>(
        config.storage.keys.shoppingCart,
        []
      );

  const { card } = useParams<{ card: string }>();

  useEffect(() => {
        fetch(`${config.api.url}/Product/GetById?id=${card}`)
      .then((response) => response.json())
      .then((data: ProductDTO) => {
        setResponseData(data);
      });
  }, [card]);

  const existsCurrentProductInShoppingCart = (): boolean =>
    responseData ? shoppingCart.filter((p) => p.id === responseData.uuid).length > 0 : false;

  return responseData ? (
    <Container>
      <div className={classes['flex-block']}>
        <div className={classes['image-container']}>
          {responseData.images && responseData.images.length > 0 ? (
            responseData.images.map((item, index) => (
              <img key={index} className={classes['image-card']} src={item} alt="" />
            ))
          ) : (
            <div
              className={classes['image-card-placeholder']}
              style={{
                backgroundImage: `url(../logo.png)`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `center`,
                backgroundSize: `contain`,
                opacity: `50%`,
              }}
            />
          )}
        </div>
        <div className={classes['content-block']}>
          <div className={classes['product-name']}>{responseData.name}</div>
          <div className={classes['product-price']}>{responseData.price} ₽</div>
          <div className={classes['flex-block-center']}>
            <Button
              onClick={() => {
                const shoppingCartNewArray = shoppingCart.map((p) => p);

                if (!existsCurrentProductInShoppingCart()) {
                  shoppingCartNewArray.push({ id: responseData.uuid, amount: 1 });
                  setShoppingCart(shoppingCartNewArray);
                } else {
                  setShoppingCart(shoppingCartNewArray.filter((p) => p.id !== responseData.uuid));
                }
              }}
              text={existsCurrentProductInShoppingCart() ? 'Добавлен' : 'В корзину'}
              style={existsCurrentProductInShoppingCart() ? 'active' : 'default'}
            />
          </div>
          <div className={classes['product-description']}>{responseData.description}</div>
          <div className={classes['location']}>
            <MdLocationOn size={20} />
            <p className={classes['location-availability']}>Наличие в магазинах</p>
          </div>
          <div className={classes['product-availability']}>
            {responseData.availability?.map((item, index) => (
              <div key={index}>
                <span className={classes['availability-shop-name']}>{item.shop.name} </span>
                <span className={classes['availability-shop-count']}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  ) : null;
};

export { ProductCard };

