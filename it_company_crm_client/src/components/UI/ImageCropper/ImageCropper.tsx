import React, {useEffect, useState} from 'react';
// @ts-ignore
import AvatarImageCropper from "react-avatar-image-cropper";
import {EmployeeService} from "../../../services/EmployeeService";
import useAuth from "../../../hooks/useAuth";
import {Avatar, Button, IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {defaultUserAvatar} from "../../../utils/constant";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import {Box, styled} from "@mui/system";
import {CropContent, CropWrapper} from "../../../assets/UI/ImageCropper";

interface ImageCropperProps {
    setOpen: (open: boolean) => void,
    onChange: (file: any, fileUrl: string) => void,
}
const avatarStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
};

const ImageCropper: React.FC<ImageCropperProps> = ({
        setOpen,
        onChange,
    }) => {

    const { user } = useAuth();
    const [url, setUrl] = useState<string>(
        `${API_URL_WITH_PUBLIC_STORAGE}/${user?.avatar}` ?? defaultUserAvatar);

    const handleImageOnChange = async (file: any) => {
        // const newImage = event.target?.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUrl(url);
            onChange(file, url);
        }
    };

    return (
        <CropWrapper>
            <CropContent>
                <Avatar
                    alt={'avatar'}
                    src={url}
                    sx={avatarStyle}
                />
                <AvatarImageCropper
                    apply={(e: any) => handleImageOnChange(e)}
                    // icon={ <IconButton component="span">
                    //     <PhotoCamera sx={{ fontSize: 30, color: "white" }} />
                    // </IconButton>}
                />
                <Button
                    sx={{mt: 5}}
                    variant='contained'
                    onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </CropContent>
        </CropWrapper>

    );
};

export default ImageCropper;