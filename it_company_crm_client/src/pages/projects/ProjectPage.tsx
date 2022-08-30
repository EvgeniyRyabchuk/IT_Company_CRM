import React from 'react';
import Kanban from "../../components/Kanban/Kanban";
import ProjectFileManager from "../../components/ProjectFileManager/ProjectFileManager";
import {Box} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import {Breadcrumb} from "../../components";
import {useParams} from "react-router-dom";

const ProjectPage = () => {
    const { projectId } = useParams();

    return (
        <Container style={{padding: '30px'}}>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Projects", path: '/projects' },
                    { name: projectId }
                ]} />
            </Box>

            Project { projectId }

            <Kanban projectId={parseInt(projectId!)} />

            <ProjectFileManager projectId={projectId!} />
        </Container>
    );
};

export default ProjectPage;