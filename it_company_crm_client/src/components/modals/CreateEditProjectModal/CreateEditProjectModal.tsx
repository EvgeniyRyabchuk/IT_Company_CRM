//example of creating a mui dialog modal for creating new rows
import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {
    Autocomplete,
    Button,
    Card, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from "@mui/material";
import {Box, styled} from "@mui/system";

import {Formik, FormikProps, FormikValues} from 'formik';
import * as Yup from "yup";
// @ts-ignore
import AvatarImageCropper from "react-avatar-image-cropper";
import {
    EmployeeWithProjectRoles,
    Project,
    ProjectLink,
    ProjectRole,
    ProjectTag,
    ProjectType
} from "../../../types/project";
import {ProjectService} from "../../../services/ProjectService";
import {Order} from "../../../types/order";
import moment from "moment";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import {Add, Delete, PlusOne} from "@mui/icons-material";
import AddEmployeeToProjectModal from "../AddEmployeeToProjectModal/AddEmployeeToProjectModal";
import {Dayjs} from 'dayjs';
import Stack from '@mui/material/Stack';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {random} from "lodash";

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
    width: 100,
    height: 100,
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary,
    position: 'absolute',
    marginTop: '20px'

}));

const UploadButton = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    border: "2px solid",
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.palette.background.paper,
    backgroundColor: theme.palette.secondary
}));

const SwitchWrapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
}));

/*

 Project Name
 Project Type
 Add Member (with role)
 Add Link
 Deadline
 Budget
 Tags

 */

// form field validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required!'),
    project_type_id: Yup.string().required('Project Type is required!'),
    // deadline: Yup.string().required('Deadline is required!'),
    // budget: Yup.number().required("Budget is Required!"),
});

interface InitialValueType {
    id?: number | null;
    name: string;
    project_type_id: string;
    members: EmployeeWithProjectRoles[],
    links: ProjectLink[],
    deadline: string;
    budget: string;
    tags: string;
}

