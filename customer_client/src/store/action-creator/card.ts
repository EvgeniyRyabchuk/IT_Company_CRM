import {Card, CardActionTypes} from "../../types/card";


export const setCards = (cards: Card[]) => {
   localStorage.setItem('cards', JSON.stringify(cards))
   return { type: CardActionTypes.INIT, payload: cards};
}

