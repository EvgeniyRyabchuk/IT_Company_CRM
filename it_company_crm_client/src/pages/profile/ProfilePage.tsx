import React, {useEffect, useMemo, useState} from 'react';
import {Box, LinearProgress} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import Breadcrumb from "../../components/Breadcrumb";
import useAuth from "../../hooks/useAuth";
import '../../assets/components/Profile/index.scss'
import Tabs from "@mui/material/Tabs";
import UserCoverImg from '../../assets/images/user/user-cover-pic.png';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import '../../assets/components/UI/Tab/index.css'
import ProfileOverview from "./tabs/overview/ProfileOverview";
import ProfileHeader from "./ProfileHeader";
import ProfileProjectList from "./tabs/projects/ProfileProjectList";
import {UserRoleEntity} from "../../types/auth";



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: '100%'}}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ProfilePage = () => {

    const { user, rolesEntity, getUserEntityByRoleName, lastChats, profileDetail } = useAuth();

    useEffect(() => {
        profileDetail();
    }, [])


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // for employee userEntity data will depend on the role, like admin, manager, or developer
    const [userEntity, setUserEntity] = useState<UserRoleEntity | null>(null);

    useEffect(() => {
        if(!user || !rolesEntity) return;
        // const userEntity = getUserEntityByRoleName('admin', rolesEntity);
        // @ts-ignore
        // const entity = userEntities.find(e => e.role.name === 'admin');
        // @ts-ignore
        const roleEntity = rolesEntity.find(e => e.role.name === 'admin');
        if(roleEntity)
            setUserEntity(roleEntity.entity);
        else if(rolesEntity.length > 0)
            setUserEntity(rolesEntity[0].entity);
    }, [user, rolesEntity])

    // @ts-ignore
    const lastChatsContacts = useMemo<{user: User, lastMessage: ChatMessage}[]>(() => {
        if (!rolesEntity) return;
        const users = [];
        for (let chat of lastChats) {
            // @ts-ignore
            const withUser = chat.users.find((e: User) => e.id !== user!.id);
            if(withUser) users.push({user: withUser, lastMessage: chat.messages.length > 0 ? chat.messages[0] : null});
        }
        return users;

    }, [rolesEntity])

    return (
        <Container style={{padding: '30px'}}>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Profile", path: '/profile' }
                ]} />
            </Box>

            {
                userEntity ?
                    <div className="MuiBox-root css-w49wrl ">

                            <ProfileHeader mode='view' userEntity={userEntity}/>

                            <div className="MuiTabs-root css-19uhhvs">
                                <Tabs
                                    orientation="horizontal"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Vertical tabs example"
                                    sx={{ borderRight: 1, borderColor: 'divider' }}
                                >
                                    <Tab label="Overview" {...a11yProps(0)} />
                                    <Tab label="Projects" {...a11yProps(1)} />
                                    <Tab label="ProfileInfo" {...a11yProps(2)} />
                                </Tabs>

                                <TabPanel value={value} index={0}>
                                    <ProfileOverview
                                        userEntity={userEntity}
                                        lastChatsContacts={lastChatsContacts}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    {
                                        userEntity.projects && userEntity.projects.length > 0 &&
                                            <ProfileProjectList
                                            projects={userEntity.projects}
                                        />
                                    }

                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    Info
                                </TabPanel>
                            </div>


                    </div>
                    :
                    <LinearProgress />
            }


        </Container>
    );
};

export default ProfilePage;