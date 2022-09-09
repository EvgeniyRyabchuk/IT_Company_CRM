import React, {useEffect, useState} from 'react';
import Kanban from "../../components/Kanban/Kanban";
import ProjectFileManager from "../../components/ProjectFileManager/ProjectFileManager";
import {AppBar, Box, Tab, Tabs, Typography} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import {Breadcrumb} from "../../components";
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {ProjectService} from "../../services/ProjectService";
import {EmployeeWithProjectRoles, Project, ProjectRole} from "../../types/project";
import {useTheme} from '@mui/material/styles';
import {toLower} from "lodash";


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
    const { projectId } = useParams();
    const [ searchParams ] = useSearchParams();
    const navigator = useNavigate();

    const [project, setProject] = useState<Project>();

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
                    variant="fullWidth"
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
                    Main
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

                <ul>
                    { project?.employees.map((e: EmployeeWithProjectRoles) =>
                        <li key={e.id}>{e.user.full_name} ({e.id}) : role {e.role?.name}</li>
                    ) }
                </ul>
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>

                <div>
                    <h1>History</h1>

                    <div>action 1</div>
                    <div>action 2</div>
                    <div>action 3</div>
                    <div>action 4</div>
                    <div>action 5</div>
                    <div>action 6</div>
                </div>


            </TabPanel>

        </Container>
    );
};

export default ProjectPage;