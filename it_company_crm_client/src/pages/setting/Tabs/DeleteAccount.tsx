import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {EmployeeService} from "../../../services/EmployeeService";
import AuthService from "../../../services/AuthService";
import useAuth from "../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const DeleteAccount = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const deleteAccountPermanently = async () => {
        const conf = window.confirm(`Are you sure that you want to delete your account?`);
        if (conf) {
            const { data } = await AuthService.deleteAccount(user!.id);
            navigate(`/session/signin`);
        }
    }

    return (
        <div>
            <Box>
                <Typography variant='h5'>
                    Delete Your Account
                </Typography>

                <Box sx={{pt: 3, width: 400, mx: 'auto'}}>
                    <Typography variant='body1'>
                        When you delete your account, you lose access to Front account services,
                        and we permanently delete your personal data. You can cancel the deletion for 14 days.
                    </Typography>
                </Box>

                <Box sx={{my: 3}}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={deleteAccountPermanently}
                    >
                        Delete Account
                    </Button>
                </Box>

            </Box>
        </div>
    );
};

export default DeleteAccount;