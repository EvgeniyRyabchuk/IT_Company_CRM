
export interface Card {
    id: number;
    number: string,
    name: string,
    expiry: string,
    cvc: string,
    issuer: string;
    summary?: number;
}

export interface CardState {
    cards: Card[];
    loading: boolean;
    error: string | null;
}



export enum CardActionTypes {
    INIT = 'INIT',
}

interface InitAction {
    type: CardActionTypes.INIT;
    payload: Card[];
}




export type CardAction =
    InitAction




