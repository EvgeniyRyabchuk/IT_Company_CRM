import React, {useEffect, useState} from 'react';
import Kanban from "../../components/Kanban/Kanban";
import ProjectFileManager from "../../components/ProjectFileManager/ProjectFileManager";
import {AppBar, Box, Tab, Tabs} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import {Breadcrumb} from "../../components";
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {ProjectService} from "../../services/ProjectService";
import {EmployeeWithProjectRoles, Project, ProjectRole} from "../../types/project";
import {useTheme} from '@mui/material/styles';
import {toLower} from "lodash";
import ProjectMain from "./Tabs/ProjectMain";
import '../../assets/components/ProjectPage/index.css';
import ProjectHistoryList from "./Tabs/ProjectHistory/ProjectHistoryList";
import {PublicOrderInfo} from "../../types/order";
import ProjectMemberEdit from "./Tabs/ProjectMemberEdit";
import {a11yProps, TabPanel} from "../../components/Tab";

enum ProjectTabConstants {
    MAIN,
    KANBAN,
    FILEMANAGER,
    MEMBERS,
    HISTORY
}

const ProjectPage = () => {

    const [project, setProject] = useState<Project>();

    const [newMembers, setNewMembers] = useState<EmployeeWithProjectRoles[]>( []);

    const { projectId } = useParams();
    const [ searchParams ] = useSearchParams();
    const navigator = useNavigate();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        const tabName = toLower(ProjectTabConstants[newValue]);
        navigator({
            pathname: `/projects/${projectId}`,
            search: createSearchParams({
                tab: tabName
            }).toString()
        });
    };

    const setDefaultTab = () => {
        const tab = searchParams.get('tab');
        switch (tab) {
            case 'kanban':
                setValue(ProjectTabConstants.KANBAN);
                break;
            case 'filemanager':
                setValue(ProjectTabConstants.FILEMANAGER);
                break;
            case 'members':
                setValue(ProjectTabConstants.MEMBERS);
                break;
            case 'history':
                setValue(ProjectTabConstants.HISTORY);
                break;
            default:
                setValue(ProjectTabConstants.MAIN);
                break;
        }
    }

    useEffect(() => {
        setDefaultTab();
    }, [searchParams])

    const [orderInfo, setOrderInfo] = useState<PublicOrderInfo>();

    useEffect(() => {
        const fetchProject = async () => {
            if(projectId) {
                const { data } = await ProjectService.getProject(parseInt(projectId));
                const employeesWithRoles = data.project.employees.map((e: EmployeeWithProjectRoles) => {
                        e.role = data.projectRoles.find((pr: ProjectRole) =>
                            pr.id == e.pivot.project_id);
                        return e;
                    }
                );
                data.project.employees = employeesWithRoles;
                setProject(data.project);
                setNewMembers(data.project.employees);
                setOrderInfo(data.orderInfo);
            }
        }
        setDefaultTab();
        fetchProject();
    }, []);


    // @ts-ignore
    return (
        <Container style={{padding: '30px'}}>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Projects", path: '/projects' },
                    { name: projectId }
                ]} />
            </Box>

            <h1 className='text-center'>    Project { projectId }</h1>

            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="scrollable"
                    centered
                    scrollButtons="auto"
                    aria-label="full width tabs example"
                >
                    <Tab label="Main" {...a11yProps(0)} />
                    <Tab label="Kanban Board" {...a11yProps(1)} />
                    <Tab label="Project File Manager" {...a11yProps(2)} />
                    <Tab label="Members" {...a11yProps(3)} />
                    <Tab label="History" {...a11yProps(4)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
                {
                    project && orderInfo ?
                    <ProjectMain
                        project={project}
                        orderInfo={orderInfo}
                    /> : 'Loading Project'
                }
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Kanban Board
                <Kanban projectId={parseInt(projectId!)} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <h1>Project File Manager</h1>
                <ProjectFileManager projectId={projectId!} />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                <h1>Members</h1>
                {
                    project && orderInfo &&
                    <ProjectMemberEdit
                        project={project}
                        setProject={setProject}
                        orderInfo={orderInfo}
                        newMembers={newMembers}
                        setNewMembers={setNewMembers}
                    />
                }
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
                {
                    project &&
                        <ProjectHistoryList project={project} />
                }
            </TabPanel>
        </Container>
    );
};

export default ProjectPage;