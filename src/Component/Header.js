import React from "react";
import amazonLogo from "../img/amazon-logo.jpg";
//importo il file css
import "../CSS/HeaderCSS.css";
//importo link per il logo che deve ritornare alla homepage
import { Link, useHistory } from "react-router-dom";
//import per icona serch attraverso la libreria MaterialUI
import SearchIcon from "@material-ui/icons/Search";
//import per icona carrello attraverso la libreria MaterialUI
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
//per autocomplete
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectBasket, 
    selectProdotti 
} from "../features/basketSlice";
import { 
    selectISRegister, 
    LOGOUT_USER 
} from "../features/loginSlice";

function Header() {
  const basket = useSelector(selectBasket);
  const prodotti = useSelector(selectProdotti);
  const isRegister = useSelector(selectISRegister);

  let history = useHistory();

  const dispatch = useDispatch();

  const logInOut = () => {
    if (isRegister) {
      dispatch(LOGOUT_USER());
      history.push("/");
    }
  };
  return (
    <nav className="header">
      {/**logo */}
      <Link to="/">
        <img className="header__logo" src={amazonLogo} alt=""></img>
      </Link>
      {/**search box */}
      <div className="header__search">
        <Autocomplete
          id="autoComplete"
          className="header__searchInput"
          options={prodotti.map((option) => option.title)}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                className="header__searchInput2"
                type="text"
                {...params.inputProps}
                placeholder="Cerca un prodotto..."
              />
            </div>
          )}
        />
        <SearchIcon className="header__searchIcon"></SearchIcon>
      </div>
      {/**link */}
      <div className="header__nav">
        <Link to={!isRegister && "/login"} className="header__link">
          <div onClick={logInOut} className="header__navOption">
            <span className="navOption1">Hello</span>
            <span className="navOption2">
              {isRegister ? "Log Out" : "Login In"}
            </span>
          </div>
        </Link>

        <Link to="/" className="header__link">
          <div className="header__navOption">
            <span className="navOption1">Resi</span>
            <span className="navOption2">e ordini</span>
          </div>
        </Link>

        <Link to="/" className="header__link">
          <div className="header__navOption">
            <span className="navOption1">Iscriviti A</span>
            <span className="navOption2">Prime</span>
          </div>
        </Link>
        {/**carrello */}
        <Link to="/checkout" className="header__link">
          <div className="header__carrello">
            <ShoppingBasketIcon className="iconaCarrello"></ShoppingBasketIcon>
            <span className="itemCarrello">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
