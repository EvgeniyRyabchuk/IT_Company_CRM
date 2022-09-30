import React from 'react';
import { Suspense } from 'react';
import {CircularProgress} from "@mui/material";
import styled, { css } from "styled-components";

const Layout =  React.lazy(() => import('./Layout'))
const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const MyLoader : React.FC = ({}) => {
    return (
        <DarkBackground>
            <CircularProgress />
        </DarkBackground>
    )
}

const LayoutSuspence = () => {
    return (
        <Suspense fallback={<MyLoader />}>
            <Layout />
        </Suspense>
    );
};

export default LayoutSuspence;