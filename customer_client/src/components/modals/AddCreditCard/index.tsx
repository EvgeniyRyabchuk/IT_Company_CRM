import React from 'react';
import Creditcard from "../../Payment/Creditcard";
import ModalWithTransition from "../ModalWithTransition";
import {Grid} from "@mui/material";

interface Modal {
    isOpen: boolean,
    onClose: () => void
}

const AddCreditCard : React.FC<Modal & {withCards?: boolean}>
    = ({isOpen, onClose, withCards = false}) => {
    return (
        <ModalWithTransition isOpen={isOpen} type='two' onClose={onClose}>
            {
                withCards ?
                    <Grid container spacing={3}>
                        <Grid item md={6}>
                            <Creditcard />
                        </Grid>
                        <Grid item md={6}>
                            zlksdfgjlksdfjg
                        </Grid>
                    </Grid>
                    :
                <Creditcard />
            }

        </ModalWithTransition>
    );
};

export default AddCreditCard;