import React, {useMemo} from 'react';
import {ProjectLink} from "../../../types/project";
import '../../../assets/components/UI/LinkList.css'
import moment from "moment";
import {IconButton} from "@mui/material";
import {Link} from "@mui/icons-material";
import GitHubIcon from "../../icons/GitHubIcon";
import JiraIcon from "../../icons/JiraIcon";
import LinkListItem from "./LinkListItem";
import {LinkIcon, SocialLinkTitle} from "../../../types/global";
import DefaultSocialIcon from "../../icons/DefaultSocialIcon";

const LinkList : React.FC<{list: ProjectLink[]}> = ({list}) => {

    const linkTitleIcon = useMemo<LinkIcon[]>(() => {
        return [
            {
                title: SocialLinkTitle.GITHUB,
                icon: <GitHubIcon/>,
            },
            {
                title: SocialLinkTitle.JIRA,
                icon: <JiraIcon/>,
            },
            {
                title:  SocialLinkTitle.DEFAULT,
                icon: <DefaultSocialIcon />,
            }
        ];
    }, [])


    return (
        <div>
            <h2 className="text-slate-800 gh ru">Links</h2>
            <div className="bg-white dw border border-slate-200 rounded-sm bv">
                <ul className="fw">
                    {
                        list.map(link =>
                           <LinkListItem link={link} iconList={linkTitleIcon}/>
                        )
                    }

                </ul>
            </div>
        </div>
    );
};

export default LinkList;