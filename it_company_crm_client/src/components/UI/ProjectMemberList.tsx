import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import {EmployeeWithProjectRoles, Project, ProjectRole} from "../../types/project";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import ListItemText from "@mui/material/ListItemText";
import {Autocomplete, Button, Card, TextField} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import AddEmployeeToProjectModal from "../modals/AddEmployeeToProjectModal/AddEmployeeToProjectModal";
import {ComponentMode} from "../../types/global";
import {ProjectService} from "../../services/ProjectService";
import '../../assets/components/ProjectMembersList/index.css';

const ProjectMemberList
    :React.FC<{
        members: EmployeeWithProjectRoles[],
        setMembers: (members: EmployeeWithProjectRoles[]) => void,
        mode: ComponentMode,
        project: Project,
        previewCount?: number | undefined
        [props: string]: any;
    }> = ({
           members,
           setMembers,
           mode,
           project,
           previewCount,
          ...props
    }) => {

    const [projectRoles, setProjectRoles] = useState<ProjectRole[]>([]);

    const [checkedMember, setCheckedMember] = React.useState<EmployeeWithProjectRoles[]>([]);

    console.log()

    const handleToggle = (value: any) => () => {
        const currentIndex = checkedMember.indexOf(value);
        const newChecked = [...checkedMember];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedMember(newChecked);
    };

    const [openEmployeeAddMoal, setOpenEmployeeAddModal] = useState<boolean>(false);

    const addEmployeeToProjectHandle = (employee: EmployeeWithProjectRoles) => {
        setMembers([...members, {...employee, pivot:
                {
                    employee_id: employee.id,
                    project_role_id: 1,
                    project_id: 1
                }}
        ]);
    }

    const deleteMember = async () => {

        const _delete = () => {
            const newMembers = [...members];
            for (let memeber of members) {
                const find = checkedMember.find(e => e.id === memeber.id);
                if(find) {
                    const index = newMembers.indexOf(memeber);
                    newMembers.splice(index, 1);
                }
            }
            setMembers(newMembers);
            setCheckedMember([]);
        }
        // if(mode === 'update' && order && order.project) {
        //     if(checkedMember.length == 1) {
        //         // const { data } =
        //         //     await ProjectService.deleteEmployeeFromProject
        //         //     (checkedMember[0].id, order.project.id);
        //     }
        //     else if (checkedMember.length > 1) {
        //         // const { data } = await
        //         //     ProjectService.deleteManyEmployeesFromProject(
        //         //         checkedMember.map(e => e.id), order.project.id
        //         // );
        //     }
        // }
        _delete();
    }

    useEffect(() => {
        const getProjectRoles = async () => {
            const { data } = await ProjectService.getProjectRoles();
            setProjectRoles([...data]);
        }
        getProjectRoles();
    }, [])


    console.log(members)

    return (
        <div style={{width: '100%'}}>
            {
                mode === "view" && previewCount &&
                    <h3>Members Short List</h3>
            }
            {
                mode === 'create' || mode === 'update' ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant='contained'
                            color={'primary'}
                            onClick={() => setOpenEmployeeAddModal(true)}
                        >
                            <Add />
                        </Button>
                        <Button
                            style={{display: checkedMember.length > 0 ? 'block' : 'none'}}
                            variant='contained'
                            color={'error'}
                            onClick={deleteMember}
                        >
                            <Delete/>
                        </Button>
                    </div>
                    : ''
            }

            <List
                dense
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    height: mode === 'preview' ? '320px' : '100%',
                    overflowY: 'auto',
                    paddingLeft: '0 !important',
                    py: 2
                }}
                {...props}
            >
                {projectRoles.length > 0 && members.map((member: EmployeeWithProjectRoles) => {
                    const labelId = `checkbox-list-secondary-label-${member}`;
                    const labelId2 = `checkbox-list-secondary-label-${member}`;
                    return (
                        <ListItem
                            key={member.id}
                            secondaryAction={
                                mode === 'create' || mode === 'update' ?
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(member)}
                                        checked={checkedMember.indexOf(member) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    /> : ''
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar for ${member.user.first_name}`}
                                        src={`${API_URL_WITH_PUBLIC_STORAGE}/${member.user.avatar}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    className='list-item-text'
                                    id={labelId}
                                    primary={
                                        <div>
                                            <div className='lit-item'>
                                                 {member.user.full_name}
                                            </div>
                                            <div className='lit-item'>
                                                {member.user.email}
                                            </div>
                                        </div>

                                    } />

                                {
                                    mode === 'create' || mode === 'update' ?
                                    <Autocomplete
                                        size='small'
                                        defaultValue={
                                            projectRoles.find(pr => pr.id ===
                                                member.pivot.project_role_id
                                            )
                                        }
                                        getOptionLabel={(option) => option.name}
                                        disablePortal
                                        id="combo-box-project-roles"
                                        options={projectRoles}
                                        sx={{minWidth: '150px'}}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                       label="Project Role"
                                            />}
                                        onChange={(event, value, reason, details) => {
                                            if (value) {
                                                const newMembers = members.map(m => {
                                                    if (m.id === member.id) {
                                                        m.pivot.project_role_id = value.id;
                                                        return m;
                                                    } else {
                                                        return m;
                                                    }
                                                });
                                                setMembers(newMembers)
                                            }
                                        }}
                                    /> : ''
                                }
                                {
                                    mode === 'view' &&
                                    <ListItemText
                                        id={labelId}
                                        primary={
                                            <div style={{textAlign: 'end'}}>
                                                <div>
                                                    {member.level.name}
                                                </div>
                                                <div>
                                                    {member.position.name}
                                                </div>
                                            </div>
                                        }
                                    />
                                }
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            {
                mode === 'create' || mode === 'update' ?
                    <AddEmployeeToProjectModal
                        open={openEmployeeAddMoal}
                        onClose={() => setOpenEmployeeAddModal(false)}
                        onSave={addEmployeeToProjectHandle}
                        setOpen={setOpenEmployeeAddModal}
                        project={project}
                    /> : ''
            }


        </div>
    );
};

export default ProjectMemberList;




