import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    ratingRichiesto:0,
    categoria:[],
    ratingRichiesto:0,
    minPrezzo:0.00,
    maxPrezzo:10000000.00,
    type: {
        Libri: false,
        Informatica: false,
        DVD: false
    },
  },
  reducers: {
    CHANGE_RATING: (state, action) => {
        const newRating=action.payload.number;
        state.ratingRichiesto = newRating;     
    },
    CHANGE_CATEGORIA: (state, action) => {
        if(action.payload.checked){
            state.categoria = [...state.categoria,action.payload.evento];
            state.type = {
                ...state.type, 
                [action.payload.id]: !state.type[action.payload.id]
            };
        }else{
           // Rimuovo item: utilizzo un nuovo array che è mappato con array
           // "categoria" escludendo action.evento("action.evento"=>valore checkbox)
           var filteredAry = state.categoria.filter(function(e) { return e !== action.payload.evento })
            state.categoria=filteredAry;
            state.type = {
                ...state.type,
                [action.payload.id]: !state.type[action.payload.id]
            };
        }
    },
    REMOVE_CATEGORIA: state => {
        state.categoria=[];
        state.type = {
            Libri: false,
            Informatica: false,
            DVD: false
        };
    },
    CHANGE_MIN: (state, action) => {
        const newMin=action.payload.value;
        state.minPrezzo = newMin;
    },
    CHANGE_MAX: (state, action) => {
        let newMax=action.payload.value;
        if(newMax == 0){
            newMax=10000000.00
        }
        state.maxPrezzo=newMax;
    },
  }
});

export const { CHANGE_RATING, CHANGE_CATEGORIA, REMOVE_CATEGORIA, CHANGE_MIN, CHANGE_MAX } = filterSlice.actions;

export const selectRatingRichiesto = (state) => state.filter.ratingRichiesto;
export const selectCategoria = (state) => state.filter.categoria;
export const selectMinPrezzo = (state) => state.filter.minPrezzo;
export const selectMaxPrezzo = (state) => state.filter.maxPrezzo;
export const selectType = (state) => state.filter.type;




export default filterSlice.reducer;
