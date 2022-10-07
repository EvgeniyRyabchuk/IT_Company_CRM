import React from 'react';
import '../../../../assets/components/Profile/payment.css'
import CardManagment from "./CardManagment";
import Transactions from "./Transactions";
import Creditcard from "../../../../components/Payment/Creditcard";


const Payment = () => {
    return (
        <div>

            <CardManagment onCardSelected={() => {}}/>
            <Transactions />

        </div>
    );
};

export default Payment;