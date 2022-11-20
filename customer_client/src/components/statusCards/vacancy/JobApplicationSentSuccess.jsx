import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import resumeSent from "../../../assets/images/statuses/resume_sent.svg";
import {FlexBoxCenter} from "../../../assets/components/Order/OrderDetail";


const JobApplicationSentSuccess = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item  sm={12} md={6} lg={6} xl={6}>
                    <img src={resumeSent} alt="" />
                </Grid>
                <Grid item sm={12} md={6} lg={6} xl={6} >
                    <FlexBoxCenter>
                        <Box>
                            <Typography variant='h3'>Your resume has been sent. You'll get
                                the result of the application to your mail.</Typography>
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

export default JobApplicationSentSuccess;