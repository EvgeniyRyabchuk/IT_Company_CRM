import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, DialogActions, Fade, Modal, TextField} from "@mui/material";

import {modalStyle} from "../../../assets/components/Modals";
import {apiUrl} from "../../Chat/ChatSideBar/ChatDirect/ChatSidebarDirectItem";
import {useAction} from "../../../hooks/useAction";
import {ChatService} from "../../../services/ChatService";
import useAuth from "../../../hooks/useAuth";
import {User} from "../../../types/user";
import {ModalProps} from "../../../types/global";



const AddUserChatModal = ({open, setOpen, onClose, onSave}: ModalProps) => {

    const { user } = useAuth();
    const { createChat } = useAction();

    const [userIndentity, setUserIndentity] = useState<string>('');
    const [users, setUsers] = useState<readonly User[]>([]);
    const [selecteOption, setSelectedOption] = useState<User|null>(null);

    // const loading = open && employees.length === 0;
    const loading = open;

    const getUsers = async () : Promise<User[]> => {

        const responce = await ChatService.getUsersWithNonExistChat(user!.id);
        return responce.data;
    }

    useEffect(() => {
        console.log(123);
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
        console.log(123);
        if(selecteOption != null) {
            const toUserId = selecteOption.id;
            createChat(user!.id, toUserId);
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
                        <h1>Add chat with</h1>
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
                                    Cancel
                                </Button>

                                <Button onClick={create} color="primary" autoFocus>
                                    Add chat with user
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