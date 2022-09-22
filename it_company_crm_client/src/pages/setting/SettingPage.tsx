import React from 'react';
import {Box} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import Breadcrumb from "../../components/Breadcrumb";
import useAuth from "../../hooks/useAuth";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import '../../assets/components/UI/Tab/index.css'
import {
    AccountCircle,
    Attachment,
    Delete,
    Fingerprint,
    Lock,
    Phone,
    Settings,
    SocialDistance
} from "@mui/icons-material";
import {SettingContainer} from "../../assets/components/Setting";


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

const SettingPage = () => {

    const { user } = useAuth();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


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
                    sx={{ borderRight: 1, borderColor: 'divider' }}

                >
                    <Tab style={{justifyContent: 'start'}} icon={<AccountCircle />} iconPosition="start" label="Account Information" {...a11yProps(0)} />
                    <Tab style={{justifyContent: 'start'}} icon={<Lock />} iconPosition="start" label="Password" {...a11yProps(1)} />
                    <Tab style={{justifyContent: 'start'}} icon={<Settings />} iconPosition="start" label="Preferences" {...a11yProps(2)} />
                    <Tab style={{justifyContent: 'start'}} icon={<Fingerprint />} iconPosition="start" label="Verification" {...a11yProps(3)} />
                    <Tab style={{justifyContent: 'start'}} icon={<Attachment />} iconPosition="start" label="Social Links" {...a11yProps(4)} />
                    <Tab style={{justifyContent: 'start'}} icon={<Delete />} iconPosition="start" label="Delete Account" {...a11yProps(5)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    Account Information
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Password
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Preferences
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Verification
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Social Links
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Delete Account
                </TabPanel>

            </SettingContainer>



        </Container>
    );
};

export default SettingPage;