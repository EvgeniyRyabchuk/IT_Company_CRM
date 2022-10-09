import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import tw from "twin.macro";
//eslint-disable-next-line
import Header from "../headers/light";


import MiniCenteredFooter from "../footers/MiniCenteredFooter";

const Container = tw.div`relative`;


const Layout = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    console.log(123);

    return (
        <>

            <Header logoLink={undefined} links={undefined} className={undefined} />

            <Container style={{ minHeight: '80vh', overflow: 'hidden'}}>
                <Outlet />
            </Container>

            <MiniCenteredFooter />


        </>
    );
};

export default Layout;