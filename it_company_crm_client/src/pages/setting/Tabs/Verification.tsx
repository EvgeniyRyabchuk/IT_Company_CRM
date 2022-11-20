import React, {Fragment, useState} from 'react';
import useAuth from "../../../hooks/useAuth";
import {Alert, Button, TextField} from "@mui/material";
import {Box} from "@mui/system";
import {Send} from "@mui/icons-material";
import AuthService from "../../../services/AuthService";

const Verification = () => {

    const { user, profile } = useAuth();

    const [token, setToken] = useState<string>('');
    const [isSent, setIsSent] = useState<boolean>(false);

    const sendCode = async () => {
        const { data } = await AuthService.sendEmailVerification();
        setIsSent(true);
    }

    const verify = async () => {
        const { data } = await AuthService.emailVerify(token);
        profile();
    }

    return (
        <Fragment>
            {
                user?.email_verified_at ?
                    <Alert severity="success">Your email already verified</Alert>
                    :
                    <Box sx={{ pt: 5}}>
                        <Alert severity="error">Your email not verified</Alert>
                        <Box sx={{ pt: 5}} >

                            <Box sx={{ py: 5}}>
                                <Button
                                    disabled={isSent}
                                    endIcon={<Send />}
                                    variant={isSent ? 'outlined' : 'contained'}
                                    onClick={sendCode}
                                >
                                    {isSent ? 'Code was sent' : 'Send Code For Verification'}
                                </Button>
                            </Box>

                            {
                                isSent &&
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <TextField
                                        label="Please input code"
                                        color="primary"
                                        focused
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                    <Button
                                        sx={{width: 100, mx: 1}}
                                        disabled={token.length === 0}
                                        variant={'contained'}
                                        onClick={verify}
                                    >
                                       Verify
                                    </Button>
                                </Box>

                            }
                        </Box>
                    </Box>
            }
        </Fragment>
    );
};

export default Verification;