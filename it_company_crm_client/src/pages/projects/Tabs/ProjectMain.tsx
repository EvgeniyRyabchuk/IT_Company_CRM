import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Autocomplete, Button, Chip, CircularProgress, Grid, TextField} from "@mui/material";
import {Project, ProjectHistory, ProjectTag} from "../../../types/project";
import ProjectMemberList from "../../../components/UI/ProjectMemberList";
import {PublicOrderInfo} from "../../../types/order";
import {ProjectService} from "../../../services/ProjectService";
import {useNavigate} from "react-router-dom";
import LinkList from "../../../components/UI/LinkList/LinkList";
import {Box} from "@mui/system";
import ProjectHistoryList from "./ProjectHistory/ProjectHistoryList";

const ProjectMain : React.FC<{project: Project}> = ({project}) => {

    const [orderInfo, setOrderInfo] = useState<PublicOrderInfo>();
    const [history, setHistory] = useState<ProjectHistory[]>();
    const orderTextBox = useRef<any>();
    const navigate = useNavigate();
    const [projectTags, setProjectTags] = useState<ProjectTag[]>([]);


    useEffect(() => {

        const getOrderInfo = async () => {
            const { data } = await ProjectService.getOrderInfoForProject(project.id);
            setOrderInfo({...data});
        }
        const getHistory = async () => {
            const { data } = await ProjectService.getHistory(project.id);
            setHistory([...data.data]);
        }
        getOrderInfo();
        getHistory();

    }, []);


    const projectTagsForAutocompliteOptionDefault = useMemo<string[]>(() => {
        return project.tags.map(e => e.name);
    }, [project]);


    return (
        <div>

            {
                orderInfo ?
                    <div>
                        <Grid container spacing={3}>
                            <Grid item  xs={12} md={12} lg={8}>
                                <Box sx={{
                                    p: 1,
                                    maxHeight: '650px',
                                    overflowY: 'auto'
                                }}>
                                    <LinkList
                                        list={project.project_links}
                                    />
                                </Box>

                                {/*History*/}

                            </Grid>
                            <Grid item xs={12} md={12} lg={4}>

                                <h3>
                                    Order #{orderInfo.id} |
                                    Deadline: {orderInfo.deadline ?? 'No Deadline Yet'}
                                </h3>


                                <div style={{margin: '30px 0'}}>
                                    <h4>
                                        Order customer description
                                    </h4>
                                    <div
                                        className='about-container'
                                        ref={orderTextBox}
                                    >
                                        {orderInfo.about}
                                    </div>
                                    {
                                        orderTextBox.current &&
                                        orderTextBox.current.scrollHeight > 300 &&
                                        <div>
                                            <Button
                                                variant={'outlined'}>
                                                Read more
                                            </Button>
                                        </div>
                                    }

                                </div>

                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <ProjectMemberList
                                            previewCount={5}
                                            members={project.employees}
                                            setMembers={() => {}}
                                            mode='preview'
                                            project={project}
                                            className={`members-list ${project.employees.length > 5
                                            && 'hidden-bottom-60'}
                                    `}
                                            style={{
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            variant={'outlined'}
                                            onClick={() =>
                                                navigate(`/projects/${project.id}?tab=members`)
                                            }
                                        >
                                            View more members
                                        </Button>
                                    </div>
                                </div>
                                <div style={{
                                    margin: ' 30px 0',
                                    height: '200px',
                                    overflowY: 'auto'
                                }}>
                                    <Autocomplete
                                        readOnly
                                        disableClearable={true}
                                        multiple
                                        id="tags-filled"
                                        options={projectTags.map(tag => tag.name) ?? []}
                                        defaultValue={[...projectTagsForAutocompliteOptionDefault]}
                                        renderTags={(value: readonly string[], getTagProps) =>
                                            value.map((option: string, index: number) => (
                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}

                                                variant='standard'
                                                label="Project Tags"

                                            />)}
                                    />
                                </div>

                            </Grid>
                        </Grid>
                        <hr/>
                        <Grid container spacing={3}>
                            <Grid item md={12}>
                                <ProjectHistoryList project={project} previewCount={5} />
                                <div>
                                    <Button
                                        variant={'outlined'}
                                        onClick={() =>
                                            navigate(`/projects/${project.id}?tab=history`)
                                        }
                                    >
                                        View more history
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    :
                    <CircularProgress />
            }

        </div>
    );
};

export default ProjectMain;