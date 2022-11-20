import React from "react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";


 export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    dir?: any;
}

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ flexGrow: '1' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ px: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}