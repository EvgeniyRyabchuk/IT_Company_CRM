import React from 'react';

import {useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class GoogleAnalytics extends React.Component {
    componentWillUpdate ({ location, navigate }) {
        const gtag = window.gtag;

        if (location.pathname === this.props.location.pathname) {
            return;
        }

        if (navigate.action === 'PUSH' &&
            typeof(gtag) === 'function') {
            gtag('config', 'UA-87269926-3', {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': location.pathname
            });
        }
    }

    render () {
        return null;
    }
}

export default withRouter(GoogleAnalytics);