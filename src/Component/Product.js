import React from "react";
import "../CSS/ProductCSS.css";
import StarIcon from "@material-ui/icons/Star";
import { 
    selectBasket, 
    ADD_TO_BASKET 
} from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";

{/** oggetto Product che ha props(id, titolo, prezzo, stelle, img) */}
function Product({ id, title, image, price, rating, categoria }) {
  const basket = useSelector(selectBasket);

  const dispatch = useDispatch();

  const addToBasket = () => {
    //aggiungo item al carrello
    dispatch(
      ADD_TO_BASKET({
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
          categoria: categoria,
        },
      })
    );
  };

  return (
    <div className="product">
      <strong className="product__title">{title}</strong>
      <p className="product__price">
        <small>$</small>
        <strong>{price}</strong>
      </p>
      <div className="product__rating">
        {Array(rating)
          .fill()
          .map((_) => (
            <p>
              {" "}
              <StarIcon className="icon"></StarIcon>{" "}
            </p>
          ))}
      </div>
      <img src={image} alt={title}></img>
      <button onClick={addToBasket}>Aggiungi al Carrello</button>
    </div>
  );
}

export default Product;
