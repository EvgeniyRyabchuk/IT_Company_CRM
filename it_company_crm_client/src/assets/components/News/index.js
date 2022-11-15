import {styled} from "@mui/material/styles";
import {Box, Card} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";

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

export const NewsContent = styled(Box)(({ theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '30px'
}))

export const newsPaperStyle = {
    width: 200,
    maxWidth: '100%',
    position: 'absolute',
    top: 90,
    right: 0
}

export const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));