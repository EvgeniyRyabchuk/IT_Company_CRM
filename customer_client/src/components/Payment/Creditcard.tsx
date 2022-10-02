import React, {useRef, useState} from "react";
// @ts-ignore
import Card from 'react-credit-cards-2';
import SupportedCards from "./CardList";
import "react-credit-cards-2/es/styles-compiled.css";
import '../../assets/components/CreditCard/global.scss'

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from "../../utils/card";
import {Box, Button} from "@mui/material";

const Creditcard = () => {

    const [timeoutID, setTimeoutId] = useState<any>();

    const [isSave, setIsSave] = useState<boolean>(true);


    const [card, setCard] = useState<any>({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null
    });

    console.log(card);

    const handleCallback = ({ issuer }: any, isValid: any) => {
        if (isValid) {
            setCard({ ...card, issuer });
        }
    };

    const handleInputFocus = ({ target }: any) => {
        setCard({...card,
            focused: target.name
        });
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
        e.preventDefault();
        const { issuer } = card;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        setCard({...card, formData });
        formRef.current.reset();
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
                    focused={card.focused}
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
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        <small>E.g.: 49..., 51..., 36..., 37...</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
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

                    <Box sx={{my: 3}}>
                        <Button variant='contained' >PAY</Button>
                    </Box>

                </form>
                {card.formData && (
                    <div className="App-highlight">
                        {formatFormData(card.formData).map((d, i) => (
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