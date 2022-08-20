import React from 'react';
import {Box, Button, Link} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";

const ProjectsListPage = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Projects" }]} />
            </Box>
            <div className="tss-1tp4az3-MUIDataTableBodyCell-root">
                <div className="MuiBox-root css-yeouz0">
                    <div className="MuiBox-root css-i9gxme"></div>
                    <a href="/pages/new-customer">
                        <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"
                                tabIndex={0} type="button"><span
                            className="material-icons notranslate MuiIcon-root MuiIcon-fontSizeMedium css-1jgtvd5"
                            aria-hidden="true">edit</span><span className="MuiTouchRipple-root css-w0pj6f"></span>
                        </button>
                    </a><a href="/pages/view-customer">
                    <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"
                            tabIndex={0} type="button"><span
                        className="material-icons notranslate MuiIcon-root MuiIcon-fontSizeMedium css-1jgtvd5"
                        aria-hidden="true">arrow_right_alt</span><span
                        className="MuiTouchRipple-root css-w0pj6f"></span></button>
                </a></div>
            </div>
            Projects
            <br/>
            <Link
                color="inherit"
                href='/projects/1'
            >Go to project 1</Link>


        </Container>
    );
};

export default ProjectsListPage;