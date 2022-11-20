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
import {useNavigate} from "react-router-dom";
import CastleIcon from "../../components/icons/CastleIcon";
import GeoPointIcon from "../../components/icons/GeoPointIcon";
import SimpleCalendarIcon from "../../components/icons/SimpleCalendarIcon";

const ProfileHeader : React.FC<{userEntity: UserRoleEntity, mode: ComponentMode}>
    = ({userEntity, mode}) => {

    const { user, profile } = useAuth();
    const [imageFile, _setImageFile] = useState<any>(null);
    const [imageUrl, _setImageUrl] =
        useState<any>(`${API_URL_WITH_PUBLIC_STORAGE}/${user?.avatar}` ?? `${defaultUserAvatar}`);

    const [cropOpen, setCropOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    return (
        <div
            className="MuiPaper-root
            MuiPaper-elevation
            MuiPaper-rounded
            MuiPaper-elevation1
            MuiCard-root css-dz6x05"
        >
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
                        }} setOpen={setCropOpen} />
            }

            <div className="MuiBox-root css-jz5wf9">
                <img width="100%"
                     height="100%"
                     alt="Team Member"
                     src={UserCoverImg}
                     className="object-fit: cover;"
                />
            </div>
            <div className="MuiBox-root css-1pz0xmx">
                <div className="MuiBox-root css-1l4w6pd">
                <span className="MuiBadge-root css-ws1fna">
                    <div className="MuiAvatar-root
                     MuiAvatar-circular
                     css-kmtz1r">
                        <img alt="Team Member"
                             src={imageUrl}
                             className="MuiAvatar-img css-1hy9t21" />
                        </div>
                        <span className="MuiBadge-anchorOriginBottomRightCircular
                            MuiBadge-overlapCircular
                            MuiBadge-badge
                            MuiBadge-standard
                            MuiBadge-anchorOriginBottomRight
                            css-2qc4o9">
                                <IconButton onClick={() => {
                                    if(mode === 'update')
                                        setCropOpen(true);
                                    else
                                        navigate('/setting/account');
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
                        <div style={{margin: '0 10px'}}
                             className="MuiBox-root css-70qvj9">
                                <CastleIcon />
                            <p className=" MuiBox-root css-1imspi1">
                                Position: {userEntity?.position.name}
                            </p>
                        </div>
                        <div style={{margin: '0 10px'}}
                             className="MuiBox-root css-70qvj9">
                                <CastleIcon />
                            <p className=" MuiBox-root css-1imspi1">
                                Level: {userEntity?.level.name}
                            </p>
                        </div>

                        <div style={{margin: '0 10px'}}
                             className="MuiBox-root css-70qvj9">
                            <GeoPointIcon />
                            <p className=" MuiBox-root css-1imspi1">New York</p>
                        </div>
                        <div style={{margin: '0 10px'}}
                             className="MuiBox-root css-70qvj9">
                            <SimpleCalendarIcon />
                            <p className="MuiBox-root css-1imspi1">
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
                        <h5 className=" MuiBox-root css-1noxpds">
                            {userEntity?.active_project_count}
                        </h5>
                        <p className=" MuiBox-root css-1imspi1"
                        >Active Project Count
                        </p>
                    </div>
                    <div className="css-4ceid9">
                        <h5 className=" MuiBox-root css-fhkckm">
                            {userEntity?.project_count}
                        </h5>
                        <p className=" MuiBox-root css-1imspi1">
                            Project count
                        </p>
                    </div>
                    <div className="css-4ceid9">
                        <h5 className=" MuiBox-root css-1nast56">
                            {userEntity?.finished_project_count}
                        </h5>
                        <p className=" MuiBox-root css-1imspi1">
                            Success Finihed Projects
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfileHeader;