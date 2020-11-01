import { createSlice } from "@reduxjs/toolkit";
import LOTR from '../img/lord_of_the_rings_book.jpg';
import PC from '../img/portatile.jpg';
import Iphone from '../img/iphone.jpg';
import HarryPotter from '../img/harryPotter.jpg';
import RogueOne from '../img/rogueOne.jpg';

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket:[],
    prodotti:[ 
        {
            id:"1" ,
            title:"The Lord of he Ring",
            price:18.79,
            rating:5,
            image:LOTR, 
            categoria:["Libri"],
        },
        {
            id:"2" ,
            title:"PC portatile Acer",
            price:599.99,
            rating:3,
            image:PC, 
            categoria:["Informatica"],
        },
        {
            id:"3" ,
            title:"Iphone",
            price:1122.99,
            rating:4,
            image:Iphone, 
            categoria:["Informatica"],
        },
        {
            id:"4" ,
            title:"Harry Potter",
            price:12.50,
            rating:2,
            image:HarryPotter, 
            categoria:["Libri"],
        },
        {
            id:"5" ,
            title:"Star Wars:Rogue One",
            price:9.79,
            rating:4,
            image:RogueOne, 
            categoria:["DVD"],
        }
        ],
  },
  reducers: {
    REMOVE_FROM_BASKET: (state, action) => {
        //Rimuovo item dal carrello

        //clono il carrello esistente
        let newBasket=[...state.basket];

        const index=state.basket.findIndex((basketItem => basketItem.id ===action.payload.id));
        if (index >=0){
            //item esiste nel carrello e lo rimuovo
            newBasket.splice(index, 1);
        }else{
            console.warn('Non è possibile rimuovere item poichè non è presente nel carrello');
        }
        //restituisco qualsiasi cosa elemento state è
        state.basket = newBasket;       
    },
    ADD_TO_BASKET: (state, action) => {
        //Aggiungo item al carrello
        //restituisco tutto ciò che vi era nel basket e item inserito attraverso il dispatch in Product.js
        state.basket = [...state.basket, action.payload.item];
    },
  },
});

export const { ADD_TO_BASKET, REMOVE_FROM_BASKET } = basketSlice.actions;

export const selectBasket = (state) => state.basket.basket;
export const selectProdotti = (state) => state.basket.prodotti;
export const selectGetBasketTotal=(state)=> state.basket.basket?.reduce((amount,item) =>item.price+amount,0);

export default basketSlice.reducer;
