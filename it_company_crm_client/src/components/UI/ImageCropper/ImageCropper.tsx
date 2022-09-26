import React, {useEffect, useState} from 'react';
// @ts-ignore
import AvatarImageCropper from "react-avatar-image-cropper";
import {EmployeeService} from "../../../services/EmployeeService";
import useAuth from "../../../hooks/useAuth";
import {Avatar, Button, IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {defaultUserAvatar} from "../../../utils/constant";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import {Box} from "@mui/system";

interface ImageCropperProps {
    setOpen: (open: boolean) => void,
    onChange: (file: any, fileUrl: string) => void,
}

const ImageCropper: React.FC<ImageCropperProps> = ({
        setOpen,
        onChange,
    }) => {

    const { user } = useAuth();

    const [url, setUrl] = useState<string>(
        `${API_URL_WITH_PUBLIC_STORAGE}/${user?.avatar}` ?? defaultUserAvatar);

    useEffect(() => {

    }, []);

    const handleImageOnChange = async (file: any) => {

        // const newImage = event.target?.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUrl(url);
            onChange(file, url);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 1,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray'
        }} >
            <div
                style={{
                    width: '500px',
                    height: '500px',
                    position: 'relative'
                }}
            >
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        position: 'absolute',*/}
                {/*        borderRadius: '300px',*/}
                {/*        border: '3px solid red',*/}
                {/*        width: 'calc(100% + 5px)',*/}
                {/*        height: 'calc(100% + 5px)',*/}
                {/*        left: '-5px',*/}
                {/*        top: '-2px',*/}
                {/*        boxSizing: 'unset'*/}
                {/*    }}*/}
                {/*></Box>*/}
                <Avatar
                    alt={'avatar'}
                    src={url}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                }}
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
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>

            </div>

        </div>

    );
};

export default ImageCropper;