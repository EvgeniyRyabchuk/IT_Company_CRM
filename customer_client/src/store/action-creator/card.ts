import {Card, CardActionTypes, Transaction} from "../../types/card";


export const setCards = (cards: Card[]) => {
   localStorage.setItem('cards', JSON.stringify(cards))
   return { type: CardActionTypes.INIT, payload: cards};
}

export const setLastTransaction = (transaction: Transaction) => {
   return { type: CardActionTypes.SET_LAST_TRANSACTION, payload: transaction};
}
