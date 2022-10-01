import React from 'react';
import './index.css';
import {Project} from "../../../../types/project";
import {Computer} from "@mui/icons-material";
import moment from "moment";
import {Grid} from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../../http";
import {useNavigate} from "react-router-dom";

const ProfileProjectList : React.FC<{projects: Project[]}> = ({projects}) => {

    const navigate = useNavigate();
    
    return (
        <div className="MuiBox-root css-1phy807">
            <Grid container spacing={10} className="MuiGrid-root MuiGrid-container css-1h77wgb">
                {
                    projects.map(project =>
                        <Grid key={project.id}
                              item
                              xs={12}
                              sm={6}
                              md={4}
                             className="MuiGrid-root css-1twzmnh"
                        >
                            <div
                                onClick={() => {
                                    navigate(`/projects/${project.id}`);
                                }}
                                className="project-box MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <div className="MuiBox-root css-1lekzkb">
                                    <div className="MuiBox-root css-1g86e6t"> 
                                        <Computer />
                                    </div>
                                    <p
                                        style={{ backgroundColor: project.order?.status.bgColor}}
                                        className=" MuiBox-root css-tuzptp">
                                        {project.order?.status.name}
                                    </p>
                                </div>
                                <h5 className=" MuiBox-root css-19thmws">
                                    {project.name}
                                </h5>
                                <p
                                    className="project-item MuiBox-root css-1imspi1">
                                    {
                                        project.order?.about
                                    }
                                </p>
                                <div className="css-3de75">
                            <span className="MuiLinearProgress-root
                            MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-3bkacx"
                                  role="progressbar" >
                                <span className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary
                                MuiLinearProgress-bar1Determinate css-17jm9ao"
                                      style={{transform: 'translateX(-30%)'}}>
                                </span>
                            </span>
                                    <h6 className=" MuiBox-root css-11tyiws">70%</h6>
                                </div>
                                <div className="MuiBox-root css-1lekzkb">
                                    <AvatarGroup max={4}>
                                        {
                                            project.employees
                                                .map(employee =>
                                                    <Avatar alt="Remy Sharp"
                                                        src={`${API_URL_WITH_PUBLIC_STORAGE}/${employee.user.avatar}`}
                                                    />
                                                )
                                        }
                                    </AvatarGroup>
                                    <small className=" MuiBox-root css-1laq4cc">
                                        Days until the deadline&nbsp;
                                        {
                                            moment(project.deadline).diff(moment(), 'days')
                                        }
                                    </small>
                                </div>
                            </div>
                        </Grid>
                    )
                }

            </Grid>
        </div>
       )
};

export default ProfileProjectList;