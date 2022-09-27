import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, TextField} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import {Box} from "@mui/system";
import {employeeLinkTitleIcon} from "../../../utils/constant";
import {EmployeeSocialLinkTitle, LinkIcon, ProjectSocialLinkTitle} from "../../../types/global";
import {UserRoleEntity} from "../../../types/auth";
import {ProjectLink} from "../../../types/project";
import {EmployeeLink} from "../../../types/user";
import {random} from "lodash";
import {EmployeeService} from "../../../services/EmployeeService";
import useAuth from "../../../hooks/useAuth";

const SocialLinkTab : React.FC<{userEntity: UserRoleEntity}>
    = ({userEntity}) => {

    const { profileDetail } = useAuth();

    const linkResourceOptions = [
        EmployeeSocialLinkTitle.GITHUB,
        EmployeeSocialLinkTitle.BITBUCKET,
    ];

    const [employeeLinks, setEmployeeLinks] = useState<EmployeeLink[]>([]);


    useEffect(() => {
        setEmployeeLinks(userEntity.employee_links);
    }, []);

    useEffect(() => {
        setEmployeeLinks(userEntity.employee_links);
    }, [userEntity]);

    const save = async () => {
        const { data } =
            await EmployeeService.updateSoicalLinks(userEntity.id, employeeLinks);
        profileDetail();

    }

    return (
        <div>
            { employeeLinks.length === 0 && <h2 className='text-center'>No links yet</h2>}
            <div style={{
                padding: '0 10px',
                display: 'flex',
                flexDirection: 'column',
                // height: '235px',
                overflowY: 'auto',
                marginTop: "10px",
                width: '100%',
                paddingTop: '20px'
            }}>

                {
                    employeeLinks.map(link =>
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
                                        const index = employeeLinks.findIndex(l => l.id === link.id);
                                        employeeLinks.splice(index, 1);
                                        setEmployeeLinks([...employeeLinks]);
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
                                        const newLinks = employeeLinks.map((l) => {
                                            if(l.id === link.id) {
                                                l.title = value ?? '';
                                                return l;
                                            }
                                            else return l;
                                        });
                                        setEmployeeLinks([...newLinks]);
                                    }}
                                    style={{
                                        height: '100%',
                                        width: '200px',
                                        zIndex: '999999'
                                    }}
                                    size='small'
                                    disablePortal
                                    id="combo-box-demo"
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            <div style={{width: '24px', height: '24px', marginRight: '10px'}}>
                                                {
                                                    employeeLinkTitleIcon.find((lti: LinkIcon) =>
                                                        option === lti.title)!.icon
                                                }
                                            </div>
                                            {
                                                option
                                            }
                                        </Box>
                                    )}

                                    options={linkResourceOptions}
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
                                        const newLinks = employeeLinks.map((l) => {
                                            if(l.id === link.id) {
                                                l.link = event.target.value ?? '';
                                                return l;
                                            }
                                            else return l;
                                        });
                                        setEmployeeLinks([...newLinks]);
                                    }}
                                />
                            </div>
                        </div>
                    )
                }
            </div>

            <Button
                variant="outlined"
                color='primary'
                style={{width: '100%'}}
                onClick={() => {
                    setEmployeeLinks([...employeeLinks, {
                        id: random(1, 100000),
                        title: '',
                        employee_id: userEntity.id,
                        link: ''
                    }])
                }}
            >
                <Add/>

            </Button>

            {
                JSON.stringify(employeeLinks) !== JSON.stringify(userEntity.employee_links) &&
                    <Box sx={{p: 5}}>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            onClick={save}
                        >
                            Save
                        </Button>
                    </Box>
            }


            </div>
    );
};

export default SocialLinkTab;