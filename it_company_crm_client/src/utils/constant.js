import {API_URL_WITH_PUBLIC_STORAGE} from "../http";
import React, {useMemo} from "react";
import {EmployeeSocialLinkTitle, LinkIcon, ProjectSocialLinkTitle} from "../types/global";
import GitHubIcon from "../components/icons/GitHubIcon";
import JiraIcon from "../components/icons/JiraIcon";
import {AlternateEmail, Storage} from "@mui/icons-material";
import DefaultSocialIcon from "../components/icons/DefaultSocialIcon";
import BitBucketIcon from "../components/icons/BitBucketIcon";

export const topBarHeight = 64
export const sideNavWidth = 260
export const navbarHeight = 60
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200

export const defaultUserAvatar =
    `${API_URL_WITH_PUBLIC_STORAGE}/static/images/users/avatars/80x80/default-avatar.png`;

export const defPage = 1;
export const defLimit = 15;


export const projectLinkTitleIcon = [
        {
            title: ProjectSocialLinkTitle.GITHUB,
            icon: <GitHubIcon/>,
        },
        {
            title: ProjectSocialLinkTitle.JIRA,
            icon: <JiraIcon/>,
        },

        {
            title:  ProjectSocialLinkTitle.MAIL_SERVICE,
            icon: <AlternateEmail />,
        },
        {
            title:  ProjectSocialLinkTitle.HOST,
            icon: <Storage />,
        },
        {
            title:  ProjectSocialLinkTitle.EXTERNAL_LINK,
            icon: <DefaultSocialIcon />,
        },
        {
            title:  ProjectSocialLinkTitle.EXTERNAL_LINK,
            icon: <DefaultSocialIcon />,
        },

];

export const employeeLinkTitleIcon = [
    {
        title: EmployeeSocialLinkTitle.GITHUB,
        icon: <GitHubIcon/>,
    },
    {
        title: EmployeeSocialLinkTitle.BITBUCKET,
        icon: <BitBucketIcon />,
    },

];
