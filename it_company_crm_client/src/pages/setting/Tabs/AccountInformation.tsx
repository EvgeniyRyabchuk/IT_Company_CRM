import React, {useEffect, useMemo, useState} from 'react';
import ProfileHeader from "../../profile/ProfileHeader";
import {UserRoleEntity} from "../../../types/auth";
import {Formik} from "formik";
import {Skill} from "../../../types/user";
import * as Yup from "yup";
import {Autocomplete, Button, Grid, TextField} from "@mui/material";
import {Box} from "@mui/system";
import useAuth from "../../../hooks/useAuth";
import {EmployeeService} from "../../../services/EmployeeService";



const validationSchema = Yup.object().shape({
    id: Yup.number().required(),
    email: Yup.string().email().required("Email is Required!"),
    skills: Yup.string().optional(),
    about: Yup.string().optional()
});

const AccountInformation : React.FC<{ userEntity: UserRoleEntity }> = ({userEntity}) => {

    const { user, profile } = useAuth();

    const handleFormSubmit = async (values: any) => {
        console.log(values);

        const { data } = await EmployeeService.updateEmployeeInfo(values.id, values);

        profile();

        console.log(values);
    };

    const defInitialValues = useMemo<any>(() => {
        if(!userEntity || !user) return {}

        return {
            id: user.id,
            email: user.email,
            about: user.about,
            skills: userEntity.skills.map(s => s.name).join(','),
        }
    }, [userEntity])

    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const getSkills = async () => {
            const { data } = await EmployeeService.getSkills();
            setSkills([...data]);
        }
        getSkills();
    }, [])


    return (
        <div>
            <ProfileHeader userEntity={userEntity} mode='update'/>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={defInitialValues}
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
                    // TODO: solve
                    <form style={{padding: '25px'}} id="inner-form" onSubmit={handleSubmit}>
                        <Box sx={{ width: '500px', margin: '20px auto'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
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
                                        helperText={touched.email && `${errors.email ?? ''}`}
                                        error={Boolean(errors.email && touched.email)}
                                        sx={{ mb: 3}}
                                    />
                                </Grid>
                                <Grid xs={12} item>

                                    <TextField
                                        sx={{width: '100%'}}
                                        id="standard-multiline-static"
                                        label="About"
                                        multiline
                                        rows={8}
                                        // defaultValue="Default Value"

                                        name='about'
                                        onBlur={handleBlur}
                                        value={values.about}
                                        onChange={handleChange}
                                        helperText={touched.about && `${errors.about ?? ''}`}
                                        error={Boolean(errors.about && touched.about)}
                                    />

                                </Grid>
                            </Grid>
                        </Box>
                        <Grid container spacing={3} sx={{ pt: 5}}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    size="small"
                                    getOptionLabel={(option: Skill) => option.name}
                                    multiple
                                    disablePortal
                                    id="combo-box-skills"
                                    options={skills}

                                    defaultValue={userEntity.skills ?? ''}
                                    renderInput={
                                        (params, ) =>
                                            <TextField
                                                {...params}
                                                error={Boolean(touched.skills && errors.skills)}
                                                fullWidth
                                                helperText={touched.skills && `${errors.skills ?? ''}`}
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
                                        console.log('123')
                                        const names = values.map((e: Skill) => e.name);
                                        console.log('skills on change ', names.join(','))
                                        setFieldValue("skills", names.join(','));
                                    }}
                                />
                            </Grid>
                        </Grid>




                    {/* TODO: solve */}
                    {
                        defInitialValues.email !== values.email ||
                        defInitialValues.skills !== values.skills ||
                        defInitialValues.about !== values.about
                        ?
                            <Box sx={{p: 5}}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                >
                                    Save
                                </Button>
                            </Box>
                            : ''
                    }


                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AccountInformation;