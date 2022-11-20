import {CardAction, CardActionTypes, CardState} from "../../types/card";


const initialState: CardState = {
    cards: [],
    loading: false,
    error: null,
    lastTransaction: null
}

export const cardReducer = (state = initialState, action: CardAction): CardState => {
    switch(action.type) {
        case CardActionTypes.INIT:
            return { ...state, cards: [...action.payload] }
        case CardActionTypes.SET_LAST_TRANSACTION:
            return { ...state, lastTransaction: action.payload }
        default:
            return state;
    }
}

