import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import orderSentImg from '../../../assets/images/statuses/order_sent.svg';
import {FlexBoxCenter} from "../../../assets/components/Order/OrderDetail";


const ContactSuccess = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={12} md={6} lg={6} xl={6}>
                    <img src={orderSentImg} alt="" />
                </Grid>
                <Grid item sm={12} md={6} lg={6} xl={5}>
                    <FlexBoxCenter>
                        <Box>
                            <Typography variant='h3'>
                                Your order will be processed as soon as possible
                            </Typography>
                            <br/>
                            <hr/>
                            <br/>
                            <Typography sx={{mt: 1}} variant='subtitle1'>
                                Thank you for contacting our company
                            </Typography>
                        </Box>
                    </FlexBoxCenter>
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactSuccess;