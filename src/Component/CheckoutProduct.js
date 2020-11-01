import React from "react";
import "../CSS/CheckoutProductCSS.css";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { 
    REMOVE_FROM_BASKET, 
    selectBasket 
} from "../features/basketSlice";

function CheckoutProduct({ id, title, image, price, rating }) {
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();

  const removeFromBasket = () => {
    dispatch(
      REMOVE_FROM_BASKET({
        id: id,
      })
    );
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt={title}></img>

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {
            /**  prende il valore dato attraverso il binding (_) e ripete tante volte il valore di <p>*/
            Array(rating)
              .fill()
              .map((_) => (
                <p>
                  {" "}
                  <StarIcon className="icon"></StarIcon>{" "}
                </p>
              ))
          }
        </div>

        <button onClick={removeFromBasket}>Rimuovi dal Carrello</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
