import {Box, styled} from "@mui/material";

export const FlexBoxCenter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
}));

export const OrderDetailWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '10px',
    margin: '0 auto',
    [theme.breakpoints.down("md")]: {
        width: '100%',
    }
// "& .breadcrumb": {
//     marginBottom: "30px",
//     [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
// },
}));
