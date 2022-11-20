import {Box, styled} from "@mui/system";
import List from "@mui/material/List";

export const ListComponent = styled(List)(({mode}) => ({
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    height: mode === 'preview' ? '320px' : '100%',
    overflowY: 'auto',
    paddingLeft: '0 !important',
    py: 2
}));