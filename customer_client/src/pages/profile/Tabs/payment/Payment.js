import React from 'react';
import '../../../../assets/components/Profile/payment.scss'
import CardManagment from "./CardManagment";
import Transactions from "./Transactions";


const Payment = () => {
    return (
        <div>
            <CardManagment onCardSelected={() => {}}/>
            <Transactions _for='customer' />
        </div>
    );
};

export default Payment;