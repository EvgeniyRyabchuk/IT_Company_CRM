import {API_URL_WITH_PUBLIC_STORAGE} from "../http";
import React, {useMemo} from "react";
import {LinkIcon, SocialLinkTitle} from "../types/global";
import GitHubIcon from "../components/icons/GitHubIcon";
import JiraIcon from "../components/icons/JiraIcon";
import {AlternateEmail, Storage} from "@mui/icons-material";
import DefaultSocialIcon from "../components/icons/DefaultSocialIcon";

export const topBarHeight = 64
export const sideNavWidth = 260
export const navbarHeight = 60
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200

export const defaultUserAvatar =
    `${API_URL_WITH_PUBLIC_STORAGE}/static/images/users/avatars/80x80/default-avatar.png`;

export const defPage = 1;
export const defLimit = 15;


export const linkTitleIcon = [
        {
            title: SocialLinkTitle.GITHUB,
            icon: <GitHubIcon/>,
        },
        {
            title: SocialLinkTitle.JIRA,
            icon: <JiraIcon/>,
        },

        {
            title:  SocialLinkTitle.MAIL_SERVICE,
            icon: <AlternateEmail />,
        },
        {
            title:  SocialLinkTitle.HOST,
            icon: <Storage />,
        },
        {
            title:  SocialLinkTitle.EXTERNAL_LINK,
            icon: <DefaultSocialIcon />,
        },


];
