import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import forgotPasswordLogo from '../../assets/images/matx/illustrations/dreamer.svg';
import AuthService from "../../services/AuthService";
import {ContentBox, JustifyBox} from "../../assets/components/Shared";
import {ForgotPasswordRoot} from "../../assets/components/Session";

const ForgotPassword = (props) => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const {id, token} = useParams();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await AuthService.passwordReset(id, token,newPassword);
        navigate('/');
    };

    return (
        <ForgotPasswordRoot {...props} >
            <Card className="card">
                <Grid container>
                    <Grid item xs={12}>
                        <JustifyBox p={4}>
                            <img width="300" src={forgotPasswordLogo} alt="" />
                        </JustifyBox>

                        <ContentBox>
                            <form onSubmit={handleFormSubmit}>
                                <TextField
                                    type="password"
                                    name="newPassword"
                                    size="small"
                                    label="New Password"
                                    value={newPassword}
                                    variant="outlined"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    sx={{ mb: 3, width: '100%' }}
                                />

                                <Button fullWidth variant="contained" color="primary" type="submit">
                                    Reset Password
                                </Button>

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

export default ForgotPassword;
