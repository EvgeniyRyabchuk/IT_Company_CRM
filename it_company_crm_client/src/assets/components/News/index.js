import {styled} from "@mui/material/styles";
import {Box, Card} from "@mui/material";

export const NewsList = styled(Box)(({ theme, alignment }) => ({
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    flexDirection: alignment,
    flexWrap: 'wrap',
}));

export const NewsItem = styled(Card)(({ theme, alignment }) => ({

    position: 'relative',
    width: alignment === 'column' ? '100%' :
        alignment === 'row' ? '33%' : '33%',
    [theme.breakpoints.down("lg")]: {
        width: alignment === 'column' ? '100%' :
            alignment === 'row' ? '50%' : '50%',
    },
    [theme.breakpoints.down("sm")]: {
        width: alignment === 'column' ? '100%' :
            alignment === 'row' ? '100%' : '100%',
    },
}));
