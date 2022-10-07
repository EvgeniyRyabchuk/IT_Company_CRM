import React from 'react';

import '../../../assets/components/statusCards/paymentComplete.css';
import image from '../../../assets/images/statuses/payment-complete.svg';
import DownloadIcon from "../../icons/DownloadIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../../hooks/useTypedSelector";


const PaymentComplete = () => {


    const navigate = useNavigate();

    const { lastTransaction } = useTypeSelector(state => state.card);


    return (
        <div className="MuiPaper-root MuiPaper-elevation
         MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16bmb25"
        style={{ minHeight: '90vh'}}
        >
            <div className="css-8l13bg">
                <img src={image} width="100%" alt="Payment Complete" />
                    <h2 className=" MuiBox-root css-2ad1xo">
                        Your payment was successful 🎉</h2>
                    <h5 className=" MuiBox-root css-42oadk">
                        ${
                            lastTransaction &&
                            lastTransaction.summa
                        }

                    </h5>
                    <p className=" MuiBox-root css-1sg7btz">
                        If you have any questions, you can email
                        <br />
                    </p>
                    <p>
                        some-it-company@dev.com
                    </p>
                    <hr className="MuiDivider-root
                    MuiDivider-fullWidth css-s2j2sd" />
                        <div className="MuiBox-root css-13rcduy">
                            <button
                                onClick={() => {
                                    navigate('/profile')
                                }}
                                className="MuiButton-root MuiButton-GreyOutlined
                                 MuiButton-GreyOutlinedPrimary
                                         MuiButton-sizeMedium
                                         MuiButton-GreyOutlinedSizeMedium
                                         MuiButtonBase-root
                                          css-1nolsso"
                                    tabIndex={0} type="button">
                                <span  className="MuiButton-startIcon
                                MuiButton-iconSizeMedium css-1l6c7y9">
                                    <ArrowLeftIcon />
                            </span>
                                Back to profile
                                <span
                                    className="MuiTouchRipple-root css-w0pj6f">
                                </span>
                            </button>
                            <button
                                onClick={() => {

                                }}
                                style={{backgroundColor: 'rgb(39, 206, 136)'}}
                                className="MuiButton-root MuiButton-contained
                                 MuiButton-containedSuccess MuiButton-sizeMedium
                                MuiButton-containedSizeMedium MuiButtonBase-root
                                 css-mgvi1h"
                                tabIndex={0}
                                type="button">
                                <span
                                    className="MuiButton-startIcon
                                     MuiButton-iconSizeMedium css-1l6c7y9">
                                    <DownloadIcon />
                                </span>
                                    Download as PDF
                                <span className="MuiTouchRipple-root
                                 css-w0pj6f"></span>
                            </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentComplete;