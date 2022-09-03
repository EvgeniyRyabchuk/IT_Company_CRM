import {Box, styled} from "@mui/material";
import React from "react";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500  ,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '20px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': { margin: '0 8px' },
}));

// @ts-ignore
const StyledBox = styled(Box)(({ theme, textTransformStyle, ellipsis }) => ({
    textTransform: textTransformStyle || 'none',
    whiteSpace: ellipsis ? 'nowrap' : 'normal',
    overflow: ellipsis ? 'hidden' : '',
    textOverflow: ellipsis ? 'ellipsis' : '',
}));

type AppProps = {
    children?: any|undefined;
    className?: any|undefined;
    ellipsis?: any|undefined;
    textTransform?: any|undefined;
}

const Span: React.FC<AppProps> = ({ children, className, ellipsis, textTransform, ...props }) => {

    return (
        <StyledBox
            component="span"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};


export {
    modalStyle,
    UserMenu,
    StyledBox,
    Span
}