import React, {useEffect, useRef, useState} from "react";
// @ts-ignore
import Card from 'react-credit-cards-2';
import "react-credit-cards-2/es/styles-compiled.css";
import '../../assets/components/CreditCard/global.scss'
import {Card as CardType} from "../../types/card";

import {formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData} from "../../utils/card";
import {Box, Button} from "@mui/material";
import {getUniqId} from "../../utils/utils";
import {useTypeSelector} from "../../hooks/useTypedSelector";

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
    onSave?: (card: CardType) => void;
    mode: 'create' | 'update' | 'pay';
    cardForUpdate?: CardType | null | undefined;
}

const Creditcard : React.FC<CreditCardComponentProps>
    = ({onSave, mode, cardForUpdate}) => {

    const [isSave, setIsSave] = useState<boolean>(true);

    const [card, setCard] = useState<CardType>(cardForUpdate ?? defCardData);

    // const [issuer, setIssuer] = useState<string>('');
    const [focused, setFocused] = useState<string>('');
    const [formData, setFormData] = useState<any>(null);
    const { cards } = useTypeSelector(state => state.card);


    // const updateFormData = () => {
    //     const formData = [...formRef.current.elements]
    //         .filter(d => d.name)
    //         .reduce((acc, d) => {
    //             acc[d.name] = d.value;
    //             return acc;
    //         }, {});
    //     setFormData(formData);
    // }

    useEffect(() => {
        const newCard = cardForUpdate ?? defCardData;
        setCard(newCard);

    }, [cardForUpdate])

    useEffect(() => {
        if(mode === 'update' && cardForUpdate) {
            setCard(cardForUpdate);
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

        console.log(formData);
        if(typeof onSave === 'function') {
            const newCard = {
                ...card,
                id: mode === 'create' ? getUniqId(cards) : card.id,
                number: card.number.replace(/\s/g, ''),
            };
            onSave(newCard);
        }
        setCard(defCardData);
    };

    return (
        <div key="Payment">
            <div className="App-payment">
                <h1>React Credit Cards</h1>
                <h4>Beautiful credit cards for your payment forms</h4>
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
                    <input type="hidden" name="issuer" value={card.issuer} />

                    {
                        mode === 'pay' &&
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
                            { mode === 'pay' && 'PAY'}

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