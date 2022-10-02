import React from 'react';
import '../../../../assets/components/Profile/payment.css'
import CardForm from "./CardForm";
import Transactions from "./Transactions";
import Creditcard from "../../../../components/Payment/Creditcard";


const Payment = () => {
    return (
        <div>

            <CardForm/>
            <Transactions />

        </div>
    );
};

export default Payment;