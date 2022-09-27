import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import forgotPasswordLogo from '../../assets/images/matx/illustrations/dreamer.svg';
import AuthService from "../../services/AuthService";
import {H5} from "../../assets/typography/Typography";

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
    padding: 32,
    background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    // minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        margin: '1rem',
        borderRadius: 12,
    },
}));

const EmailSentSuccessfully = ({ text }) => {
    const navigate = useNavigate();


    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(email);
    //
    //     const response = await AuthService.sendPasswordReset(email);
    // };

    return (
        <ForgotPasswordRoot>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12}>
                        <JustifyBox p={4}>
                            <img width="300" src={forgotPasswordLogo} alt="" />
                        </JustifyBox>

                        <ContentBox>
                            <form>
                                <H5>
                                    {text ?? 'Check out your email'}
                                </H5>

                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => navigate(-1)}
                                    sx={{ mt: 2 }}
                                >
                                    Go Back
                                </Button>
                            </form>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </ForgotPasswordRoot>
    );
};

export default EmailSentSuccessfully;
