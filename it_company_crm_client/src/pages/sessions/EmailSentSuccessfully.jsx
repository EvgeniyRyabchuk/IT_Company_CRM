import {Box, Button, Card, Grid, styled} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import forgotPasswordLogo from '../../assets/images/matx/illustrations/dreamer.svg';
import {H5} from "../../assets/typography/Typography";
import {ContentBox, JustifyBox} from "../../assets/components/Shared";
import {ForgotPasswordRoot} from "../../assets/components/Session";




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
