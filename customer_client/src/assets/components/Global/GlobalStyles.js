import { createGlobalStyle } from 'styled-components'
import  { globalStyles } from 'twin.macro'
import {Box, styled} from "@mui/material";

const GlobalStyles = createGlobalStyle(globalStyles, `
     .ReactModal__Overlay {
     transition: transform 300ms ease-in-out; 
     transition-delay: 100ms; 
     transform: scale(0); 
   }
   .ReactModal__Overlay--after-open{
     transform: scale(1);
   }
   .ReactModal__Overlay--before-close{ 
     transform: scale(0);
   }
`)

export default GlobalStyles;


const JustifyContent = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
}))

const JustifyBox = styled(JustifyContent)(() => ({
    alignItems: 'center'
}))

const JustifyWrap = styled(JustifyContent)(() => ({
    flexWrap: 'wrap'
}))


export {
    JustifyContent,
    JustifyBox,
    JustifyWrap
}