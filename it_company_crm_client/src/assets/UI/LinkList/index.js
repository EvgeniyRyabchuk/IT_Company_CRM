import {Box, styled} from "@mui/system";

export const LinkListWrapper = styled(Box)(() => ({
    textAlign: 'start',
    overflow: "hidden",
    width: '100%'
}));

export const LinkComponent = styled('a')(() => ({
    width: 'calc(100% - 32px)',
    color: '#1976D2',
    overflowWrap: 'break-word'
}));
export const LinkDateWrapper = styled(Box)(() => ({
    minWidth: '200px',
    width: '200px',
    textAlign: 'end'
}));