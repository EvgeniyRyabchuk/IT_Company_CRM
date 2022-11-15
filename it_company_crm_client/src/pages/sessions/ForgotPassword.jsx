import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import {generatePath, useNavigate, useSearchParams} from 'react-router-dom';
import forgotPasswordLogo from '../../assets/images/matx/illustrations/dreamer.svg';
import AuthService from "../../services/AuthService";
import useAuth from "../../hooks/useAuth";
import {ContentBox, JustifyBox} from "../../assets/components/Shared";
import {ForgotPasswordRoot} from "../../assets/components/Session";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState(user.email ?? '');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    const response = await AuthService.sendPasswordReset(email);
    searchParams.set('sent', 'true');
    setSearchParams(searchParams);
    // navigate({
    //   pathname: '/session/password',
    //   search: '?sent=true'
    // });
  };

  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src={forgotPasswordLogo} alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="email"
                  name="email"
                  size="small"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                  disabled
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
