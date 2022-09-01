//example of creating a mui dialog modal for creating new rows
import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {Employee, Level, Position, Role, Skill} from "../../../types/user";
import {
    Autocomplete,
    Avatar,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import {Box, styled} from "@mui/system";

import {Formik, FormikProps, FormikValues} from 'formik';
import * as Yup from "yup";
import {Delete, PhotoCamera} from "@mui/icons-material";
import {Small, Tiny} from "../../../assets/typography/FormTypography";
import {EmployeeService} from "../../../services/EmployeeService";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import {defaultUserAvatar} from "../../../utils/constant";
// @ts-ignore
import AvatarImageCropper from "react-avatar-image-cropper";
import AuthService from "../../../services/AuthService";
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


// form field validation schema
const validationSchema = Yup.object().shape({

    first_name: Yup.string().required('First Name is required!'),
    last_name: Yup.string().required('Last Name is required!'),
    middle_name: Yup.string().required('Middle Name is required!'),
    email: Yup.string().email().required("Email is Required!"),
    position_id: Yup.number().required("Position is required"),
    level_id: Yup.number().required('Level is required'),

});

interface InitialValueType {
    id?: number | null;
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    position_id: number | null;
    level_id: number | null;
    skills: string;
    roles: string;
    avatar: string;
    newAvatar?: any;
}

export const CreateEditEmployeeModal: FC<{
    onClose: () => void;
    onSubmit: (values: Employee, mode: string) => void;
    open: boolean;
    mode: string;
    employee?: Employee
}> = ({ open, onClose, onSubmit, mode, employee }) => {

    const formik = useRef<FormikProps<FormikValues>>(null);
    const innerForm = useRef<any>();

    const [positions, setPositions] = useState<Position[]>([]);
    const [levels, setLevels] = useState<Level[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const defInitialValues = useMemo<any>(() => {
        return {
            id: null,
            first_name: '123',
            last_name: '123',
            middle_name: '123',
            email: 'evgeniy@gmail.com',
            position_id: null,
            level_id: null,
            skills: '',
            roles: '',
            avatar: ''
        }
    }, [])

    const initialValues = useMemo<InitialValueType>(() => {
        if(mode === 'update' && employee) {
            return {
                id: employee.id,
                first_name: employee.user.first_name,
                last_name: employee.user.last_name,
                middle_name: employee.user.middle_name,
                email: employee.user.email,
                position_id: employee.position.id,
                level_id: employee.level.id,
                skills: employee.skills.map((e: Skill) => e.name).join(','),
                roles:  employee.user.roles.map((e: Skill) => e.name).join(','),
                avatar: employee.user.avatar,
            };
        }
        else if(mode === 'create') {
            return defInitialValues;
        }
        return defInitialValues;
    }, [open]);

    const [imageUrl, _setImageUrl] = useState<any>(null);
    const [imageFile, _setImageFile] = useState<any>(null);

    const handleFormSubmit = (values: any) => {
        console.log('create edit employee submit');
        if(imageFile !== null) {
            values.newAvatar = imageFile;
        }
        if(mode === 'update' && employee) values.id = employee.id
        onSubmit(values, mode);
        onClose();
        console.log(values);
    };

    const getLevels = async (values: any) => {
        console.log(values);
        const { data } = await EmployeeService.getLevels(values.id);
        setLevels([...data]);
    }

    useEffect(() => {
        if(open) {
            const getRoles = async () => {
                const { data } = await AuthService.getRoles();
                setRoles([...data]);
            }
            const getPositions = async () => {
                const { data } = await EmployeeService.getPositions();
                setPositions([...data]);
            }
            const getSkills = async () => {
                const { data } = await EmployeeService.getSkills();
                setSkills([...data]);
            }
            if(mode === 'update' && employee) {
                getLevels(employee.level);
            }
            getRoles();
            getPositions();
            getSkills();
            if(employee && mode === 'update') {
                setImageUrl(`${API_URL_WITH_PUBLIC_STORAGE}/${employee.user.avatar}`);
            }
        }
        else {
            if(imageUrl) setImageUrl(null);
            if(imageFile) _setImageFile(null);
        }
    }, [open])


    const cleanup = () => {
        URL.revokeObjectURL(imageUrl);
        _setImageFile(null);
        // inputFileRef.current.value = null;
    };
    // crop image
    const setImageUrl = (newImage: any) => {
        if (imageUrl) {
            cleanup();
        }
        _setImageUrl(newImage);
    };
    const handleImageOnChange = (file: any, formikSetter: any) => {
        // const newImage = event.target?.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            _setImageFile(file);
            // formikSetter('newAvatar', file);
        }
    };
    const cleanImage = (event: any) => {
        if (imageUrl) {
            event.preventDefault();
            setImageUrl(null);
        }
    };


    return (
        <Dialog
            maxWidth="lg"
            open={open}
            style={{zIndex: '3000'}}
        >

            <DialogTitle textAlign="center">Create New Employee Account</DialogTitle>
            <DialogContent sx={{paddingTop: '20px !important'}}>

                    <Box pt={2} pb={4}>
                        <Card sx={{ padding: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item md={4} xs={12}>
                                    <Card
                                        sx={{
                                            padding: 3,
                                            boxShadow: 2,
                                            minHeight: 400,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            position: 'relative'
                                        }}
                                    >


                                        <Avatar
                                            alt={employee?.user.first_name}
                                            src={imageUrl ?? defaultUserAvatar}
                                            sx={{width: 150, height: 150}}
                                        />
                                        {/*<form onSubmit={(e: any) => {*/}
                                        {/*    e.preventDefault();*/}
                                        {/*    e.stopPropagation();*/}

                                        {/*}}>*/}
                                            <div style={{
                                                width: '150px',
                                                height: '150px',
                                                position: 'absolute',

                                            }}>
                                                <AvatarImageCropper
                                                    apply={(e: any) => handleImageOnChange(e, formik)}
                                                    icon={ <IconButton component="span">
                                                        <PhotoCamera sx={{ fontSize: 30,    color: "white" }} />
                                                    </IconButton>}
                                                />
                                            </div>
                                        {/*</form>*/}

                                        {/*
                                          <ButtonWrapper>
                                            <UploadButton>
                                                <label htmlFor="upload-btn">
                                                    <input
                                                        id='upload-btn'
                                                        accept="image/*"
                                                        type="file"
                                                        style={{ display: "none" }}
                                                        ref={inputFileRef}
                                                        name='newAvatar'
                                                        onChange={(e: any) =>
                                                            handleImageOnChange(e, setFieldValue)}
                                                    />

                                                    <IconButton component="span">
                                                        <PhotoCamera sx={{ fontSize: 30, color: "white" }} />
                                                    </IconButton>
                                                </label>
                                            </UploadButton>
                                        </ButtonWrapper>
                                        */}




                                        {imageUrl || employee?.user.avatar ?
                                            <label>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                    onClick={cleanImage}
                                                >
                                                    <Delete style={{marginRight: 2}}/>
                                                    Delete
                                                </Button>
                                            </label> : ''
                                        }

                                        <Typography variant="caption" display="block" gutterBottom>
                                            Para obter os melhores resultados, use uma imagem de pelo menos 128 x
                                            128 pixels no formato .jpg
                                        </Typography>

                                        <Small
                                            marginTop={2}
                                            maxWidth={200}
                                            lineHeight={1.9}
                                            display="block"
                                            textAlign="center"
                                            color="text.disabled"
                                        >
                                            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
                                        </Small>

                                        <Box maxWidth={250} marginTop={5} marginBottom={1}>
                                            <SwitchWrapper>
                                                <Small display="block" fontWeight={600}>
                                                    Public Profile
                                                </Small>
                                                <Switch defaultChecked />
                                            </SwitchWrapper>

                                            <SwitchWrapper>
                                                <Small display="block" fontWeight={600}>
                                                    Banned
                                                </Small>
                                                <Switch defaultChecked />
                                            </SwitchWrapper>
                                            <Tiny display="block" color="text.disabled" fontWeight={500}>
                                                Apply disable account
                                            </Tiny>

                                            <SwitchWrapper>
                                                <Small display="block" fontWeight={600}>
                                                    Email Verified
                                                </Small>
                                                <Switch defaultChecked />
                                            </SwitchWrapper>
                                            <Tiny display="block" color="text.disabled" fontWeight={500}>
                                                Disabling this will automatically send the user a verification
                                                email
                                            </Tiny>
                                        </Box>
                                    </Card>
                                </Grid>

                                 <Grid item md={8} xs={12}>
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
                                                <Card sx={{ padding: 3, boxShadow: 2 }}>
                                                    <Grid container spacing={3}>
                                                    <Grid item sm={4} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="input"
                                                            name="first_name"
                                                            label="First Name"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.first_name}
                                                            onChange={handleChange}
                                                            helperText={touched.first_name && errors.first_name}
                                                            error={Boolean(errors.first_name && touched.first_name)}
                                                            sx={{ mb: 3 }}
                                                        />

                                                    </Grid>
                                                    <Grid item sm={4} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="input"
                                                            name="last_name"
                                                            label="Last Name"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.last_name}
                                                            onChange={handleChange}
                                                            helperText={touched.last_name && errors.last_name}
                                                            error={Boolean(errors.last_name && touched.last_name)}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={4} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="input"
                                                            name="middle_name"
                                                            label="Middle Name"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.middle_name}
                                                            onChange={handleChange}
                                                            helperText={touched.middle_name && errors.middle_name}
                                                            error={Boolean(errors.middle_name && touched.middle_name)}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid sx={{mt: 2}} container spacing={3}>
                                                    <Grid item sm={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            type="input"
                                                            name="email"
                                                            label="Email"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            helperText={touched.email && errors.email}
                                                            error={Boolean(errors.email && touched.email)}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={6} xs={12}>
                                                        <div style={{display: 'flex'}}>
                                                            <Autocomplete
                                                                defaultValue={mode === 'update' && employee ? employee.position : null}
                                                                size="small"
                                                                getOptionLabel={(option: Position) => option.name}
                                                                disablePortal
                                                                id="combo-box-positions"
                                                                options={positions}
                                                                sx={{ width: 300, mx: 1 }}

                                                                renderInput={
                                                                    (params) =>
                                                                        <TextField
                                                                            {...params}
                                                                            error={
                                                                                Boolean(touched.position_id && errors.position_id)
                                                                            }
                                                                            fullWidth
                                                                            helperText={
                                                                                touched.position_id && errors.position_id
                                                                            }
                                                                            label="Position"
                                                                            name="position_id"
                                                                            variant="outlined"
                                                                        />
                                                                }
                                                                renderOption={(props, option: Position) => (
                                                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                                        {option.name} ({option.id})
                                                                    </Box>
                                                                )}
                                                                onChange={ (event: any, values: any) => {
                                                                    if(values) {
                                                                        setFieldValue("position_id", values.id);
                                                                        getLevels(values)
                                                                    }

                                                                }}
                                                            />

                                                            <Autocomplete
                                                                defaultValue={mode === 'update' && employee ? employee.level : null}
                                                                size="small"
                                                                getOptionLabel={(option: Level) => option.name}
                                                                disablePortal
                                                                id="combo-box-levels"
                                                                options={levels}
                                                                sx={{ width: 300, mx: 1 }}
                                                                renderInput={
                                                                    (params, ) =>
                                                                        <TextField
                                                                            {...params}
                                                                            error={Boolean(touched.level_id && errors.level_id)}
                                                                            fullWidth
                                                                            helperText={touched.level_id && errors.level_id}
                                                                            label="Levels"
                                                                            name="level_id"
                                                                            variant="outlined"
                                                                        />
                                                                }
                                                                renderOption={(props, option: Level) => (
                                                                    <Box component="li" {...props}>
                                                                        {option.name} ({option.id})
                                                                    </Box>
                                                                )}
                                                                onChange={(event: any, values: any) => {
                                                                    if(values) {
                                                                        setFieldValue("level_id", values.id);
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </Grid>
                                                </Grid>

                                                <Grid sx={{mt: 2}} container spacing={3}>
                                                    <Grid item sm={6} xs={12}>

                                                        <Autocomplete
                                                            size="small"
                                                            getOptionLabel={(option: Skill) => option.name}
                                                            multiple
                                                            disablePortal
                                                            id="combo-box-skills"
                                                            options={skills}
                                                            sx={{ width: 300 }}
                                                            defaultValue={
                                                                mode === 'update' && employee
                                                                ? employee.skills : []
                                                            }
                                                            renderInput={
                                                                (params, ) =>
                                                                    <TextField
                                                                        {...params}
                                                                        error={Boolean(touched.skills && errors.skills)}
                                                                        fullWidth
                                                                        helperText={touched.skills && errors.skills}
                                                                        label="Skills"
                                                                        name="skills"
                                                                        variant="outlined"
                                                                    />
                                                            }
                                                            renderOption={(props, option: Skill) => (
                                                                <Box component="li" {...props}>
                                                                    {option.name} ({option.id})
                                                                </Box>
                                                            )}

                                                            onChange={(event: any, values: any) => {
                                                                const names = values.map((e: Skill) => e.name);
                                                                console.log('skills on change ', names.join(','))
                                                                setFieldValue("skills", names.join(','));
                                                            }}
                                                            onKeyDown={(e) => {
                                                                // console.log(e.key);
                                                                // if(e.key === ' ') {
                                                                    // console.log('space')
                                                                    // setSkills([...skills, { name: 'new tag'} ])
                                                                // }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={6} xs={12}>
                                                        <Autocomplete
                                                            size="small"
                                                            getOptionLabel={(option: Role) => option.name}
                                                            multiple
                                                            disablePortal
                                                            id="combo-box-roles"
                                                            options={roles}
                                                            sx={{ width: 300 }}
                                                            defaultValue={
                                                                mode === 'update' && employee
                                                                    ? employee.user.roles : []
                                                            }
                                                            renderInput={
                                                                (params, ) =>
                                                                    <TextField
                                                                        {...params}
                                                                        error={Boolean(touched.roles && errors.roles)}
                                                                        fullWidth
                                                                        helperText={touched.roles && errors.roles}
                                                                        label="Roles"
                                                                        name="roles"
                                                                        variant="outlined"
                                                                    />
                                                            }
                                                            renderOption={(props, option: Role) => (
                                                                <Box component="li" {...props}>
                                                                    {option.name} ({option.id})
                                                                </Box>
                                                            )}

                                                            onChange={(event: any, values: any) => {
                                                                const names = values.map((e: Role) => e.name);
                                                                console.log('roles on change ', names.join(','))
                                                                setFieldValue("roles", names.join(','));
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                </Card>
                                             </form>
                                         )}
                                     </Formik>
                                 </Grid>

                            </Grid>
                        </Card>
                    </Box>


                    <DialogActions sx={{ p: '1.25rem' }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            type='submit'
                            form="inner-form"
                            onClick={() => {
                            console.log('submit')
                            innerForm.current?.handleSubmit();

                        }}>
                            { mode === 'create' ? 'Create New Account' : 'Update Employee Information' }
                        </Button>
                    </DialogActions>

            </DialogContent>

        </Dialog>
    );
};

export default CreateEditEmployeeModal;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateAge = (age: number) => age >= 18 && age <= 50;
