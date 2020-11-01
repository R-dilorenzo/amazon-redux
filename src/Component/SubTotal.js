import React from "react";
import "../CSS/SubTotalCSS.css";
import { selectBasket } from "../features/basketSlice";
import { useSelector } from "react-redux";

function SubTotal() {
  const basket = useSelector(selectBasket);
  //let getBasketTotal = useSelector(selectGetBasketTotal);

  return (
    <div className="subTotal">
      {/* Prezzo */}
      Riepilogo:
      <span>
        n. articoli:<strong>{basket?.length}</strong>
      </span>
      <span>
        Prezzo:<small>$</small>
        <strong>
          {parseFloat(
            basket?.reduce((amount, item) => item.price + amount, 0)
          ).toFixed(2)}
        </strong>
      </span>
      <button>Procedi al pagamento</button>
    </div>
  );
}

export default SubTotal;
