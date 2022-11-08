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

    return (
        <>
            <Header logoLink={undefined} links={undefined} className={undefined} />

            <Container className='layout-container'
                       style={{ minHeight: '80vh', overflow: 'hidden', marginTop: '60px'}}>
                <Outlet />
            </Container>

            <MiniCenteredFooter />
        </>
    );
};

export default Layout;