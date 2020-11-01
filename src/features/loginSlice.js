import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: [],
    isRegister: false,
  },
  reducers: {
    LOGIN_USER: (state, action) => {
        let bool=false;
        const login_to_check =[action.payload.email,action.payload.password];
        
        let item_as_string = JSON.stringify(login_to_check);

        let contains = state.user.some((ele) => {
            return JSON.stringify(ele) === item_as_string;
        });
        console.log("CONTAINS => ",contains);
        if(contains==true){
            bool=true;
        }else {
            bool=false;
        }
        state.isRegister = bool;
    },
    REGISTER_USER: (state, action) => {
      let boolR = false;

      const register_to_check = [];
      register_to_check.push(action.payload.email);
      register_to_check.push(action.payload.password);

      let item_string = JSON.stringify(register_to_check);
      if (state.user.length == 0) {
        boolR = true;
        state.user = [...state.user, register_to_check];
        state.isRegister = boolR;
      } else {
        let contain = state.user.some((elem) => {
          return JSON.stringify(elem) === item_string;
        });
        //if contain false => elemento non presente
        if (!contain) {
          boolR = true;
          state.user = [...state.user, register_to_check];
          state.isRegister = boolR;
        } else {
          boolR = false;
          state.isRegister = boolR;
        }
      }
    },
    LOGOUT_USER: state => {
        const boolL=false;
        state.isRegister = boolL;
    },
  },
});

export const { LOGIN_USER, REGISTER_USER, LOGOUT_USER } = loginSlice.actions;

export const selectISRegister = (state) => state.login.isRegister;

export default loginSlice.reducer;
