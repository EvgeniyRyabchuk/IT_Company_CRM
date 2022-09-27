import React from 'react';
import {FormControlLabel, Switch} from "@mui/material";
import useSettings from "../../../hooks/useSettings";
import {useTheme} from "@emotion/react";
import {sidenavCompactWidth, sideNavWidth} from "../../../utils/constant";
import {convertHexToRGB} from "../../../utils/utils";
import {Container} from "@mui/system";

const Preferences = () => {
    const [compactModeChecked, setCompactModeChecked] = React.useState(false);
    const theme = useTheme();
    const { settings, updateSettings } = useSettings();

    const leftSidebar = settings.layout1Settings.leftSidebar;
    const { mode, bgImgURL } = leftSidebar;

    const handleSidenavToggle = () => {
        updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' });
        setCompactModeChecked(!compactModeChecked);
    };

    const updateSidebarMode = (sidebarSettings: any) => {
        // @ts-ignore
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        });
    };

    return (
        <Container sx={{ p: 5}}>

            <FormControlLabel
                control={
                    <Switch
                        onChange={handleSidenavToggle}
                        checked={leftSidebar.mode !== 'full'}
                        color="secondary"
                        size="small"
                    />
                }
                label={`${compactModeChecked ? 'Compact Mode On' : 'Full Mode On'}`}
            />

        </Container>
    );
};

export default Preferences;