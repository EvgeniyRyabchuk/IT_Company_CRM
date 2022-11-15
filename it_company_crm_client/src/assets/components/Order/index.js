import {Box, styled} from "@mui/system";


export const CustomerProfileLink = styled('a')(({theme}) => ({
    display: 'flex',
    justifyContent: 'left',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left'
}))

export const CustomerInfoBox = styled('a')(({theme}) => ({
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))

export const CustomerBoxWrapper = styled(Box)(({theme}) => ({
    width: '250px',
    overflowX: 'hidden'
}))

export const OrderDatesBox = styled(Box)(({theme}) => ({
    fontSize: '13px',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignContent: 'center'
}))