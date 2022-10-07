import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, DialogActions, Fade, Modal, TextField} from "@mui/material";

import {modalStyle} from "../../../assets/components/Modals";
import {apiUrl} from "../../Chat/ChatSideBar/ChatDirect/ChatSidebarDirectItem";
import useAuth from "../../../hooks/useAuth";
import {Project} from "../../../types/project";
import {EmployeeService} from "../../../services/EmployeeService";
import {Employee} from "../../../types/user";
import {ModalProps} from "../../../types/global";

type AddUserChatModal = ModalProps & {
    project: Project | null | undefined;
}

type User = {
    full_name: string;
    avatar: string;
    id: number;
}

const AddEmployeeToProjectModal = ({open, setOpen, onClose, onSave, project}: AddUserChatModal) => {

    const { user } = useAuth();

    const [userIndentity, setEmployeeIndentity] = useState<string>('');
    const [employees, setEmployees] = useState<readonly Employee[]>([]);
    const [selectedOption, setSelectedOption] = useState<Employee|null>(null);

    // const loading = open && employees.length === 0;
    const loading = open;

    const getEmployees = async () : Promise<Employee[]> => {

        if(project) {
            const { data } = await EmployeeService.getEmployees(
                `?non-exist-in-project-id=${project.id}&perPage=all`
            );
            return data.data;
        }
        const { data } = await EmployeeService.getEmployees();
        return data.data;
    }

    useEffect(() => {

        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const employeeResponse = await getEmployees();

            if (active) {
                setEmployees([...employeeResponse]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    const onInputChange = (value: any) => {
        setEmployeeIndentity(value);
    }

    const onChange = (e: any, value: any) => {
        setSelectedOption({...value});
    }




    return (
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
                    <Box sx={modalStyle} >
                        {/*<div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>*/}
                        {/*<div>{`inputValue: '${inputValue}'`}</div>*/}
                        <h1>Add employee to project</h1>
                        <Autocomplete

                            onInputChange={(event, newInputValue) => {
                                setEmployeeIndentity(newInputValue);
                                console.log('on input change', newInputValue)
                            }}
                            onChange={onChange}
                            id="country-select-demo"
                            sx={{ width: 300 }}
                            options={employees}
                            autoHighlight
                            getOptionLabel={(option: Employee) => option.user.full_name}
                            renderOption={(props, option: Employee) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                     {...props}>

                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`${apiUrl}storage/${option.user.avatar}`}
                                    />

                                    {option.user.full_name} ({option.id})
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a employee"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />


                        <DialogActions sx={{mt: 2}} >
                            <Box style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                                <Button autoFocus onClick={() => {
                                    console.log('selected')
                                    onSave(selectedOption);
                                    onClose();
                                }} color="primary">
                                    Add
                                </Button>

                                <Button onClick={() => setOpen(false)}  color="primary" >
                                    Cancel
                                </Button>
                            </Box>
                        </DialogActions>

                    </Box>
                </Fade>

            </Modal>
    );
};

export default AddEmployeeToProjectModal;