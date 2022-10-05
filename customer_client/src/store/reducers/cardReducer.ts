import {CardAction, CardActionTypes, CardState} from "../../types/card";


const initialState: CardState = {
    cards: [],
    loading: false,
    error: null
}

export const cardReducer = (state = initialState, action: CardAction): CardState => {
    switch(action.type) {
        case CardActionTypes.INIT:
            return { loading: true, error: null, cards: [...action.payload] }

        default:
            return state;
    }
}

