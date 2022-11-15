import React from 'react';
import useAuth from "../../../../hooks/useAuth";
import {UserRoleEntity} from "../../../../types/auth";
import {User} from "../../../../types/user";
import {ChatMessage} from "../../../../types/chat";
import moment from "moment/moment";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../../http";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import {employeeLinkTitleIcon} from "../../../../utils/constant";
import EditPenIcon from "../../../../components/icons/EditPenIcon";
import ProjectArrowRightIcon from "../../../../components/icons/ProjectArrowRightIcon";
import ProfileEmailIcon from "../../../../components/icons/ProfileItems/ProfileEmailIcon";
import BrowserIcon from "../../../../components/icons/BrowserIcon";
import ProfilePersonIcon from "../../../../components/icons/ProfileItems/ProfilePersonIcon";
import ProfileCalendarIcon from "../../../../components/icons/ProfileItems/ProfileCalendarIcon";
import ProfileBagIcon from "../../../../components/icons/ProfileItems/ProfileBagIcon";
import ProfileEducationIcon from "../../../../components/icons/ProfileItems/ProfileEducationIcon";

const ProfileOverview : React.FC<{
    userEntity: UserRoleEntity,
    lastChatsContacts: { user: User, lastMessage: ChatMessage }[]
}> = ({userEntity, lastChatsContacts}) => {

    const { user } = useAuth();

    return (
        <div className="MuiTabPanel-root css-1445d4x"
             role="tabpanel"
             aria-labelledby="mui-p-92261-T-1"
             id="mui-p-92261-P-1"
        >

            <div className="MuiBox-root css-178yklu">
                <div className="MuiGrid-root
                    MuiGrid-container
                    MuiGrid-spacing-xs-3
                    css-1h77wgb">
                    <div className="MuiGrid-root
                                MuiGrid-item
                                MuiGrid-grid-xs-12
                                MuiGrid-grid-md-8
                                MuiGrid-grid-lg-9 css-1oxda6x">
                        <div className="css-ovnx7g">
                            <div
                                className="MuiPaper-root
                                MuiPaper-elevation
                                MuiPaper-rounded
                                MuiPaper-elevation1
                                MuiCard-root
                                css-14lzsk6">
                                <div className="MuiBox-root css-1lekzkb">
                                    <h5 className=" MuiBox-root css-42oadk">
                                        Summary
                                    </h5>
                                    <button
                                        className="MuiButtonBase-root
                                        MuiIconButton-root
                                        MuiIconButton-sizeMedium
                                        css-1ln8k10"
                                        tabIndex={0} type="button">
                                            <EditPenIcon />
                                            <span className="MuiTouchRipple-root css-w0pj6f">
                                            </span>
                                    </button>
                                </div>
                                <p className=" MuiBox-root css-1eqx9kr">
                                    {user?.about}
                                </p>
                            </div>
                            <div className="MuiPaper-root
                                MuiPaper-elevation
                                MuiPaper-rounded
                                MuiPaper-elevation1
                                MuiCard-root
                                css-14lzsk6">
                                <div className="MuiBox-root css-1gbbedy">
                                    <h5 className=" MuiBox-root css-42oadk">
                                        Skills
                                    </h5>
                                    <button
                                        className="MuiButtonBase-root
                                         MuiIconButton-root
                                         MuiIconButton-sizeMedium
                                         css-1ln8k10"
                                        tabIndex={0} type="button">
                                        <EditPenIcon />
                                        <span className="MuiTouchRipple-root css-w0pj6f">
                                        </span>
                                    </button>
                                </div>
                                <div className="css-p58oka">
                                    {
                                         userEntity?.skills.map(skill =>
                                            <div key={skill.id}
                                                 className="MuiChip-root
                                                 MuiChip-filled
                                                 MuiChip-sizeMedium
                                                 MuiChip-colorDefault
                                                 MuiChip-filledDefault
                                                 css-1uxsrdt">
                                                <span
                                                    className="MuiChip-label
                                                    MuiChip-labelMedium
                                                    css-9iedg7">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        )
                                    }
                                    { userEntity?.skills.length === 0 && 'not skills yet' }
                                </div>
                            </div>

                            <div
                                className="MuiPaper-root
                                MuiPaper-elevation
                                MuiPaper-rounded
                                MuiPaper-elevation1
                                MuiCard-root css-14lzsk6">
                                <h5 className=" MuiBox-root css-1d2ltpw">Recently added to Project</h5>
                                <div className="simplebar-content-wrapper"
                                     tabIndex={0}
                                     role="region"
                                     aria-label="scrollable content"
                                     style={{
                                         height: 'auto',
                                         overflow: 'hidden'
                                     }}>
                                    <div className="simplebar-content" style={{padding: '0px'}}>
                                        <table className="MuiTable-root css-wqyv36">
                                            <tbody className="MuiTableBody-root
                                            css-blw62a">
                                            {
                                                userEntity?.projects.slice(0, 5).map(project =>
                                                    <tr key={project.id} className="MuiTableRow-root css-i8cgtw">
                                                        <td
                                                            className="MuiTableCell-root MuiTableCell-body
                                                             MuiTableCell-sizeMedium css-u38vlr">
                                                            <div className="css-1t62lt9">
                                                                <div className="MuiBox-root css-w1xgtm">
                                                                    <ProjectArrowRightIcon />
                                                                </div>
                                                                <div className="MuiBox-root css-0">
                                                                    <h6 className=" MuiBox-root css-us4jxz">
                                                                        {project.name}
                                                                    </h6>
                                                                    <p className=" MuiBox-root css-19w7ywv">
                                                                        {project.project_type.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className="MuiTableCell-root
                                                            MuiTableCell-body
                                                            MuiTableCell-sizeMedium css-u38vlr"
                                                        >
                                                            <small className=" MuiBox-root css-c1178r">
                                                                Deadline:&nbsp;
                                                                { project.deadline ? moment(project.deadline)
                                                                        .format('DD-MM-YYYY') :
                                                                    'no deadline yet'
                                                                }
                                                            </small></td>
                                                        <td
                                                            className="MuiTableCell-root
                                                            MuiTableCell-body
                                                            MuiTableCell-sizeMedium
                                                            css-u38vlr"
                                                        >
                                                            <div className="css-av3g5w">
                                                                <div
                                                                    className="MuiAvatarGroup-root
                                                                    css-1xz63kp"
                                                                >
                                                                    <AvatarGroup max={4}>
                                                                        {
                                                                            project.employees
                                                                            .map(employee =>
                                                                                <Avatar
                                                                                    key={employee.id}
                                                                                    alt="Remy Sharp"
                                                                                    src={`${API_URL_WITH_PUBLIC_STORAGE}/${employee.user.avatar}`}
                                                                                />
                                                                            )
                                                                        }
                                                                    </AvatarGroup>
                                                                    <div
                                                                        className="MuiAvatar-root
                                                                         MuiAvatar-circular
                                                                         MuiAvatarGroup-avatar
                                                                         css-bqtng4">
                                                                        <img
                                                                            src="/static/avatar/001-man.svg"
                                                                            className="MuiAvatar-img css-1hy9t21"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="MuiGrid-root
                        MuiGrid-item
                        MuiGrid-grid-xs-12
                        MuiGrid-grid-md-4
                        MuiGrid-grid-lg-3
                        css-6fiaes">
                        <div className="css-ovnx7g">
                            <div
                                className="MuiPaper-root
                                MuiPaper-elevation
                                MuiPaper-rounded
                                MuiPaper-elevation1
                                MuiCard-root
                                css-14lzsk6">
                                <h5 className="MuiBox-root css-42oadk">
                                    My Connections
                                </h5>
                                <div className="css-7kd3vg"
                                     style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                                    { lastChatsContacts.map(contact =>
                                        <div key={contact.user.id} className="css-vb6e92">
                                            <div className="MuiAvatar-root MuiAvatar-circular css-bqtng4">
                                                <img
                                                    src={`${API_URL_WITH_PUBLIC_STORAGE}/${contact.user.avatar}`}
                                                    className="MuiAvatar-img css-1hy9t21"/>
                                            </div>
                                            <div className="css-1s4yypy">
                                                <h5  style={{textAlign: 'left'}}
                                                     className=" MuiBox-root css-snuja5">
                                                    {contact.user.full_name}
                                                </h5>
                                                <p style={{textAlign: 'left'}}
                                                   className=" MuiBox-root css-34ybk9">
                                                    {contact.lastMessage ?
                                                        moment(contact.lastMessage.created_at)
                                                            .format('DD-MM-YYYY HH:mm')
                                                        : 'no message yet'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className="MuiPaper-root
                                MuiPaper-elevation
                                MuiPaper-rounded
                                MuiPaper-elevation1
                                MuiCard-root
                                css-14lzsk6">
                                <div className="MuiBox-root css-1lekzkb">
                                    <h5 className=" MuiBox-root css-42oadk">
                                        Additional Details
                                    </h5>
                                    <button
                                        className="MuiButtonBase-root
                                        MuiIconButton-root
                                        MuiIconButton-sizeMedium
                                        css-1ln8k10"
                                        tabIndex={0}
                                        type="button">
                                            <EditPenIcon />
                                        <span className="MuiTouchRipple-root css-w0pj6f">
                                        </span>
                                    </button>
                                </div>
                                <div className="css-xfv19q">
                                    <div className="css-1iwoqsn">
                                        <div className="css-rw47nr">
                                            <ProfileEmailIcon />
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p  style={{textAlign: 'left'}}
                                                className=" MuiBox-root css-1imspi1">
                                                Email
                                            </p>
                                            <h6  style={{textAlign: 'left'}}
                                                 className=" MuiBox-root css-11tyiws">
                                                {user!.email}
                                            </h6>
                                        </div>
                                    </div>

                                    {
                                        userEntity.employee_links.map(e =>
                                            <div key={e.id} className="css-1iwoqsn" >
                                                <div className="css-7ygi04" style={{
                                                    minWidth: '30px',
                                                    minHeight: '30px'
                                                }}>
                                                    {
                                                        employeeLinkTitleIcon.find(icon =>
                                                            e.title === icon.title
                                                        )?.icon ?? <BrowserIcon />
                                                    }
                                                </div>
                                                <div className="MuiBox-root css-0">
                                                    <p style={{textAlign: 'left'}}
                                                       className=" MuiBox-root css-1imspi1">
                                                        {e.title}
                                                    </p>
                                                    <a style={{
                                                        textAlign: 'justify',
                                                        overflowWrap: 'anywhere',
                                                        display: 'block'
                                                    }} href={e.link}>
                                                        {e.link}
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="css-1iwoqsn">
                                        <div className="css-1logtda">
                                            <ProfilePersonIcon />
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p style={{textAlign: 'left'}}
                                               className=" MuiBox-root css-1imspi1">
                                                Last Time Updated
                                            </p>
                                            <h6 style={{textAlign: 'left'}}
                                                className=" MuiBox-root css-11tyiws">
                                                {
                                                    moment(user?.updated_at)
                                                        .format('DD-MM-YYYY HH:mm')
                                                }
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="css-1iwoqsn">
                                        <div className="css-8y5xau">
                                            <ProfileCalendarIcon />
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p style={{textAlign: 'left'}}
                                               className=" MuiBox-root css-1imspi1">
                                                Last Account Updated At
                                            </p>
                                            <h6 style={{textAlign: 'left'}}
                                                className=" MuiBox-root css-11tyiws">
                                                Aug 15th, 2021
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="css-1iwoqsn">
                                        <div className="css-1vn0olo">
                                            <ProfileBagIcon />
                                        </div>
                                        {
                                            user?.phones.map((phone, index) =>
                                                <div key={phone.id} className="MuiBox-root css-0">
                                                    <p style={{textAlign: 'left'}}
                                                       className=" MuiBox-root css-1imspi1">
                                                        Phone #{index+1}
                                                    </p>
                                                    <h6 style={{textAlign: 'left'}}
                                                        className=" MuiBox-root css-11tyiws"
                                                    >
                                                        {phone.phone_number}
                                                    </h6>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="css-1iwoqsn">
                                        <div className="css-5d6cuf">
                                            <ProfileEducationIcon />
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p style={{textAlign: 'left'}}
                                               className=" MuiBox-root css-1imspi1">
                                                Education
                                            </p>
                                            <h6 style={{textAlign: 'left'}}
                                                className=" MuiBox-root css-11tyiws">
                                                Cambridge University
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;