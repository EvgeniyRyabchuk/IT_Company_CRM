import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {
    Autocomplete,
    Button,
    Card,
    Chip,
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
import {EmployeeWithProjectRoles, ProjectLink, ProjectTag, ProjectType} from "../../../types/project";
import {ProjectService} from "../../../services/ProjectService";
import {Order} from "../../../types/order";
import moment from "moment";
import {Add, Delete} from "@mui/icons-material";
import {Dayjs} from 'dayjs';
import Stack from '@mui/material/Stack';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {random} from "lodash";
import ProjectMemberList from "../../UI/ProjectMemberList";
import {ComponentMode, LinkIcon, ModalProps, ProjectSocialLinkTitle} from "../../../types/global";
import {projectLinkTitleIcon} from "../../../utils/constant";

// @ts-ignore
export const CreateProjectCard = styled(Box)(({ theme}) => ({
    height: '100%',
    padding: '5px',
    boxShadow: 2,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: 'relative'
}));

// @ts-ignore
export const CreateProjectLinkCard = styled(Box)(({ theme}) => ({
    height: '100%',
    padding: '5px',
    boxShadow: 2,
    minHeight: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: 'relative'
}));

// form field validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required!'),
    project_type_id: Yup.string().required('Project Type is required!'),
    deadline: Yup.string().required('Deadline is required!'),
    budget: Yup.number().required("Budget is Required!"),
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

export const CreateEditProjectModal: FC<ModalProps & {
    mode: ComponentMode;
    order: Order;
}> = ({ open, onClose, onSave, mode, order }) => {


    const linkResourceOptions = [
        ProjectSocialLinkTitle.GITHUB,
        ProjectSocialLinkTitle.JIRA,
        ProjectSocialLinkTitle.MAIL_SERVICE,
        ProjectSocialLinkTitle.HOST,
        ProjectSocialLinkTitle.EXTERNAL_LINK
    ];

    const formik = useRef<FormikProps<FormikValues>>(null);
    const innerForm = useRef<any>();

    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);

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
        const payload : any = { ...values };

        if(mode === 'update' && order?.project && order) payload.id = order.project.id

        const deadline = payload.deadline;

        const formatedDeadline = moment(deadline).format('DD-MM-yyyy');

        payload.deadline = formatedDeadline;
        payload.members = JSON.stringify(members.map(m => m.pivot));
        payload.links = JSON.stringify(projectLinks);
        payload.tags = JSON.stringify(payload.tags)
        payload.order_id = order.id
        onSave(order.id, payload, mode);
        onClose();
    };

    useEffect(() => {
        if(open) {
            const getProjectTypes = async () => {
                const { data } = await ProjectService.getProjectTypes();
                setProjectTypes([...data]);
            }

            const getProjectTagsOptions = async () => {
                const {data} = await ProjectService.getProjectTags();
                setProjectTags([...data]);
            }

            getProjectTypes();

            getProjectTagsOptions();

            if(mode === 'update') {
                setMembers([...order.project.employees]);
                setProjectLinks([...order.project.project_links]);
            }
        }
        else {
            // setCheckedMember([]);
            setMembers([]);
            setProjectLinks([]);
        }
    }, [open])


    const [members, setMembers] = React.useState<EmployeeWithProjectRoles[]>(
        order?.project?.employees ?? []
    );

    const projectTagsForAutocompliteOptionDefault = useMemo<string[]>(() => {
        if(order && order.project && mode === 'update')
            return order.project.tags.map(e => e.name);
        else return [];
    }, [order]);

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
                                    <CreateProjectCard>
                                        <div style={{
                                            height: '320px',
                                            overflowY: 'auto'
                                        }}>
                                            <h3 className='text-center'>Members</h3>
                                            <ProjectMemberList
                                                members={members}
                                                setMembers={setMembers}
                                                mode={mode}
                                                project={order?.project}
                                            />
                                        </div>

                                        <h3 className='text-center'>External Links</h3>
                                        <CreateProjectLinkCard>
                                            <Box sx={{ minHeight: "400px" }}>
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
                                                                        const index =
                                                                            projectLinks.findIndex(l =>
                                                                                l.id === link.id);
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
                                                                        const newLinks =
                                                                            projectLinks.map((l) => {
                                                                            if(l.id === link.id) {
                                                                                l.title = value ?? '';
                                                                                return l;
                                                                            }
                                                                            else return l;
                                                                        });
                                                                        setProjectLinks([...newLinks]);
                                                                    }}
                                                                    style={{
                                                                        height: '100%',
                                                                        width: '120px',
                                                                        zIndex: '999999'
                                                                    }}
                                                                    size='small'
                                                                    disablePortal
                                                                    id="combo-box-project-roles"
                                                                    renderOption={(props, option) => (
                                                                        <Box
                                                                            component="li"
                                                                            sx={{ '& > img': { mr: 2, flexShrink: 0 }}}
                                                                            {...props}>
                                                                            <div
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px',
                                                                                    marginRight: '10px'
                                                                                }}>
                                                                                {
                                                                                    projectLinkTitleIcon.find((lti: LinkIcon) =>
                                                                                        option === lti.title)!.icon
                                                                                }
                                                                            </div>
                                                                            { option }
                                                                        </Box>
                                                                    )}
                                                                    options={linkResourceOptions}
                                                                    sx={{ width: '100%' }}
                                                                    renderInput={(params) =>
                                                                        <TextField {...params} label="Link Titles" />}
                                                                />
                                                            </div>

                                                            <div style={{
                                                                flexGrow: 1,
                                                                margin: '0 3px'
                                                            }}>
                                                                <TextField
                                                                    style={{ width: '100%'}}
                                                                    label="Url"
                                                                    id="outlined-size-small"
                                                                    defaultValue={link.link}
                                                                    size="small"
                                                                    onChange={(event: any) => {
                                                                        const newLinks =
                                                                            projectLinks.map((l) => {
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
                                            </Box>
                                        </CreateProjectLinkCard>
                                        <Button
                                            variant="contained"
                                            color='primary'
                                            style={{width: '100%'}}
                                            onClick={() => {
                                                setProjectLinks([...projectLinks, {
                                                    id: random(1, 100000),
                                                    title: '',
                                                    project_id: order.project?.id ?? 1,
                                                    link: ''
                                                }])
                                            }}>
                                            <Add/>
                                        </Button>
                                    </CreateProjectCard>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Card sx={{ padding: 3, boxShadow: 2, height: '100%' }}>
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
                                                        defaultValue={
                                                        mode === 'update' &&
                                                        order && order.project
                                                            ? order.project.project_type
                                                            : null}
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
                                                                        Boolean(touched.project_type_id
                                                                            && errors.project_type_id)
                                                                    }
                                                                    fullWidth
                                                                    helperText={
                                                                        touched.project_type_id
                                                                        && errors.project_type_id
                                                                    }
                                                                    label="Project Type"
                                                                    name="project_type_id"
                                                                    variant="outlined"
                                                                />
                                                        }
                                                        renderOption={(props, option: ProjectType) => (
                                                            <Box component="li"
                                                                 sx={{ '& > img':
                                                                         { mr: 2, flexShrink: 0 }
                                                                }}
                                                                {...props}>
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
                                                    <InputLabel htmlFor="standard-adornment-amount">
                                                        Amount
                                                    </InputLabel>
                                                    <Input
                                                        id="standard-adornment-amount"
                                                        value={values.budget}
                                                        onChange={(event: any) => {
                                                            const value = event.target.value;
                                                            if(value)
                                                                setFieldValue("budget", value);
                                                        }}
                                                        startAdornment={
                                                        <InputAdornment position="start">
                                                            $
                                                        </InputAdornment>
                                                    }
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item sm={6} xs={12}>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}>
                                                    <Stack spacing={3}>
                                                        <DesktopDatePicker
                                                            label="Deadline date"
                                                            inputFormat="DD-MM-YYYY"
                                                            value={values.deadline}
                                                            onChange={(newValue: Dayjs | null) => {
                                                                if(newValue)
                                                                    setFieldValue('deadline', newValue.toDate());
                                                            }}
                                                            renderInput={(params) =>
                                                                <TextField {...params} />}
                                                        />
                                                    </Stack>
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item sm={12}
                                                  style={{
                                                      height: '200px',
                                                      overflowY: 'auto',
                                                      marginTop: '20px',
                                                }}>
                                                <Autocomplete
                                                    multiple
                                                    id="tags-filled"
                                                    options={projectTags.map(tag => tag.name) ?? []}
                                                    defaultValue={[...projectTagsForAutocompliteOptionDefault]}
                                                    freeSolo
                                                    renderTags={(value: readonly string[], getTagProps) =>
                                                        value.map((option: string, index: number) => (
                                                            <Chip variant="outlined"
                                                                  label={option}
                                                                  {...getTagProps({ index })}
                                                            />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="filled"
                                                            label="Project Tags"
                                                            placeholder="Favorites"
                                                        />)}
                                                    onChange={(event, value, reason, details) => {
                                                        if(value)
                                                            setFieldValue('tags', value)
                                                    }}
                                                />
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
                        { mode === 'create' ?
                            'Create New Project'
                            : 'Update Project Information'
                        }
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEditProjectModal;
