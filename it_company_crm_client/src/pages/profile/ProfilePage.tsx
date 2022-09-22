import React from 'react';
import {Box} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import Breadcrumb from "../../components/Breadcrumb";
import useAuth from "../../hooks/useAuth";
import '../../assets/components/Profile/index.css'
import '../../assets/components/UI/Tab/index.css'
import {AccountCircle, Attachment, Delete, Fingerprint, Lock, Settings} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";

import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import '../../assets/components/UI/Tab/index.css'
import ProfileOverview from "./tabs/overview/ProfileOverview";
import ProfileHeader from "./ProfileHeader";
import ProfileProjectList from "./tabs/projects/ProfileProjectList";


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

    const { user } = useAuth();


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Container style={{padding: '30px'}}>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Profile", path: '/profile' }
                ]} />
            </Box>

            <div className="MuiBox-root css-w49wrl">
                <div className="MuiPaper-root MuiPaper-elevation
                 MuiPaper-rounded MuiPaper-elevation1
                  MuiCard-root css-dz6x05">
                    <div className="MuiBox-root css-jz5wf9">
                        <img width="100%" height="100%" alt="Team Member"
                             src="https://uko-react.vercel.app/static/background/user-cover-pic.png"
                             className="object-fit: cover;"/>
                        </div>

                    <ProfileHeader />

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
                            <ProfileOverview />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ProfileProjectList />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                           Info
                        </TabPanel>



                        {/*<div className="MuiTabs-scrollableX MuiTabs-hideScrollbar css-oqr85h"*/}
                        {/*     style={{*/}
                        {/*         width: '99px',*/}
                        {/*         height: '99px',*/}
                        {/*         position: 'absolute',*/}
                        {/*         top: '-9999px',*/}
                        {/*         overflow: 'scroll'*/}
                        {/*}}>*/}

                        {/*</div>*/}
                        {/*<div className="MuiTabs-scroller MuiTabs-hideScrollbar MuiTabs-scrollableX css-1t0s2fz"*/}
                        {/*     style={{marginBottom: '0px'}}*/}
                        {/*>*/}
                        {/*    <div className="MuiTabs-flexContainer css-7sga7m" role="tablist">*/}
                        {/*        <button*/}
                        {/*            className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected css-eup9ie"*/}
                        {/*            tabIndex={0} type="button" role="tab" aria-selected="true"*/}
                        {/*            aria-controls="mui-p-92261-P-1"*/}
                        {/*            id="mui-p-92261-T-1">Overview*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-eup9ie"*/}
                        {/*            tabIndex={-1}*/}
                        {/*            type="button" role="tab" aria-selected="false" aria-controls="mui-p-92261-P-2"*/}
                        {/*            id="mui-p-92261-T-2">Projects*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-eup9ie"*/}
                        {/*            tabIndex={-1}*/}
                        {/*            type="button" role="tab" aria-selected="false" aria-controls="mui-p-92261-P-3"*/}
                        {/*            id="mui-p-92261-T-3">Campaigns*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-eup9ie"*/}
                        {/*            tabIndex={-1}*/}
                        {/*            type="button" role="tab" aria-selected="false" aria-controls="mui-p-92261-P-4"*/}
                        {/*            id="mui-p-92261-T-4">Documents*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-eup9ie"*/}
                        {/*            tabIndex={-1}*/}
                        {/*            type="button" role="tab" aria-selected="false" aria-controls="mui-p-92261-P-5"*/}
                        {/*            id="mui-p-92261-T-5">Connections*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-eup9ie"*/}
                        {/*            tabIndex={-1}*/}
                        {/*            type="button" role="tab" aria-selected="false" aria-controls="mui-p-92261-P-6"*/}
                        {/*            id="mui-p-92261-T-6">Activity*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*    <span className="MuiTabs-indicator css-h6h1g0"*/}
                        {/*          style={{left: '194.295px', width: '73.125px'}}></span>*/}
                        {/*</div>*/}
                    </div>
                </div>








                <div className="MuiTabPanel-root css-1445d4x"
                     role="tabpanel"
                     aria-labelledby="mui-p-92261-T-2"
                     id="mui-p-92261-P-2">
                </div>
                <div className="MuiTabPanel-root css-1445d4x"
                     role="tabpanel"
                     aria-labelledby="mui-p-92261-T-3"
                     id="mui-p-92261-P-3">

                </div>
                <div className="MuiTabPanel-root css-1445d4x"
                     role="tabpanel"
                     aria-labelledby="mui-p-92261-T-4"
                     id="mui-p-92261-P-4">

                </div>
                <div className="MuiTabPanel-root css-1445d4x"
                     role="tabpanel"
                     aria-labelledby="mui-p-92261-T-5"
                     id="mui-p-92261-P-5">

                </div>
                <div className="MuiTabPanel-root css-1445d4x"
                     role="tabpanel"
                     aria-labelledby="mui-p-92261-T-6"
                     id="mui-p-92261-P-6">

                </div>
            </div>




        </Container>
    );
};

export default ProfilePage;