import {Order} from "./order";


export interface Card {
    id: number;
    number: string,
    name: string,
    expiry: string,
    cvc: string,
    issuer: string;
    summary?: number;
}

export interface PaymentDetail {
    summa: number;
    payAndSave: boolean;
    orderId: number;
}

export interface Transaction {
    id: number,
    order_id: number,
    last_card_digits: number,
    summa: number,
    issuer: string,
    created_at: string,
    order: Order
}


export interface CardState {
    cards: Card[];
    loading: boolean;
    error: string | null;
    lastTransaction: Transaction | null;
}



export enum CardActionTypes {
    INIT = 'INIT',
    SET_LAST_TRANSACTION = 'SET_LAST_TRANSACTION',
}

interface InitAction {
    type: CardActionTypes.INIT;
    payload: Card[];
}

interface SetLastTransactionAction {
    type: CardActionTypes.SET_LAST_TRANSACTION;
    payload: Transaction;
}




export type CardAction =
    InitAction | SetLastTransactionAction




