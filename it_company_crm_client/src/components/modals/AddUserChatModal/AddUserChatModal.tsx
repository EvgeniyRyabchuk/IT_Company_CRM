import React, {useEffect, useRef, useState} from 'react';
import {
    Autocomplete,
    Avatar,
    Box, Button,
    DialogActions,
    Fade,
    Hidden,
    MenuItem,
    Modal,
    TextareaAutosize,
    TextField
} from "@mui/material";

import {modalStyle, Span, UserMenu} from "../../../assets/components/Modals";
import {apiUrl} from "../../Chat/ChatSideBar/ChatDirect/ChatSidebarDirectItem";
import {userId} from "../../Chat/ChatComponent";
import {useAction} from "../../../hooks/useAction";
import {ChatService} from "../../../services/ChatService";

type AddUserChatModal = {
    open: any;
    setOpen: any;
    onClose: any;
    onSave: any;
}

type User = {
    full_name: string;
    avatar: string;
    id: number;
}

const AddUserChatModal = ({open, setOpen, onClose, onSave}: AddUserChatModal) => {

    const { createChat } = useAction();

    const [userIndentity, setUserIndentity] = useState<string>('');
    const [users, setUsers] = useState<readonly User[]>([]);
    const [selecteOption, setSelectedOption] = useState<User|null>(null);

    // const loading = open && employees.length === 0;
    const loading = open;

    const getUsers = async () : Promise<User[]> => {
        const responce = await ChatService.getUsersWithNonExistChat(userId);
        return responce.data;
    }

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const usersResponse = await getUsers();

            if (active) {
                setUsers([...usersResponse]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    const onInputChange = (value: any) => {
        setUserIndentity(value);
    }

    const onChange = (e: any, value: any) => {
        setSelectedOption({...value});
    }

    const create = async () => {
        if(selecteOption != null) {
            const toUserId = selecteOption.id;
            createChat(userId, toUserId);
            onSave();
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        {/*<div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>*/}
                        {/*<div>{`inputValue: '${inputValue}'`}</div>*/}

                        <Autocomplete

                            onInputChange={(event, newInputValue) => {
                                setUserIndentity(newInputValue);
                                console.log('on input change', newInputValue)
                            }}
                            onChange={onChange}
                            id="country-select-demo"
                            sx={{ width: 300 }}
                            options={users}
                            autoHighlight
                            getOptionLabel={(option: User) => option.full_name}
                            renderOption={(props, option: User) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`${apiUrl}storage/${option.avatar}`}
                                    />

                                    {option.full_name} ({option.id})
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a country"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />


                        <DialogActions sx={{mt: 2}} >
                            <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                                <Button onClick={() => setOpen(false)} color="primary">
                                    Disagree
                                </Button>

                                <Button onClick={create} color="primary" autoFocus>
                                    Agree
                                </Button>
                            </Box>
                        </DialogActions>

                    </Box>
                </Fade>

            </Modal>
        </div>
    );
};

export default AddUserChatModal;