import React, {useEffect, useMemo, useState} from 'react';
import {Autocomplete, Box, Button, DialogActions, Fade, Modal, TextField} from "@mui/material";
import {modalStyle} from "../../../assets/components/Modals";
import {apiUrl} from "../../Chat/ChatSideBar/ChatDirect/ChatSidebarDirectItem";
import {Project} from "../../../types/project";
import {EmployeeService} from "../../../services/EmployeeService";
import {Employee} from "../../../types/user";
import {ModalProps} from "../../../types/global";
import {FlexJustifyCenter} from "../../../assets/components/Shared";

type AddUserToProjectChatModal = ModalProps & {
    project: Project | null | undefined;
    currentMemberList?: Employee[];
}

const AddEmployeeToProjectModal =
    ({open, setOpen, onClose, onSave, project, currentMemberList}:
         AddUserToProjectChatModal) => {

        console.log(currentMemberList, 'modal1')
    const [userIndentity, setEmployeeIndentity] = useState<string>('');
    const [employees, setEmployees] = useState<readonly Employee[]>([]);
    const [selectedOption, setSelectedOption] = useState<Employee|null>(null);

    const loading = open;

    // avoiding double adding an employee
    const filteredEmployee = useMemo<Employee[]>(() => {
        if(currentMemberList) {
            const filtered = [];
            for (let i of employees) {
                const exist = currentMemberList.find(e => e.user.id === i.user.id);
                if(!exist) filtered.push(i);
            }
            return filtered;
        }
        return [...employees];
    }, [currentMemberList, employees])

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
                        <h1>Add employee to project</h1>
                        <Autocomplete
                            onInputChange={(event, newInputValue) => {
                                setEmployeeIndentity(newInputValue);
                            }}
                            onChange={onChange}
                            id="employee-select"
                            sx={{ width: 300 }}
                            options={filteredEmployee}
                            autoHighlight
                            getOptionLabel={(option: Employee) => option.user.full_name}
                            renderOption={(props, option: Employee) => (
                                <Box component="li"
                                     sx={{
                                         '& > img': { mr: 2, flexShrink: 0 }
                                     }}
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
                                        // disable autocomplete and autofill
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />

                        <DialogActions sx={{mt: 2}} >
                            <FlexJustifyCenter sx={{ width: '100%' }}>
                                <Button autoFocus onClick={() => {
                                    onSave(selectedOption);
                                    onClose();
                                }} color="primary">
                                    Add
                                </Button>
                                <Button onClick={() => setOpen(false)}  color="primary" >
                                    Cancel
                                </Button>
                            </FlexJustifyCenter>
                        </DialogActions>
                    </Box>
                </Fade>
            </Modal>
    );
};

export default AddEmployeeToProjectModal;