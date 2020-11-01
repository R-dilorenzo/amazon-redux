import React, { useState } from "react";
import "../CSS/LoginCSS.css";
import { Link, useHistory } from "react-router-dom";
import amazonLogo from "../img/amazon-logo.jpg";
import {
  LOGIN_USER,
  REGISTER_USER,
  selectISRegister,
} from "../features/loginSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const isRegister = useSelector(selectISRegister);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const SingIn = (event) => {
    event.preventDefault();

    if (email != "" && password != "") {
      dispatch(
            LOGIN_USER({ 
              email: email, password: password 
            }));
    } else {
      //alert("uno o più campi non sono stati inseriti");
      document.getElementById("error").classList.add("login__errorShow");
      return false;
    }
  };

  const SingInForm = (event) => {
    event.preventDefault();
    document.getElementById("error").classList.remove("login__errorShow");
    let boolSinIn = false;

    if (isRegister == true) {
      boolSinIn = true;
    }

    if (boolSinIn == true) {
      history.push("/");
      return;
    } else {
      // alert("Utente non trovato.");
      document.getElementById("error").classList.add("login__errorShow");

      return false;
    }
  };

  const Register = (event) => {
    event.preventDefault();
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let test = pattern.test(email);

    if (email != "" && password != "" && test == true && password.length >= 3) {
      dispatch(
            REGISTER_USER({ 
              email: email, password: password 
            }));
    } else {
      //alert("uno o più campi non sono stati inseriti");
      document.getElementById("error").classList.add("login__errorShow");
    }
  };

  const RegisterForm = () => {
    document.getElementById("error").classList.remove("login__errorShow");

    let boolRegister = false;

    if (isRegister == true) {
      boolRegister = true;
    }

    if (boolRegister == true) {
      history.push("/");
      return;
    } else {
      //  alert("Utente già presente.");
      document.getElementById("error").classList.add("login__errorShow");
      return;
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={amazonLogo} alt="Amazon-logo" />
      </Link>
      <div className="login__container">
        <h1>Login</h1>
        <div id="error" className="login__error ">
          Errore di autenticazione! <br />
          <p>I campi non sono stati inseriti o non sono corretti</p>
        </div>
        <div className="form">
          <h5>Email</h5>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="your@email.com"
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          ></input>
          <h5>Password</h5>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="password di almeno 3 caratteri"
          ></input>
          <button
            onMouseDown={SingIn}
            onMouseUp={SingInForm}
            className="login__signIn"
          >
            Login
          </button>
        </div>
        <br />
        <h5>Non hai un account?</h5>
        <button
          onMouseDown={Register}
          onMouseUp={RegisterForm}
          className="login__register"
        >
          Crea un account
        </button>
        <br />
      </div>
    </div>
  );
}

export default Login;
