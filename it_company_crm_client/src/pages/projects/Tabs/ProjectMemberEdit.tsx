import React, {useState} from 'react';
import {Button, IconButton} from "@mui/material";
import {Close, Edit} from "@mui/icons-material";
import ProjectMemberList from "../../../components/UI/ProjectMemberList";
import {ProjectService} from "../../../services/ProjectService";
import {Project} from "../../../types/project";
import {PublicOrderInfo} from "../../../types/order";

const ProjectMemberEdit : React.FC<{
        project: Project,
        setProject: (data: Project) => void,
        orderInfo: PublicOrderInfo,
        newMembers: any[],
        setNewMembers: (data: any) => void,
    }> = ({project, setProject, orderInfo, newMembers, setNewMembers}) => {

    const [memberEditMode, setMemberEditMode] = useState<boolean>(false);

    const save = async () => {
        const payload : any = { ...project};
        payload.members = JSON.stringify(newMembers.map(m => m.pivot));
        payload.tags = project.tags.map(t => t.name).join(',');
        payload.order_id = orderInfo.id;
        payload.links = JSON.stringify(project.project_links);

        const { data: updatedProject } =
            await ProjectService.updateProject(project.id, payload);
        setProject({...updatedProject});
        setMemberEditMode(false);
    }

    return (
       <>
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
                       maxWidth: '100%',
                       minHeight: '300px'
                   }}
               />
           }
           {
               memberEditMode && project && orderInfo &&
               <Button
                   variant='contained'
                   color='primary'
                   onClick={save}
               >
                   Save
               </Button>
           }
       </>
    );
};

export default ProjectMemberEdit;