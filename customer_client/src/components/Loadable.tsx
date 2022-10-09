import React from 'react';
import { Suspense } from 'react';
import {MyLoader} from "./layout/LayoutSuspence";
import {CircularProgress} from "@mui/material";

const PageLoader = (
    <div style={{ position: "relative", top: '100px'}}>
        <CircularProgress />
    </div>
)

const Loadable = (Component: any) => (props: any) => {
    return (
        <div>
            <Suspense fallback={PageLoader}>
                <Component {...props} />
            </Suspense>
        </div>
    );
};

export default Loadable;