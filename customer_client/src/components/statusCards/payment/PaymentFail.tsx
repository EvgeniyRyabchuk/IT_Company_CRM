import React from 'react';
import '../../../assets/components/statusCards/paymentFail.css';
import {HighlightOff} from "@mui/icons-material";



const PaymentFail = () => {
    return (
        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-ifwbwp">
            <div className="MuiBox-root css-15hpiiy">
                <HighlightOff style={{fontSize: '150px', color: 'red'}} />
                <h2 className=" MuiBox-root css-2ad1xo">
                    Payment Fail
                </h2><small className=" MuiBox-root css-1abfw2l">
                    thank
                    you for
                    shopping using Uko
            </small>
                <button
                    className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButtonBase-root  css-wo34nj"
                    tabIndex={0} type="button">
                    Back to order
                    <span className="MuiTouchRipple-root css-w0pj6f"></span>
                </button>
            </div>
        </div>
    );
};

export default PaymentFail;