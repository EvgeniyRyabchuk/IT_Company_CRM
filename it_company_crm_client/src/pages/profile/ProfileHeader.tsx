import React, {useState} from 'react';
import useAuth from "../../hooks/useAuth";
import {Camera, Edit} from "@mui/icons-material";
import moment from "moment";
import {UserRoleEntity} from "../../types/auth";
import '../../assets/components/Profile/index.scss';
import UserCoverImg from "../../assets/images/user/user-cover-pic.png";
// @ts-ignore
import AvatarImageCropper from "react-avatar-image-cropper";
import {EmployeeService} from "../../services/EmployeeService";
import {ComponentMode} from "../../types/global";
import ImageCropper from "../../components/UI/ImageCropper/ImageCropper";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import {defaultUserAvatar} from "../../utils/constant";
import {IconButton} from "@mui/material";

const ProfileHeader : React.FC<{userEntity: UserRoleEntity, mode: ComponentMode}>
    = ({userEntity, mode}) => {

    const { user, profile } = useAuth();
    const [imageFile, _setImageFile] = useState<any>(null);
    const [imageUrl, _setImageUrl] = useState<any>(`${API_URL_WITH_PUBLIC_STORAGE}/${user?.avatar}`
        ?? `${defaultUserAvatar}`);

    const [cropOpen, setCropOpen] = useState<boolean>(false);

    return (
        <div className="MuiPaper-root MuiPaper-elevation
                         MuiPaper-rounded MuiPaper-elevation1
                          MuiCard-root css-dz6x05">
            {
                mode === 'update' && cropOpen &&
                    <ImageCropper
                        onChange={ async (file, fileUrl) => {
                            setCropOpen(false);
                            _setImageFile(file);
                            const { data } = await EmployeeService.changeAvatar(user!.id, file);
                            console.log('change', data);
                            _setImageUrl(`${API_URL_WITH_PUBLIC_STORAGE}/${data}`);
                            profile();
                        }}

                     setOpen={setCropOpen}
                    />
            }

            <div className="MuiBox-root css-jz5wf9">
                <img width="100%" height="100%" alt="Team Member"
                     src={UserCoverImg}
                     className="object-fit: cover;" />

            </div>
            <div className="MuiBox-root css-1pz0xmx">
                <div className="MuiBox-root css-1l4w6pd">
                <span className="MuiBadge-root css-ws1fna">
                    <div className="MuiAvatar-root MuiAvatar-circular css-kmtz1r"
                    style={{}}>
                        <img alt="Team Member"
                             src={imageUrl}
                             className="MuiAvatar-img css-1hy9t21" />
                        </div>
                        <span className="MuiBadge-anchorOriginBottomRightCircular
                            MuiBadge-overlapCircular MuiBadge-badge MuiBadge-standard
                            MuiBadge-anchorOriginBottomRight css-2qc4o9">
                                <IconButton onClick={() => {
                                    setCropOpen(true);
                                }}>
                                    <Edit />
                                </IconButton>
                        </span>
                </span>
                </div>
                <div className="MuiBox-root css-1yuhvjn">
                    <h4 className=" MuiBox-root css-1b1a75p">
                        {user!.full_name}
                    </h4>
                    <div  className="MuiBox-root css-kipwca">
                        <div style={{margin: '0 10px'}} className="MuiBox-root css-70qvj9">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-oo74z7"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24">
                                <path
                                    d="M23,6.7a1.94,1.94,0,0,0-.46-1.26L20.72,3.27A.74.74,0,0,0,20.15,3h-.3a.74.74,0,0,0-.57.27L18,4.8,16.72,3.27A.74.74,0,0,0,16.15,3h-.3a.74.74,0,0,0-.57.27L13.46,5.44A1.94,1.94,0,0,0,13,6.7V8H7V6.7a1.94,1.94,0,0,0-.46-1.26L4.72,3.27A.74.74,0,0,0,4.15,3h-.3a.74.74,0,0,0-.57.27L1.46,5.44A1.94,1.94,0,0,0,1,6.7V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1ZM19,12h2v7H19Zm-2,7H3V7H5V9.5a.5.5,0,0,0,.5.5h9a.5.5,0,0,0,.5-.5V7h2m2,3V7h2v3ZM5.5,14h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,5.5,14Zm8,0h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,13.5,14Zm-4,0h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,9.5,14Z">
                                </path>
                            </svg>
                            <p className=" MuiBox-root css-1imspi1">
                                Position: {userEntity?.position.name}
                            </p>
                        </div>
                        <div style={{margin: '0 10px'}} className="MuiBox-root css-70qvj9">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-oo74z7"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24">
                                <path
                                    d="M23,6.7a1.94,1.94,0,0,0-.46-1.26L20.72,3.27A.74.74,0,0,0,20.15,3h-.3a.74.74,0,0,0-.57.27L18,4.8,16.72,3.27A.74.74,0,0,0,16.15,3h-.3a.74.74,0,0,0-.57.27L13.46,5.44A1.94,1.94,0,0,0,13,6.7V8H7V6.7a1.94,1.94,0,0,0-.46-1.26L4.72,3.27A.74.74,0,0,0,4.15,3h-.3a.74.74,0,0,0-.57.27L1.46,5.44A1.94,1.94,0,0,0,1,6.7V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1ZM19,12h2v7H19Zm-2,7H3V7H5V9.5a.5.5,0,0,0,.5.5h9a.5.5,0,0,0,.5-.5V7h2m2,3V7h2v3ZM5.5,14h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,5.5,14Zm8,0h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,13.5,14Zm-4,0h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,9.5,14Z">
                                </path>
                            </svg>
                            <p className=" MuiBox-root css-1imspi1">
                                Level: {userEntity?.level.name}
                            </p>
                        </div>

                        <div style={{margin: '0 10px'}} className="MuiBox-root css-70qvj9">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-oo74z7" focusable="false"
                                aria-hidden="true" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M14,10a2,2,0,1,1-2-2A2,2,0,0,1,14,10ZM12,4a6,6,0,0,0-6,6c0,2.8,1.18,3.74,2.82,5A9.17,9.17,0,0,1,12,18.73,9.25,9.25,0,0,1,15.18,15C16.82,13.74,18,12.8,18,10a6,6,0,0,0-6-6m0-2a8,8,0,0,1,8,8c0,6.22-5.05,6.17-6.26,9.78l-.51,1.54a1,1,0,0,1-1,.68h-.56a1,1,0,0,1-1-.68l-.51-1.54C9.05,16.17,4,16.22,4,10a8,8,0,0,1,8-8Z">
                                </path>
                            </svg>
                            <p className=" MuiBox-root css-1imspi1">New York</p>
                        </div>
                        <div style={{margin: '0 10px'}} className="MuiBox-root css-70qvj9">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-oo74z7" focusable="false"
                                aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                    d="M21,6a2,2,0,0,0-2-2H18V2.5a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5V4H8V2.5A.5.5,0,0,0,7.5,2h-1a.5.5,0,0,0-.5.5V4H5A2,2,0,0,0,3,6V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2ZM19,19H5V8H19Zm-7.5-9a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm-4,2h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v1A.5.5,0,0,0,7.5,12Zm5,4a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5Zm2.5-.5a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5Z">
                                </path>
                            </svg>
                            <p className=" MuiBox-root css-1imspi1">
                                Registration date:&nbsp;
                                {
                                    moment(user?.created_at).format('DD-MM-YYYY')
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="MuiBox-root css-1fggd7d">
                    <div className="css-4ceid9">
                        <h5 className=" MuiBox-root css-1noxpds">{userEntity?.active_project_count}</h5>
                        <p className=" MuiBox-root css-1imspi1">Active Project Count</p>
                    </div>
                    <div className="css-4ceid9">
                        <h5 className=" MuiBox-root css-fhkckm">{userEntity?.project_count}</h5>
                        <p className=" MuiBox-root css-1imspi1">Project count</p>
                    </div>
                    <div className="css-4ceid9">
                        <h5 className=" MuiBox-root css-1nast56">{userEntity?.finished_project_count}</h5>
                        <p className=" MuiBox-root css-1imspi1">Success Finihed Projects</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfileHeader;