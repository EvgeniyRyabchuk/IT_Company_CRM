import React from 'react';
import { Suspense } from 'react';
import {CircularProgress} from "@mui/material";
import styled, { css } from "styled-components";

const Layout =  React.lazy(() => import('./Layout'))

export const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */ 
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */ 
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
  justify-content: center;
  align-items: center;
  
  ${(props : any) =>
          props.disappear &&
          css`
      display: flex; /* show */
    `}
  
`;

export const MyLoader : React.FC<{ disappear?: boolean }> = ({disappear}) => {
    return (
        <DarkBackground
            /*
            // @ts-ignore */
            disappear={disappear}>
                <CircularProgress size='5rem'/>
        </DarkBackground>
    )
}

const LayoutSuspence = () => {
    return (
        <Suspense fallback={<MyLoader disappear />}>
            <Layout />

        </Suspense>
    );
};

export default LayoutSuspence;