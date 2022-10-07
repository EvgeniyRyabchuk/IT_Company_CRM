import React from 'react';
import {Outlet} from "react-router-dom";
import tw from "twin.macro";
//eslint-disable-next-line
import Header from "../headers/light";


import MiniCenteredFooter from "../footers/MiniCenteredFooter";

const Container = tw.div`relative`;


const Layout = () => {


    console.log(123);

    return (
        <>

            <Header logoLink={undefined} links={undefined} className={undefined} />

            <Container>
                <Outlet />
            </Container>

            <MiniCenteredFooter />


        </>
    );
};

export default Layout;