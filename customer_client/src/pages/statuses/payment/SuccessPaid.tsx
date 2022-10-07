import React from 'react';
import PaymentComplete from "../../../components/statusCards/payment/PaymentComplete";
import {useTypeSelector} from "../../../hooks/useTypedSelector";

const SuccessPaid = () => {

    return (
        <div>
            <PaymentComplete />
        </div>
    );
};

export default SuccessPaid;