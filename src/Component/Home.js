import React from "react";
//importo immagini
import AmazonBanner from "../img/amazon-homeBanner.jpg";
import LOTR from "../img/lord_of_the_rings_book.jpg";
import PC from "../img/portatile.jpg";
import Iphone from "../img/iphone.jpg";
import "../CSS/HomeCSS.css";
import Product from "./Product";
import FilterRating from "./FilterRating";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { selectProdotti } from "../features/basketSlice";
import {
  selectRatingRichiesto,
  selectCategoria,
  selectMinPrezzo,
  selectMaxPrezzo,
  selectType,
  CHANGE_CATEGORIA,
  CHANGE_MIN,
  CHANGE_MAX,
  REMOVE_CATEGORIA,
} from "../features/filterSlice";

function Home() {
  const prodotti = useSelector(selectProdotti);
  const categoria = useSelector(selectCategoria);
  const ratingRichiesto = useSelector(selectRatingRichiesto);
  const minPrezzo = useSelector(selectMinPrezzo);
  const maxPrezzo = useSelector(selectMaxPrezzo);
  const type = useSelector(selectType);

  const dispatch = useDispatch();

  const changeCategoria = (event) => {
    dispatch(
      CHANGE_CATEGORIA({
        checked: event.target.checked,
        evento: event.target.value,
        id: event.target.id,
      })
    );
  };

  const removeCategoria = () => {
    dispatch(REMOVE_CATEGORIA());
  };

  const changePriceMin = (event) => {
    dispatch(
        CHANGE_MIN({ 
            value: event.target.value 
        }));
  };

  const changePriceMax = (event) => {
    dispatch(
        CHANGE_MAX({ 
            value: event.target.value 
        }));
  };

  let arrayProdotti = [];

  //restituisce un array che aggiorna la lista dei prodotti a seconda dei filtri attivi
  const renderProdotti = () => {
    let newArray = [];
    if (categoria.length == 0) {
      return (newArray = prodotti);
    } else {
      newArray = prodotti.filter((item) =>
        //controllo se la props.categoria (item.categoria) è presente nell arrary categoria
        //(=> array di stringhe di categorie(Es.categoria=["libri","informatica"] || categoria=["libri"]))
        item.categoria.some((g) => categoria.includes(g))
      );
      return newArray;
    }
  };

  //la variabile è true se tutti i valori del dictionary (type) hanno value false
  let allFalse = Object.keys(type).every(function (valItem) {
    return type[valItem] === false;
  });

  return (
    <div className="home">
      <img className="home__img" src={AmazonBanner}></img>

      {/** FILTER Categoria,Rating,Prezzo */}
      <div className="filter">
        <div className="filter__component">
          <strong className="filter__subtitle">Cerca per categoria/e:</strong>
          {allFalse ? (
            //condition true
            <div>
              <input type="checkbox" id="TUTTEt" checked={true} />
              <label className="filter__label">Tutte</label>
            </div>
          ) : (
            //condition false
            <div>
              <input
                type="checkbox"
                id="TUTTEf"
                checked={false}
                onClick={removeCategoria}
              />
              <label className="filter__label">Tutte</label>
            </div>
          )}
          <div>
            <input
              type="checkbox"
              id="Libri"
              value="Libri"
              checked={type.Libri}
              onChange={changeCategoria}
            />
            <label className="filter__label">Libri</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Informatica"
              value="Informatica"
              checked={type.Informatica}
              onChange={changeCategoria}
            />
            <label className="filter__label">Informatica</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="DVD"
              value="DVD"
              checked={type.DVD}
              onChange={changeCategoria}
            />
            <label className="filter__label">DVD</label>
          </div>
          <hr></hr>
          <strong className="filter__subtitle">Cerca per Rating:</strong>
          {/**
           * Component per cercare gli item in base al rating
           * creo un nuovo component passandogli come props il numero di star da mostrare
           * in modo che posso passare al dispatcher il numero in base alle props e
           * chiamando evento "CHANGE_RATING" posso modificare tramite il reducer la variabile
           * globale ratingRichiesto che utilizzo in questo component per  il rendering degli item
           */}
          {ratingRichiesto > 1 ? (
            //condition true
            <strong>
              Filtro impostato per {ratingRichiesto}
              <StarIcon className="filter__iconSearch"></StarIcon> o più
            </strong>
          ) : (
            //condition false
            <div> </div>
          )}
          <br />
          <FilterRating number={5} />
          <FilterRating number={4} />
          <FilterRating number={3} />
          <FilterRating number={2} />
          <FilterRating number={1} />
          <hr></hr>
          <strong className="filter__subtitle">Cerca per Prezzo:</strong>
          <div className="filter__priceF">
            <div className="tr">
              <div className="td">
                <label style={{ fontWeight: "600" }}>Min.</label>
              </div>
              <div className="td">
                <input
                  type="text"
                  id="MinPrice"
                  className="filter__inputPrice"
                  placeholder={minPrezzo}
                  onChange={changePriceMin}
                  onKeyDown={(evt) =>
                    !(
                      (evt.key >= "0" && evt.key <= "9") ||
                      evt.key === "." ||
                      evt.keyCode === 8
                    ) && evt.preventDefault()
                  }
                />
              </div>
            </div>
            <div className="tr">
              <div className="td">
                <label style={{ fontWeight: "600" }}>Max.</label>
              </div>
              <div className="td">
                {maxPrezzo != 10000000.0 ? (
                  <input
                    type="text"
                    id="MaxPrice"
                    className="filter__inputPrice"
                    placeholder={maxPrezzo}
                    onChange={changePriceMax}
                    /**previene inserimento !numeri o .  */
                    onKeyDown={(evt) =>
                      !(
                        (evt.key >= "0" && evt.key <= "9") ||
                        evt.key === "." ||
                        evt.keyCode === 8
                      ) && evt.preventDefault()
                    }
                  />
                ) : (
                  <input
                    type="text"
                    id="MaxPrice"
                    className="filter__inputPrice"
                    placeholder="inserisci prezzo massimo"
                    onChange={changePriceMax}
                    /**previene inserimento !numeri o .  */
                    onKeyDown={(evt) =>
                      !(
                        (evt.key >= "0" && evt.key <= "9") ||
                        evt.key === "." ||
                        evt.keyCode === 8
                      ) && evt.preventDefault()
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/**BODY PRODOTTI */}
        <div className="home__grid">
          <div className="row">
            {
              (arrayProdotti = renderProdotti()
                .filter(
                  (filterRatings) =>
                    //controllo sul rating
                    filterRatings.rating >= ratingRichiesto
                )
                //controllo sul prezzo
                .filter(
                  (filterPrezzo) =>
                    filterPrezzo.price >= minPrezzo &&
                    filterPrezzo.price <= maxPrezzo
                )
                .map((item) => (
                  <div className="filter__product">
                    {/** oggetto Product(id, titolo, prezzo, stelle, img) */}
                    <Product
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      categoria={item.categoria}
                    />
                  </div>
                )))
            }
          </div>
        </div>
      </div>

      {/** FINE DIV COMPONENT  =>*/}
    </div>
  );
}

export default Home;
