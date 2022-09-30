import React from 'react';
import { Suspense } from 'react';
import {MyLoader} from "./layout/LayoutSuspence";

const Loadable = (Component: any) => (props: any) => {
    return (
        <div>
            <Suspense fallback={<MyLoader />}>
                <Component {...props} />
            </Suspense>
        </div>
    );
};

export default Loadable;