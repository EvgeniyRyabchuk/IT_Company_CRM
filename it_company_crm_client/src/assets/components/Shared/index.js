import {Box, styled} from "@mui/system";

export const SearchInput = styled("div")(({ theme, width}) => ({
    padding: "10px",
    width: width ?? '400px',
    display: 'flex',
}));
export const Line = styled("div")(({theme}) => ({
    height: '2px',
    backgroundColor: 'black',
    margin: '5px 0px',
    width: '100px',
}));


export const FlexJustifyCenter = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center'
}));
export const FlexJustifyBetween = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}));
export const FlexGrow = styled(Box)(() => ({
    display: 'flex',
    flexGrow: 1
}));



export const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

export const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}));

export const JustifyBox2 = styled(FlexBox)(() => ({
    maxWidth: 320,
    flexDirection: 'column',
    justifyContent: 'center',
}));

export const ContentBox = styled(Box)(({ theme }) => ({
    padding: 32,
    background: theme.palette.background.default,
}));

export const ContentBox2 = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));



export const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}));





export const ButtonWrapper = styled(Box)(({ theme }) => ({
    width: 100,
    height: 100,
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary,
    position: 'absolute',
    marginTop: '20px'
}));

export const UploadButton = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    border: "2px solid",
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.secondary
}));

export const SwitchWrapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
}));









