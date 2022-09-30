import React from 'react';
import { Suspense } from 'react';
import Layout from "./Layout";

export const MyLoader : React.FC = ({}) => {
    return (
        <div>
            Loading
        </div>
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