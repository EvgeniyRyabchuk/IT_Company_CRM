import React, {useEffect, useMemo, useState} from 'react';
import useAuth from "../../../../hooks/useAuth";
import {
    RoleEntity,
    UserRoleEntity
} from "../../../../types/auth";
import {User} from "../../../../types/user";
import {ChatMessage} from "../../../../types/chat";
import moment from "moment/moment";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../../http";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

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
                <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb">
                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12
                                MuiGrid-grid-md-8
                                MuiGrid-grid-lg-9 css-1oxda6x">
                        <div className="css-ovnx7g">
                            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <div className="MuiBox-root css-1lekzkb">
                                    <h5 className=" MuiBox-root css-42oadk">Summary</h5>
                                    <button
                                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1ln8k10"
                                        tabIndex={0} type="button">
                                        <svg
                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-7j775m"
                                            focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                            data-testid="EditIcon">
                                            <path
                                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                                            </path>
                                        </svg>
                                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                                    </button>
                                </div>
                                <p className=" MuiBox-root css-1eqx9kr">
                                    {user?.about}
                                </p>
                            </div>
                            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <div className="MuiBox-root css-1gbbedy">
                                    <h5 className=" MuiBox-root css-42oadk">Skills</h5>
                                    <button
                                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1ln8k10"
                                        tabIndex={0} type="button">
                                        <svg
                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-7j775m"
                                            focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                            data-testid="EditIcon">
                                            <path
                                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                                            </path>
                                        </svg>
                                        <span className="MuiTouchRipple-root css-w0pj6f"></span></button>
                                </div>
                                <div className="css-p58oka">
                                    {
                                         userEntity?.skills.map(skill =>
                                            <div key={skill.id}
                                                 className="MuiChip-root MuiChip-filled MuiChip-sizeMedium
                                             MuiChip-colorDefault MuiChip-filledDefault css-1uxsrdt">
                                                <span className="MuiChip-label MuiChip-labelMedium css-9iedg7">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        )
                                    }
                                    { userEntity?.skills.length === 0 && 'not skills yet' }

                                </div>
                            </div>

                            <div
                                className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded
                                MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <h5 className=" MuiBox-root css-1d2ltpw">Teams</h5>
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
                                            <tbody className="MuiTableBody-root css-blw62a">
                                            {
                                                userEntity?.projects.slice(0, 5).map(project =>
                                                    <tr key={project.id} className="MuiTableRow-root css-i8cgtw">
                                                        <td
                                                            className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-u38vlr">
                                                            <div className="css-1t62lt9">
                                                                <div className="MuiBox-root css-w1xgtm">
                                                                    <svg
                                                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-svogci"
                                                                        focusable="false"
                                                                        aria-hidden="true"
                                                                        viewBox="0 0 24 24">
                                                                        <path
                                                                            d="M10.67,3a2,2,0,0,1,1.42.59l7.62,7.62a1,1,0,0,1,.29.7v.18a1,1,0,0,1-.29.7l-7.62,7.62a2,2,0,0,1-1.42.59H4a1,1,0,0,1-1-1V18.51a1,1,0,0,1,.42-.81l3.32-2.37A3,3,0,0,0,8,12.88V11.12A3,3,0,0,0,6.74,8.67L3.42,6.3A1,1,0,0,1,3,5.49V4A1,1,0,0,1,4,3Z">
                                                                        </path>
                                                                    </svg>
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
                                                        <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-u38vlr">
                                                            <small className=" MuiBox-root css-c1178r">
                                                                Deadline:&nbsp;
                                                                { project.deadline ? moment(project.deadline)
                                                                        .format('DD-MM-YYYY') :
                                                                    'no deadline yet'
                                                                }
                                                            </small></td>
                                                        <td className="MuiTableCell-root MuiTableCell-body
                                                                        MuiTableCell-sizeMedium css-u38vlr">
                                                            <div className="css-av3g5w">
                                                                <div className="MuiAvatarGroup-root css-1xz63kp">
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
                                                                    <div className="MuiAvatar-root MuiAvatar-circular
                                                                                     MuiAvatarGroup-avatar css-bqtng4">
                                                                        <img
                                                                            src="/static/avatar/001-man.svg"
                                                                            className="MuiAvatar-img css-1hy9t21"/>
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

                            {/*
                               <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <div className="MuiBox-root css-mjbegz">
                                    <h5 className=" MuiBox-root css-42oadk">Post</h5>
                                    <div className="css-1f0z28c">
                                        <button
                                            className="MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root  css-fae1sq"
                                            tabIndex={0} type="button"><span
                                            className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9"><svg
                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-bbh01c"
                                            focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                    <path
                                                        d="M16.81,10a.5.5,0,0,1,0,.7L8.75,18.79a2,2,0,0,1-.68.45L3.73,21a.5.5,0,0,1-.54-.11l0,0A.5.5,0,0,1,3,20.27l1.72-4.34a2,2,0,0,1,.45-.68l8.07-8.07a.5.5,0,0,1,.71,0ZM20.56,4.1l-.66-.66A1.5,1.5,0,0,0,18.84,3h-.76A1.5,1.5,0,0,0,17,3.44L15.19,5.27a.5.5,0,0,0,0,.7L18,8.82a.5.5,0,0,0,.71,0L20.56,7A1.5,1.5,0,0,0,21,5.92V5.16A1.5,1.5,0,0,0,20.56,4.1Z">
                                                    </path>
                                                </svg></span>Create a post<span className="MuiTouchRipple-root css-w0pj6f"></span></button>
                                    </div>
                                </div>
                                <div className="css-7kd3vg">
                                    <div className="MuiBox-root css-1lekzkb">
                                        <div className="css-1s4yypy">
                                            <h6 className=" MuiBox-root css-us4jxz">The International on the way
                                                2021</h6>
                                            <div className="MuiBox-root css-12434f1">
                                                <svg
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-toqyyf"
                                                    focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21,6a2,2,0,0,0-2-2H18V2.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V4H8V2.5A.5.5,0,0,0,7.5,2h-1a.5.5,0,0,0-.5.5V4H5A2,2,0,0,0,3,6V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2ZM19,19H5V8H19Zm-7.5-9a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm-4,2h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,7.5,12Zm5,4a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5Zm2.5-.5a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5Z">
                                                    </path>
                                                </svg>
                                                <p className=" MuiBox-root css-19w7ywv">Publish on Nov 21, 2021</p>
                                            </div>
                                        </div>
                                        <div className="MuiBox-root css-1hht1kx">
                                            <img src="/static/post/1.png" width="100%" alt="Post"/></div>
                                    </div>
                                    <div className="MuiBox-root css-1lekzkb">
                                        <div className="css-1s4yypy">
                                            <h6 className=" MuiBox-root css-us4jxz">Global Warming Conclusion</h6>
                                            <div className="MuiBox-root css-12434f1">
                                                <svg
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-toqyyf"
                                                    focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21,6a2,2,0,0,0-2-2H18V2.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V4H8V2.5A.5.5,0,0,0,7.5,2h-1a.5.5,0,0,0-.5.5V4H5A2,2,0,0,0,3,6V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2ZM19,19H5V8H19Zm-7.5-9a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm-4,2h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,7.5,12Zm5,4a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5Zm2.5-.5a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5Z">
                                                    </path>
                                                </svg>
                                                <p className=" MuiBox-root css-19w7ywv">Publish on Aug 21, 2021</p>
                                            </div>
                                        </div>
                                        <div className="MuiBox-root css-1hht1kx">
                                            <img src="/static/post/2.png"
                                                 width="100%"
                                                 alt="Post"/></div>
                                    </div>
                                    <div className="MuiBox-root css-1lekzkb">
                                        <div className="css-1s4yypy">
                                            <h6 className=" MuiBox-root css-us4jxz">Crypto is the future</h6>
                                            <div className="MuiBox-root css-12434f1">
                                                <svg
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-toqyyf"
                                                    focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21,6a2,2,0,0,0-2-2H18V2.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V4H8V2.5A.5.5,0,0,0,7.5,2h-1a.5.5,0,0,0-.5.5V4H5A2,2,0,0,0,3,6V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2ZM19,19H5V8H19Zm-7.5-9a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm-4,2h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,7.5,12Zm5,4a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5Zm2.5-.5a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5Z">
                                                    </path>
                                                </svg>
                                                <p className=" MuiBox-root css-19w7ywv">Publish on Jun 21, 2021</p>
                                            </div>
                                        </div>
                                        <div className="MuiBox-root css-1hht1kx">
                                            <img src="/static/post/3.png"
                                                 width="100%"
                                                 alt="Post"/></div>
                                    </div>
                                </div>
                            </div>
                            <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <div className="MuiBox-root css-1gbbedy">
                                    <h5 className=" MuiBox-root css-42oadk">Portfolio</h5>
                                    <button
                                        className="MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root  css-fae1sq"
                                        tabIndex={0} type="button"><span
                                        className="MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9"><svg
                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-bbh01c"
                                        focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                        data-testid="EditIcon">
                                                <path
                                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                                                </path>
                                            </svg></span>Add new<span
                                        className="MuiTouchRipple-root css-w0pj6f"></span></button>
                                </div>
                                <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb">
                                    <div
                                        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-4 css-170ukis">
                                        <div
                                            className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1p95gxy">
                                            <img
                                                className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img css-rhsghg"
                                                src="/static/portfolio/1.png" height="152" />
                                            <div className="MuiBox-root css-1oqkb2r">
                                                <h6 className=" MuiBox-root css-us4jxz">12</h6>
                                                <p className=" MuiBox-root css-1imspi1">Jan</p>
                                            </div>
                                            <div className="MuiCardContent-root css-10ip570">
                                                <div className="MuiBox-root css-gg4vpm"><small
                                                    className="MuiBox-root css-1mlr01t">Minimal</small>
                                                    <button
                                                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-175xwoe"
                                                        tabIndex={0} type="button">
                                                        <svg
                                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dnjvn4"
                                                            focusable="false" aria-hidden="true"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                d="M22,8.5A5.5,5.5,0,0,0,16.5,3,6.36,6.36,0,0,0,12,5.07,6.36,6.36,0,0,0,7.5,3,5.5,5.5,0,0,0,2,8.5C2,12.42,6.75,16.75,9,19l2.28,2.28a.75.75,0,0,0,.53.22h.38a.75.75,0,0,0,.53-.22L15,19C17.25,16.75,22,12.42,22,8.5Z">
                                                            </path>
                                                        </svg>
                                                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                                                    </button>
                                                </div>
                                                <div className="MuiBox-root css-1jkp9i7">
                                                    <div className="MuiBox-root css-1hw29i9">
                                                        <h6 className=" MuiBox-root css-us4jxz">Hollow
                                                            Purple</h6>
                                                        <p className=" MuiBox-root css-1imspi1">12.00 Nov 21, 2021</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-4 css-170ukis">
                                        <div
                                            className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1p95gxy">
                                            <img
                                                className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img css-rhsghg"
                                                src="/static/portfolio/2.png" height="152" />
                                            <div className="MuiBox-root css-1oqkb2r">
                                                <h6 className=" MuiBox-root css-us4jxz">12</h6>
                                                <p className=" MuiBox-root css-1imspi1">Jan</p>
                                            </div>
                                            <div className="MuiCardContent-root css-10ip570">
                                                <div className="MuiBox-root css-gg4vpm">
                                                    <small className="MuiBox-root css-1mlr01t">Dark</small>
                                                    <button
                                                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-175xwoe"
                                                        tabIndex={0} type="button">
                                                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dnjvn4"
                                                             focusable="false" aria-hidden="true"
                                                             viewBox="0 0 24 24">
                                                            <path
                                                                d="M22,8.5A5.5,5.5,0,0,0,16.5,3,6.36,6.36,0,0,0,12,5.07,6.36,6.36,0,0,0,7.5,3,5.5,5.5,0,0,0,2,8.5C2,12.42,6.75,16.75,9,19l2.28,2.28a.75.75,0,0,0,.53.22h.38a.75.75,0,0,0,.53-.22L15,19C17.25,16.75,22,12.42,22,8.5Z">
                                                            </path>
                                                        </svg>
                                                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                                                    </button>
                                                </div>
                                                <div className="MuiBox-root css-1jkp9i7">
                                                    <div className="MuiBox-root css-1hw29i9">
                                                        <h6 className=" MuiBox-root css-us4jxz">Red Blood</h6>
                                                        <p className=" MuiBox-root css-1imspi1">12.00 Nov 21, 2021</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-4 css-170ukis">
                                        <div
                                            className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1p95gxy">
                                            <img
                                                className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img css-rhsghg"
                                                src="/static/portfolio/3.png" height="152" />
                                            <div className="MuiBox-root css-1oqkb2r">
                                                <h6 className=" MuiBox-root css-us4jxz">12</h6>
                                                <p className=" MuiBox-root css-1imspi1">Jan</p>
                                            </div>
                                            <div className="MuiCardContent-root css-10ip570">
                                                <div className="MuiBox-root css-gg4vpm"><small
                                                    className="MuiBox-root css-1mlr01t">Light</small>
                                                    <button
                                                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-175xwoe"
                                                        tabIndex={0} type="button">
                                                        <svg
                                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dnjvn4"
                                                            focusable="false" aria-hidden="true"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                d="M22,8.5A5.5,5.5,0,0,0,16.5,3,6.36,6.36,0,0,0,12,5.07,6.36,6.36,0,0,0,7.5,3,5.5,5.5,0,0,0,2,8.5C2,12.42,6.75,16.75,9,19l2.28,2.28a.75.75,0,0,0,.53.22h.38a.75.75,0,0,0,.53-.22L15,19C17.25,16.75,22,12.42,22,8.5Z">
                                                            </path>
                                                        </svg>
                                                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                                                    </button>
                                                </div>
                                                <div className="MuiBox-root css-1jkp9i7">
                                                    <div className="MuiBox-root css-1hw29i9">
                                                        <h6 className=" MuiBox-root css-us4jxz">Lime Blue</h6>
                                                        <p className=" MuiBox-root css-1imspi1">12.00 Nov 21, 2021</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            */}



                        </div>
                    </div>
                    <div
                        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12
                        MuiGrid-grid-md-4 MuiGrid-grid-lg-3 css-6fiaes">
                        <div className="css-ovnx7g">
                            <div
                                className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded
                                 MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <h5 className=" MuiBox-root css-42oadk">My Connections</h5>
                                <div className="css-7kd3vg" style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                                    { lastChatsContacts.map(contact =>
                                        <div key={contact.user.id} className="css-vb6e92">
                                            <div className="MuiAvatar-root MuiAvatar-circular css-bqtng4">
                                                <img src={`${API_URL_WITH_PUBLIC_STORAGE}/${contact.user.avatar}`}
                                                     className="MuiAvatar-img css-1hy9t21"/>
                                            </div>
                                            <div className="css-1s4yypy">
                                                <h5  style={{textAlign: 'left'}} className=" MuiBox-root css-snuja5">
                                                    {contact.user.full_name}
                                                </h5>
                                                <p style={{textAlign: 'left'}} className=" MuiBox-root css-34ybk9">
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
                                className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                                <div className="MuiBox-root css-1lekzkb">
                                    <h5 className=" MuiBox-root css-42oadk">Additional Details</h5>
                                    <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1ln8k10"
                                            tabIndex={0}
                                            type="button">
                                        <svg
                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-7j775m"
                                            focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                            data-testid="EditIcon">
                                            <path
                                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                                            </path>
                                        </svg>
                                        <span className="MuiTouchRipple-root css-w0pj6f"></span></button>
                                </div>
                                <div className="css-xfv19q">
                                    <div className="css-1iwoqsn">
                                        <div className="css-rw47nr">
                                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-svogci"
                                                 focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                <path
                                                    d="M20,4H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4Zm0,2V8.9l-7.35,5.15a1.14,1.14,0,0,1-1.3,0L4,8.9V6ZM4,18V11l6.35,4.44a2.88,2.88,0,0,0,3.3,0L20,11v7Z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p  style={{textAlign: 'left'}} className=" MuiBox-root css-1imspi1">Email</p>
                                            <h6  style={{textAlign: 'left'}} className=" MuiBox-root css-11tyiws">{user!.email}</h6>
                                        </div>
                                    </div>
                                    <div className="css-1iwoqsn">
                                        <div className="css-7ygi04">
                                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-fhllnu"
                                                 focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                <path
                                                    d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm6.92,8H16.35a14.12,14.12,0,0,0-1.18-5.23A7,7,0,0,1,18.92,11Zm-6.47,8L12,19l-.45,0c-.91-.57-2-2.76-2.14-6h5.18C14.41,16.22,13.36,18.41,12.45,19Zm-3-8c.18-3.22,1.23-5.41,2.14-6L12,5l.45,0c.91.57,2,2.76,2.14,6ZM8.83,5.77A14.12,14.12,0,0,0,7.65,11H5.08A7,7,0,0,1,8.83,5.77ZM5.08,13H7.65a14.12,14.12,0,0,0,1.18,5.23A7,7,0,0,1,5.08,13Zm10.09,5.23A14.12,14.12,0,0,0,16.35,13h2.57A7,7,0,0,1,15.17,18.23Z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p style={{textAlign: 'left'}} className=" MuiBox-root css-1imspi1">Language</p>
                                            <h6 style={{textAlign: 'left'}} className=" MuiBox-root css-11tyiws">English, Spanish</h6>
                                        </div>
                                    </div>
                                    <div className="css-1iwoqsn">
                                        <div className="css-1logtda">
                                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-gy8yp"
                                                 focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                <path
                                                    d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,12,6Zm7.89,12.55L18,14.66A3,3,0,0,0,15.26,13H8.74a3,3,0,0,0-2.69,1.66L4.11,18.55A1,1,0,0,0,5,20H19A1,1,0,0,0,19.89,18.55ZM6.62,18l1.22-2.45a1,1,0,0,1,.9-.55h6.52a1,1,0,0,1,.9.55L17.38,18Z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p style={{textAlign: 'left'}} className=" MuiBox-root css-1imspi1">Last Time Updated</p>
                                            <h6 style={{textAlign: 'left'}} className=" MuiBox-root css-11tyiws">
                                                {
                                                    moment(user?.updated_at)
                                                        .format('DD-MM-YYYY HH:mm')
                                                }
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="css-1iwoqsn">
                                        <div className="css-8y5xau">
                                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-9owwds"
                                                 focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                <path
                                                    d="M21,6a2,2,0,0,0-2-2H18V2.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V4H8V2.5A.5.5,0,0,0,7.5,2h-1a.5.5,0,0,0-.5.5V4H5A2,2,0,0,0,3,6V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2ZM19,19H5V8H19Zm-7.5-9a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm-4,2h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,7.5,12Zm5,4a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5Zm2.5-.5a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5Z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p style={{textAlign: 'left'}} className=" MuiBox-root css-1imspi1">Last Account Updated At</p>
                                            <h6 style={{textAlign: 'left'}} className=" MuiBox-root css-11tyiws">Aug 15th, 2021</h6>
                                        </div>
                                    </div>
                                    <div className="css-1iwoqsn">
                                        <div className="css-1vn0olo">
                                            <svg
                                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-9uuq9k"
                                                focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                <path
                                                    d="M10,14v-.5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5V14a1,1,0,0,1-1,1H11A1,1,0,0,1,10,14ZM22,9V19a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V9A2,2,0,0,1,4,7H7V5A2,2,0,0,1,9,3h6a2,2,0,0,1,2,2V7h3A2,2,0,0,1,22,9ZM9,7h6V5H9ZM20,9H4V19H20Z">
                                                </path>
                                            </svg>
                                        </div>
                                        {
                                            user?.phones.map((phone, index) =>
                                                <div className="MuiBox-root css-0">
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
                                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-19wnlds"
                                                focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                                <path
                                                    d="M22,9.92V20.5a.5.5,0,0,1-.5.5h-.75a.5.5,0,0,1-.5-.5V11.6l-7.14,5.14a1.49,1.49,0,0,1-.84.26h-.54a1.49,1.49,0,0,1-.84-.26L2.22,10.49A.49.49,0,0,1,2,10.08V9.92a.49.49,0,0,1,.22-.41l8.67-6.25A1.49,1.49,0,0,1,11.73,3h.54a1.49,1.49,0,0,1,.84.26l8.67,6.25A.49.49,0,0,1,22,9.92Zm-9.73,8.83h-.54a3.33,3.33,0,0,1-1.87-.59L6,15.37V17c0,2.21,2.69,4,6,4s6-1.79,6-4V15.37l-3.9,2.81A3.25,3.25,0,0,1,12.27,18.75Z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="MuiBox-root css-0">
                                            <p style={{textAlign: 'left'}} className=" MuiBox-root css-1imspi1">Education</p>
                                            <h6 style={{textAlign: 'left'}} className=" MuiBox-root css-11tyiws">Cambridge University</h6>
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