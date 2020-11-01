import React from "react";
import "../CSS/CheckoutCSS.css";
import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "./SubTotal";
import Banner from "../img/banner-amazon.jpg";
import { useSelector } from "react-redux";
import { selectBasket } from "../features/basketSlice";

function Checkout() {
  const basket = useSelector(selectBasket);

  return (
    <div className="checkout">
      <div className="checkout__left">
        {/**banner top */}
        <img className="checkout__ad" src={Banner}></img>
        {/**Se il carrello è vuoto mostra */}
        {basket?.length === 0 ? (
          <div>
            <h2>Il tuo carrello è vuoto</h2>
            <p>
              Non hai elementi nel carrello.Puoi aggiunguere un elemento
              cliccando il bottone aggiungi al carrello.
            </p>
          </div>
        ) : (
          //altrimenti
          <div>
            <h2>Carrello:</h2>
            {/**Lista di tutti i prodotti presenti nel carrello */}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        )}
      </div>
      <div className="checkout__right">
        <SubTotal></SubTotal>
      </div>
    </div>
  );
}

export default Checkout;
