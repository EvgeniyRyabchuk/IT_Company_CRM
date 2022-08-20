import React from 'react';
import Kanban from "../../components/Kanban/Kanban";
import ProjectFileManager from "../../components/ProjectFileManager/ProjectFileManager";
import {Box} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import {Breadcrumb} from "../../components";

const ProjectPage = () => {
    return (
        <Container style={{padding: '30px'}}>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Projects", path: '/projects' },
                    { name: 1 } 
                ]} />
            </Box>

            Project 1

            <Kanban />

            <ProjectFileManager />
        </Container>
    );
};

export default ProjectPage;