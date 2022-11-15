import React from 'react';
import ForgotPassword from "../../sessions/ForgotPassword";
import PasswordReset from "../../sessions/PasswordReset";
import {useSearchParams} from "react-router-dom";
import EmailSentSuccessfully from "../../sessions/EmailSentSuccessfully";

const PasswordTab = () => {
    const [searchParams] = useSearchParams();

    return (
        <div>
            {
                !searchParams.get('sent') ?
                    <ForgotPassword /> :
                <EmailSentSuccessfully text={'Check out your email to reset password'} />
            }

        </div>
    );
};

export default PasswordTab;