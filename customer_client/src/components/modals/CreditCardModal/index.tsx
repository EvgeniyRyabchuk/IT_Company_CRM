import React from 'react';
import Creditcard from "../../Payment/Creditcard";
import ModalWithTransition from "../ModalWithTransition";
import {Grid} from "@mui/material";
import {Card as CardType} from "../../../types/card";
import {useAction} from "../../../hooks/useAction";

interface Modal {
    isOpen: boolean,
    onClose: () => void,
    mode?: 'create' | 'update' | 'pay';
    cardForUpdate?: CardType | null | undefined;
}

const CreditCardModal : React.FC<Modal & {withCards?: boolean}> = ({
           isOpen,
           onClose,
           withCards = false,
           mode = 'create',
           cardForUpdate
}) => {

    const { setCards } = useAction();

    const handleCardSave = (card: CardType) => {

        console.log(123);

        if(mode === 'pay') {

        } else if(mode === 'create' || mode === 'update') {
            const lsCards = localStorage.getItem('cards');
            if(lsCards) {
                const cards : CardType | any = JSON.parse(lsCards);
                if(Array.isArray(cards)) {
                    let newCards = [];
                    if(mode === 'create') {
                        const cardExistList = cards.find(e => e.number === card.number);
                        if(cardExistList) { return; }

                        newCards = [...cards, card];
                    }
                    else if(mode === 'update') {
                        newCards = cards.map(e =>
                            e.id === card.id ? card : e
                        );
                    }
                    setCards(newCards);
                    return;
                }
            }
            setCards([card]);
        }
    }

    return (
        <ModalWithTransition isOpen={isOpen} type='two' onClose={onClose}>
            {
                withCards ?
                    <Grid container spacing={3}>
                        <Grid item md={6}>
                            <Creditcard mode='pay' />
                        </Grid>
                        <Grid item md={6}>
                            zlksdfgjlksdfjg
                        </Grid>
                    </Grid>
                    :
                <Creditcard
                    mode={mode}
                    onSave={(card) => {
                        handleCardSave(card);
                        onClose();
                    }}
                    cardForUpdate={cardForUpdate}
                />
            }

        </ModalWithTransition>
    );
};

export default CreditCardModal;