import React, {useEffect, useMemo, useState} from 'react';
import Kanban from "../../components/Kanban/Kanban";
import ProjectFileManager from "../../components/ProjectFileManager/ProjectFileManager";
import {AppBar, Box, Button, IconButton, Tab, Tabs, Typography} from "@mui/material";
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
import ProjectMemberList from "../../components/UI/ProjectMemberList";
import {Close, Edit} from "@mui/icons-material";
import {PublicOrderInfo} from "../../types/order";
import {setOrder} from "../../store/action-creator/kanban";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

enum ProjectTabConstants {
    MAIN,
    KANBAN,
    FILEMANAGER,
    MEMBERS,
    HISTORY
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ProjectPage = () => {

    const [project, setProject] = useState<Project>();

    const [memberEditMode, setMemberEditMode] = useState<boolean>(false);
    const [newMembers, setNewMembers] = useState<EmployeeWithProjectRoles[]>( []);

    const { projectId } = useParams();
    const [ searchParams ] = useSearchParams();
    const navigator = useNavigate();



    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        const tabName = toLower(ProjectTabConstants[newValue]);
        console.log(tabName, 'tab name')
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
                        />
                        :
                        'Loading Project'
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
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <IconButton
                        onClick={() => setMemberEditMode(!memberEditMode)}>
                        {memberEditMode ? <Close /> : <Edit/>}
                    </IconButton>
                </div>
                {
                    project &&
                        <ProjectMemberList
                            members={memberEditMode ? newMembers : project.employees}
                            setMembers={setNewMembers}
                            mode={memberEditMode ? 'update' : 'view' }
                            project={project}
                            className={`members-list`}
                            style={{
                                maxWidth: '100%'
                            }}
                        />
                }

                {
                    memberEditMode && project && orderInfo &&
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={ async () => {
                                console.log(newMembers);
                                const payload : any = { ...project};
                                payload.members = JSON.stringify(newMembers.map(m => m.pivot));
                                payload.tags = project.tags.map(t => t.name).join(',');
                                payload.order_id = orderInfo.id;

                                const { data: updatedProject } =
                                    await ProjectService.updateProject(project.id, payload);
                                setProject({...updatedProject});
                                setMemberEditMode(false);
                            }}
                        >
                            Save
                        </Button>
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