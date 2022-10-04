import React from 'react';

import '../../../assets/components/statusCards/paymentComplete.css';
import image from '../../../assets/images/statuses/payment-complete.svg';
import DownloadIcon from "../../icons/DownloadIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";


const PaymentComplete = () => {
    return (
        <div className="MuiPaper-root MuiPaper-elevation
         MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16bmb25">
            <div className="css-8l13bg">
                <img src={image} width="100%" alt="Payment Complete" />
                    <h2 className=" MuiBox-root css-2ad1xo">
                        Thanks for placing order 🎉</h2>
                    <h5 className=" MuiBox-root css-42oadk">
                        #AOSIDY2
                    </h5>
                    <p className=" MuiBox-root css-1sg7btz">
                        We will contact you soon
                        <br />
                        when the shipment arrives
                    </p>
                    <hr className="MuiDivider-root
                    MuiDivider-fullWidth css-s2j2sd" />
                        <div className="MuiBox-root css-13rcduy">
                            <button
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
                                Continue Shopping
                                <span
                                    className="MuiTouchRipple-root css-w0pj6f">
                                </span>
                            </button>
                            <button
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