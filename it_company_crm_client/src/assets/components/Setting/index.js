import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";


export const SettingContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    bgcolor: 'background.paper',
    display: 'flex',
    height: '600px',
    maxWidth: '1200px',
    margin: '60px auto',

    [theme.breakpoints.down("sm")]: {
        display: 'block'
    }
}));