export const CreateEditProjectModal: FC<{
    onClose: () => void;
    onSubmit: (orderId: number | undefined, values: any, mode: string) => void;
    open: boolean;
    mode: string;
    order: Order;
}> = ({ open, onClose, onSubmit, mode, order }) => {

    console.log(order, 'order');

    const formik = useRef<FormikProps<FormikValues>>(null);
    const innerForm = useRef<any>();

    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
    const [projectRoles, setProjectRoles] = useState<ProjectRole[]>([]);
    const [projectTags, setProjectTags] = useState<ProjectTag[]>([]);

    const [projectLinks, setProjectLinks] = useState<ProjectLink[]>([]);

    const defInitialValues = useMemo<any>(() => {
        return {
            id: null,
            name: '',
            project_type_id: null,
            members: [],
            links: [],
            deadline: moment().add(1, 'days'),
            budget: 0,
            tags: '',
        }
    }, [])

    const initialValues = useMemo<InitialValueType>(() => {
        if(mode === 'update' && order?.project) {
            return {
                id: order.project.id,
                name: order.project.name,
                project_type_id: order.project.project_type.id,
                members: order.project.employees,
                links: order.project.project_links,
                deadline: order.project.deadline,
                budget: order.project.budget,
                tags: order.project.tags.join(','),
            };
        }
        else if(mode === 'create') {
            return defInitialValues;
        }
        return defInitialValues;
    }, [open]);

    const handleFormSubmit = (values: InitialValueType) => {
        console.log('create edit project submit');

        const payload : any = { ...values };

        if(mode === 'update' && order?.project && order) payload.id = order.project.id

        payload.deadline = moment(payload.deadline).format('DD-MM-yyyy')
        payload.members = JSON.stringify(members.map(m => m.pivot));
        payload.links = JSON.stringify(projectLinks);
        payload.tags = JSON.stringify(payload.tags)
        payload.order_id = order.id
        onSubmit(order.id, payload, mode);
        onClose();

        console.log(payload);
    };

    useEffect(() => {
        if(open) {
            const getProjectTypes = async () => {
                const { data } = await ProjectService.getProjectTypes();
                setProjectTypes([...data]);
            }
            const getProjectRoles = async () => {
                const { data } = await ProjectService.getProjectRoles();
                setProjectRoles([...data]);
            }
            const getProjectTagsOptions = async () => {
                const {data} = await ProjectService.getProjectTags();
                setProjectTags([...data]);
            }


            getProjectTypes();
            getProjectRoles();
            getProjectTagsOptions();

            if(mode === 'update') {
                setMembers([...order.project.employees]);
                setProjectLinks([...order.project.project_links]);
            }
        }
        else {
            setCheckedMember([]);
            setMembers([]);
            setProjectLinks([]);

        }
    }, [open])

    const [checkedMember, setCheckedMember] = React.useState<EmployeeWithProjectRoles[]>([]);
    const [members, setMembers] = React.useState<EmployeeWithProjectRoles[]>(
        order?.project?.employees ?? []
    );

    const handleToggle = (value: any) => () => {
        const currentIndex = checkedMember.indexOf(value);
        const newChecked = [...checkedMember];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedMember(newChecked);
    };

    const [openEmployeeAddMoal, setOpenEmployeeAddModal] = useState<boolean>(false);

    const addEmployeeToProjectHanle = (employee: EmployeeWithProjectRoles) => {
        setMembers([...members, {...employee, pivot:
                {
                    employee_id: employee.id,
                    project_role_id: 1,
                    project_id: 1
                }}
        ]);
    }

    const deleteMember = async () => {

        const _delete = () => {
            const newMembers = [...members];
            for (let memeber of members) {
                const find = checkedMember.find(e => e.id === memeber.id);
                if(find) {
                    const index = newMembers.indexOf(memeber);
                    newMembers.splice(index, 1);
                }
            }
            setMembers(newMembers);
        }
        if(mode === 'update' && order && order.project) {
            if(checkedMember.length == 1) {
                    // const { data } =
                    //     await ProjectService.deleteEmployeeFromProject
                    //     (checkedMember[0].id, order.project.id);
            }
            else if (checkedMember.length > 1) {
                // const { data } = await
                //     ProjectService.deleteManyEmployeesFromProject(
                //         checkedMember.map(e => e.id), order.project.id
                // );
            }
        }
        _delete();
    }

    const projectTagsForAutocompliteOptionDefault = useMemo<string[]>(() => {
            if(order && order.project && mode === 'update')
                return order.project.tags.map(e => e.name);
            else return [];
    }, [order]);


    console.log(members);

    return (
        <Dialog
            maxWidth="lg"
            open={open}
            style={{zIndex: '1001'}}
        >

            <DialogTitle textAlign="center">Create New Project </DialogTitle>
            <DialogContent sx={{paddingTop: '20px !important'}}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue
                      }) => (
                        <form id="inner-form" onSubmit={handleSubmit}>
                <Box pt={2} pb={4}>
                    <Card sx={{ padding: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Card
                                    sx={{
                                        padding: '5px',
                                        boxShadow: 2,
                                        minHeight: 400,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <Button
                                            variant='contained'
                                            color={'primary'}
                                            onClick={() => setOpenEmployeeAddModal(true)}
                                        >
                                            <Add />
                                        </Button>
                                        <Button
                                            style={{display: checkedMember.length > 0 ? 'block' : 'none',}}
                                            variant='contained'
                                            color={'error'}
                                            onClick={deleteMember}
                                        >
                                            <Delete/>
                                        </Button>
                                    </div>

                                    <List
                                        dense
                                        sx={{
                                            width: '100%',
                                            maxWidth: 500,
                                            bgcolor: 'background.paper',
                                            height: '220px',
                                            overflowY: 'auto',

                                        }}>

                                        {projectRoles.length > 0 && members.map((value: EmployeeWithProjectRoles) => {
                                            const labelId = `checkbox-list-secondary-label-${value}`;
                                            return (
                                                <ListItem
                                                    key={value.id}
                                                    secondaryAction={
                                                        <Checkbox
                                                            edge="end"
                                                            onChange={handleToggle(value)}
                                                            checked={checkedMember.indexOf(value) !== -1}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                alt={`Avatar for ${value.user.first_name}`}
                                                                src={`${API_URL_WITH_PUBLIC_STORAGE}/${value.user.avatar}`}
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText id={labelId} primary={`${value.user.full_name}`} />

                                                        <Autocomplete
                                                            size='small'
                                                            defaultValue={
                                                                projectRoles.find(pr => pr.id ===
                                                                    value.pivot.project_role_id
                                                                )
                                                            }
                                                            getOptionLabel={(option) => option.name}
                                                            disablePortal
                                                            id="combo-box-project-roles"
                                                            options={projectRoles}
                                                            sx={{ minWidth: '150px' }}
                                                            renderInput={(params) =>
                                                                <TextField {...params}
                                                                           label="Project Role"
                                                                />}
                                                            onChange={(event, value, reason, details) => {
                                                                if(value) {
                                                                    const newMembers = members.map(m => {
                                                                        if(m.id === value.id) {
                                                                            m.pivot.project_role_id = value.id;
                                                                            return m;
                                                                        }
                                                                        else { return m;}
                                                                    });
                                                                    setMembers(newMembers)
                                                                }
                                                            }}
                                                        />

                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>


                                    <div style={{
                                        padding: '0 10px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '235px',
                                        overflowY: 'auto',
                                        marginTop: "10px",
                                        width: '100%',
                                        paddingTop: '20px'
                                    }}>

                                        {
                                            projectLinks.map(link =>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'start',
                                                    alignItems: 'center',
                                                    height: '50px',
                                                    margin: '5px 0'
                                                }}>
                                                    <div key={link.id}>
                                                        <Button
                                                            color='error'
                                                            onClick={() => {
                                                                const index = projectLinks.findIndex(l => l.id === link.id);
                                                                projectLinks.splice(index, 1);
                                                                setProjectLinks([...projectLinks]);
                                                            }}
                                                        >
                                                            <Delete />
                                                        </Button>
                                                    </div>
                                                    <div style={{ margin: '0 3px'}}>
                                                        <Autocomplete
                                                            defaultValue={link.title}
                                                            value={link.title}
                                                            onChange={(event: any, value) => {
                                                               const newLinks = projectLinks.map((l) => {
                                                                   if(l.id === link.id) {
                                                                       l.title = value ?? '';
                                                                       return l;
                                                                   }
                                                                   else return l;
                                                               });
                                                               setProjectLinks([...newLinks]);
                                                            }}
                                                            freeSolo
                                                            style={{height: '100%', width: '120px'}}
                                                            size='small'
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={['GitHub', 'Jira']}
                                                            sx={{ width: '100%' }}
                                                            renderInput={(params) =>
                                                                <TextField {...params} label="Link Titles" />}
                                                        />
                                                    </div>

                                                    <div style={{flexGrow: 1, margin: '0 3px'}}>
                                                        <TextField
                                                            style={{ width: '100%'}}
                                                            label="Url"
                                                            id="outlined-size-small"
                                                            defaultValue={link.link}
                                                            size="small"
                                                            onChange={(event: any) => {
                                                                const newLinks = projectLinks.map((l) => {
                                                                    if(l.id === link.id) {
                                                                        l.link = event.target.value ?? '';
                                                                        return l;
                                                                    }
                                                                    else return l;
                                                                });
                                                                setProjectLinks([...newLinks]);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }


                                        <Button
                                            variant="outlined"
                                            color='primary'
                                            style={{width: '100%'}}
                                            onClick={() => {
                                                setProjectLinks([...projectLinks, {
                                                    id: random(1, 100000),
                                                    title: '',
                                                    project_id: order.project?.id ?? 1,
                                                    link: ''
                                                }])
                                            }}
                                        >
                                            <Add/>

                                        </Button>
                                    </div>

                                </Card>
                            </Grid>

                            <Grid item md={6} xs={12}>

                                            <Card sx={{ padding: 3, boxShadow: 2 }}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="input"
                                                            name="name"
                                                            label="Project Name"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            helperText={touched.name && errors.name}
                                                            error={Boolean(errors.name && touched.name)}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid sx={{mt: 2}} container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <div style={{display: 'flex'}}>
                                                            <Autocomplete
                                                                fullWidth
                                                                defaultValue={mode === 'update' && order && order.project ? order.project.project_type : null}
                                                                size="small"
                                                                getOptionLabel={(option: ProjectType) => option.name}
                                                                disablePortal
                                                                id="combo-box-types"
                                                                options={projectTypes}
                                                                sx={{ width: 500 }}

                                                                renderInput={
                                                                    (params) =>
                                                                        <TextField
                                                                            {...params}
                                                                            error={
                                                                                Boolean(touched.project_type_id && errors.project_type_id)
                                                                            }
                                                                            fullWidth
                                                                            helperText={
                                                                                touched.project_type_id && errors.project_type_id
                                                                            }
                                                                            label="Project Type"
                                                                            name="project_type_id"
                                                                            variant="outlined"
                                                                        />
                                                                }
                                                                renderOption={(props, option: ProjectType) => (
                                                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                                        {option.name} ({option.id})
                                                                    </Box>
                                                                )}
                                                                onChange={ (event: any, values: any) => {
                                                                    if(values)
                                                                        setFieldValue("project_type_id", values.id);
                                                                }}
                                                            />

                                                        </div>
                                                    </Grid>

                                                    <Grid item sm={6} xs={12}>
                                                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                                            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                                                            <Input
                                                                id="standard-adornment-amount"
                                                                value={values.budget}
                                                                onChange={(event: any) => {
                                                                    const value = event.target.value;
                                                                    if(value)
                                                                        setFieldValue("budget", value);
                                                                }}
                                                                startAdornment={
                                                                <InputAdornment position="start">$</InputAdornment>
                                                            }
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item sm={6} xs={12}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <Stack spacing={3}>
                                                                <DesktopDatePicker
                                                                    label="Date desktop"
                                                                    inputFormat="DD/MM/YYYY"
                                                                    value={values.deadline}
                                                                    onChange={(newValue) => {
                                                                        if(newValue)
                                                                            setFieldValue("deadline", newValue);
                                                                    }}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                />
                                                            </Stack>
                                                        </LocalizationProvider>
                                                    </Grid>
                                                    <Grid item sm={12}
                                                          style={{
                                                              height: '200px',
                                                              overflowY: 'auto',
                                                              marginTop: '20px'
                                                    }}
                                                    >
                                                        <Autocomplete
                                                            multiple
                                                            id="tags-filled"
                                                            options={projectTags.map(tag => tag.name) ?? []}
                                                            defaultValue={[...projectTagsForAutocompliteOptionDefault]}
                                                            freeSolo
                                                            renderTags={(value: readonly string[], getTagProps) =>
                                                                value.map((option: string, index: number) => (
                                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                                ))
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    variant="filled"
                                                                    label="freeSolo"
                                                                    placeholder="Favorites"
                                                                />)}
                                                            onChange={(event, value, reason, details) => {
                                                                if(value)
                                                                    setFieldValue('tags', value)
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>


                                                <Grid sx={{mt: 2}} container spacing={3}>
                                                    <Grid item sm={6} xs={12}>

                                                    </Grid>
                                                    <Grid item sm={6} xs={12}>

                                                    </Grid>
                                                </Grid>
                                            </Card>
                            </Grid>

                        </Grid>
                    </Card>
                </Box>
                </form>
            )}
        </Formik>


                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        type='submit'
                        form="inner-form"
                        onClick={() => {
                            innerForm.current?.handleSubmit();
                        }}>
                        { mode === 'create' ? 'Create New Project' : 'Update Project Information' }
                    </Button>
                </DialogActions>

            </DialogContent>


            <AddEmployeeToProjectModal
                open={openEmployeeAddMoal}
                onClose={() => setOpenEmployeeAddModal(false)}
                onSave={addEmployeeToProjectHanle}
                setOpen={setOpenEmployeeAddModal}
                project={order?.project}
            />



        </Dialog>
    );
};

export default CreateEditProjectModal;
