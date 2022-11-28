import {styled} from "@mui/material";
import {FlexBox, JustifyBox} from "../Shared";

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    height: '100%',
    // minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        margin: '1rem',
        borderRadius: 12,
    },
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));


const JWTRegister = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

const IMG = styled('img')(() => ({
    width: '100%',
    marginBottom: '32px',
}));

const NotFoundRoot = styled(FlexBox)(() => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh !important',
}));


export {
    ForgotPasswordRoot,
    JWTRoot,
    JWTRegister,
    IMG,
    NotFoundRoot
}