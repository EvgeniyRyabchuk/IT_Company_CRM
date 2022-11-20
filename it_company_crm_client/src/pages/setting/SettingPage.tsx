import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import Breadcrumb from "../../components/Breadcrumb";
import useAuth from "../../hooks/useAuth";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../assets/components/UI/Tab/index.css'
import {AccountCircle, Attachment, Delete, Fingerprint, Lock, Settings} from "@mui/icons-material";
import {SettingContainer} from "../../assets/components/Setting";
import {useNavigate, useParams} from "react-router-dom";
import {SettingTabConstants, UserRoleEntity} from "../../types/auth";
import {toLower} from "lodash";
import AccountInformation from "./Tabs/AccountInformation";
import PasswordTab from "./Tabs/PasswordTab";
import Preferences from "./Tabs/Preferences";
import Verification from "./Tabs/Verification";
import SocialLinkTab from "./Tabs/SocialLinkTab";
import DeleteAccount from "./Tabs/DeleteAccount";
import {a11yProps, TabPanel} from "../../components/Tab";


const SettingPage = () => {

    const navigator = useNavigate();
    const { tab } = useParams();

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        const tabName = toLower(SettingTabConstants[newValue]);
        navigator(`/setting/${tabName}`);
    };

    const { user, rolesEntity, getUserEntityByRoleName, lastChats, profileDetail } = useAuth();


    const setDefaultTab = () => {
        switch (tab) {
            case 'account':
                setValue(SettingTabConstants.ACCOUNT);
                break;
            case 'password':
                setValue(SettingTabConstants.PASSWORD);
                break;
            case 'preferences':
                setValue(SettingTabConstants.PREFERENCES);
                break;
            case 'verification':
                setValue(SettingTabConstants.VERIFICATION);
                break;
            case 'social':
                setValue(SettingTabConstants.SOCIAL);
                break;
            case 'delete':
                setValue(SettingTabConstants.DELETE);
                break;
            default:
                setValue(SettingTabConstants.ACCOUNT);
                break;
        }
    }

    // for employee userEntity data will depend on the role, like admin, manager, or developer
    const [userEntity, setUserEntity] = useState<UserRoleEntity | null>(null);

    useEffect(() => {
        if(!user || !rolesEntity) return;
        const roleEntity = rolesEntity.find(e => e.role.name === 'developer');
        if(roleEntity)
            setUserEntity(roleEntity.entity);
        else if(rolesEntity.length > 0)
            setUserEntity(rolesEntity[0].entity);

    }, [user, rolesEntity])

    useEffect(() => {
        setDefaultTab();
        profileDetail();
    }, [])


    return (
        <Container style={{padding: '30px'}}>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Setting", path: '/setting' }
                ]} />
            </Box>

           <SettingContainer>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', overflow: 'inherit', minWidth: '200px'}}

                >
                    <Tab
                        style={{justifyContent: 'start'}}
                        icon={<AccountCircle />}
                        iconPosition="start" label="Account Information" {...a11yProps(0)}
                    />
                    <Tab
                        style={{justifyContent: 'start'}}
                        icon={<Lock />}
                        iconPosition="start" label="Password" {...a11yProps(1)}
                    />
                    <Tab
                        style={{justifyContent: 'start'}}
                        icon={<Settings />}
                        iconPosition="start" label="Preferences" {...a11yProps(2)}
                    />
                    <Tab
                        style={{justifyContent: 'start'}}
                        icon={<Fingerprint />}
                        iconPosition="start" label="Verification" {...a11yProps(3)}
                    />
                    <Tab
                        style={{justifyContent: 'start'}}
                        icon={<Attachment />}
                        iconPosition="start" label="Social Links" {...a11yProps(4)}
                    />
                    <Tab
                        style={{justifyContent: 'start'}}
                        icon={<Delete />}
                        iconPosition="start" label="Delete Account" {...a11yProps(5)}
                    />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {
                        userEntity &&
                        <AccountInformation userEntity={userEntity} />
                    }

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PasswordTab />
                </TabPanel>
                <TabPanel value={value} index={2}>
                   <Preferences />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Verification />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    {
                        userEntity &&
                        <SocialLinkTab userEntity={userEntity} />
                    }
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <DeleteAccount />
                </TabPanel>

            </SettingContainer>
        </Container>
    );
};

export default SettingPage;