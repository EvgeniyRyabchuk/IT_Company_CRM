import React, {useEffect, useRef, useState} from "react";

import {Card as CardType, PaymentDetail} from '../../types/card';

import "react-credit-cards-2/es/styles-compiled.css";
import '../../assets/components/CreditCard/global.scss'


import {formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData} from "../../utils/card";
import {Box, Button} from "@mui/material";
import {getUniqId} from "../../utils/utils";
import {useTypeSelector} from "../../hooks/useTypedSelector";
import _ from "lodash";

// @ts-ignore
import Card from "react-credit-cards-2";
import {Order} from "../../types/order";

// const defCardData : CardType = {
//     id: 999999,
//     issuer: 'unknown',
//     number: "4934534563453456456",
//     name: "sdfgdfgh",
//     expiry: "23/42",
//     cvc: "234",
// }

const defCardData : CardType = {
    id: 999999,
    issuer: '',
    number: "",
    name: "",
    expiry: "",
    cvc: "",
}


export interface CreditCardComponentProps {
    onSubmit?: (card: CardType, paymentDetail?: PaymentDetail) => void;
    mode: 'create' | 'update' | 'pay';
    transferCard?: CardType | null | undefined;
    order: Order | null;
}

const Creditcard : React.FC<CreditCardComponentProps>
    = ({onSubmit, mode, transferCard, order}) => {


    const [isSave, setIsSave] = useState<boolean>(true);
    const [summa, setSumma] = useState<number>(0);

    const [card, setCard] = useState<CardType>(transferCard ?? defCardData);

    useEffect(() => {
        if(transferCard) {
            setCard(transferCard);
        }
    }, [transferCard]);

    // console.log(order)

    const [focused, setFocused] = useState<string>('');
    const [formData, setFormData] = useState<any>(null);
    const { cards } = useTypeSelector(state => state.card);

    console.log('==========================');
    console.log(transferCard, card);
    console.log('==========================');

    useEffect(() => {
        if(mode === 'update' && transferCard) {
            setCard(transferCard);
        }
        return () => {
            setCard(defCardData);
        }
    }, [mode])

    const handleCallback = ({ issuer }: any, isValid: any) => {
        if (isValid) {
            setCard({ ...card, issuer});
        }
    };

    const handleInputFocus = ({ target }: any) => {
        setFocused(target.name);
    };

    const handleInputChange = ({ target }: any) => {
        console.log(target.name);
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
            // target.value = target.value.replace(/\s/g, '');
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }
        setCard({...card, [target.name]: target.value });
    };

    const formRef = useRef<any>(null);

    const handleSubmit = (e: any) => {
        console.log('submit')
        e.preventDefault();

        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        setFormData(formData);
        formRef.current.reset();

        if(typeof onSubmit === 'function') {
            const newCard = {
                ...card,
                id: mode === 'create' ? getUniqId(cards) :
                    mode === 'update' ? card.id
                        : 999999,
                // number: card.number.replace(/\s/g, ''),
            };

            if(mode === 'pay') {
                if(!order) return;
                if(_.isEqual(transferCard, card)) {
                    onSubmit(newCard, {
                        summa,
                        payAndSave: false,
                        orderId: order.id
                    });
                }
                else {
                    onSubmit(newCard,{
                        summa,
                        payAndSave: isSave,
                        orderId: order.id
                    });
                }
            }
            else {
                onSubmit(newCard);
            }
        }
        setCard(defCardData);
    };

    return (
        <div key="Payment">
            <div className="App-payment">
                {/*<h1>React Credit Cards</h1>*/}
                {/*<h4>Beautiful credit cards for your payment forms</h4>*/}
                <Card
                    number={card.number}
                    name={card.name}
                    expiry={card.expiry}
                    cvc={card.cvc}
                    focused={focused}
                    callback={handleCallback}
                />
                <form className='my-5' ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="tel"
                            name="number"
                            className="form-control"
                            placeholder="Card Number"
                            pattern="[\d| ]{16,22}"
                            required
                            value={card.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        <small>E.g.: 49..., 51..., 36..., 37...</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={card.name}
                            className="form-control"
                            placeholder="Name"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input
                                type="tel"
                                name="expiry"
                                value={card.expiry}
                                className="form-control"
                                placeholder="Valid Thru"
                                pattern="\d\d/\d\d"
                                required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="tel"
                                name="cvc"
                                value={card.cvc}
                                className="form-control"
                                placeholder="CVC"
                                pattern="\d{3,4}"
                                required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                    </div>
                    {
                        mode === 'pay' &&
                        <div className="row justify-center">
                            <Box sx={{width: '300px', my: 2}}>

                                <label
                                    htmlFor='summa'>

                                    Summa
                                    {/*{*/}
                                    {/*    order && order.project &&*/}
                                    {/*    <>*/}
                                    {/*        {order.project.paid} / {order.project.budget}*/}
                                    {/*    </>*/}
                                    {/*}*/}
                                </label>


                                    <input
                                        style={{marginBottom: '10px'}}
                                        id='summa'
                                        type="number"
                                        name="summa"
                                        value={summa}
                                        className="form-control"
                                        placeholder="Summa"
                                        required
                                        onChange={(e) => setSumma(parseInt(e.target.value))}
                                        // onFocus={handleInputFocus}
                                    />
                            </Box>
                        </div>
                    }
                    <input type="hidden" name="issuer" value={card.issuer} />

                    {
                        mode === 'pay' &&
                        !_.isEqual(transferCard, card) &&

                        <Box sx={{mt: 3, fontSize: '18px'}}>
                            <div className=" form-check">
                                <label
                                    className="form-check-label d-flex justify-center"
                                    htmlFor="exampleCheck1"
                                    style={{ padding: '10px'}}
                                >
                                    <input
                                        style={{
                                            width: '17px',
                                            height: '17px',
                                            margin: '10px'
                                        }}
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1"
                                        checked={isSave}
                                        onChange={(e) => setIsSave(e.target.checked)}
                                    />
                                    Save card
                                </label>
                            </div>
                        </Box>
                    }

                    <Box sx={{my: 3}}>
                        <Button type='submit' variant='contained'>
                            { mode === 'create' && 'Add'}
                            { mode === 'update' && 'Update'}
                            { mode === 'pay' ? isSave ? 'PAY AND SAVE CARD' : "PAY" : ''}
                        </Button>
                    </Box>

                </form>
                {formData && (
                    <div className="App-highlight">
                        {formatFormData(formData).map((d, i) => (
                            <div key={i}>{d}</div>
                        ))}
                    </div>
                )}
                {/*<SupportedCards />*/}
            </div>

        </div>
    );
};

export default Creditcard;