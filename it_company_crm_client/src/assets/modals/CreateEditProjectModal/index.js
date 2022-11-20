
// @ts-ignore
import {Box, styled} from "@mui/system";
import {Grid} from "@mui/material";

export const CreateProjectCard = styled(Box)(({ theme}) => ({
    height: '100%',
    padding: '5px',
    boxShadow: 2,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: 'relative'
}));

// @ts-ignore
export const CreateProjectLinkCard = styled(Box)(({ theme}) => ({
    height: '100%',
    padding: '5px',
    boxShadow: 2,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: 'relative'
}));

// @ts-ignore
export const CreateProjectLinkWrapper = styled(Box)(({ theme}) => ({
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '235px',
    overflowY: 'scroll',
    marginTop: "10px",
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '20px'
}));

// @ts-ignore
export const CreateProjectLink = styled(Box)(({ theme}) => ({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    height: '50px',
    margin: '5px 0'
}));

export const TagWrapper = styled(Grid)(({ theme}) => ({
    height: '200px',
    overflowY: 'auto',
    marginTop: '20px',
}));