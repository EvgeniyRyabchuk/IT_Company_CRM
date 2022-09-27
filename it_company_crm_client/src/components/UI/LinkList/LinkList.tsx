import React, {useMemo} from 'react';
import {ProjectLink} from "../../../types/project";
import '../../../assets/components/UI/LinkList.css'
import moment from "moment";
import {IconButton} from "@mui/material";
import {AlternateEmail, Link, Storage} from "@mui/icons-material";
import GitHubIcon from "../../icons/GitHubIcon";
import JiraIcon from "../../icons/JiraIcon";
import LinkListItem from "./LinkListItem";
import {LinkIcon, ProjectSocialLinkTitle} from "../../../types/global";
import DefaultSocialIcon from "../../icons/DefaultSocialIcon";
import {projectLinkTitleIcon} from "../../../utils/constant";

const LinkList : React.FC<{list: ProjectLink[]}> = ({list}) => {




    return (
        <div>
            <h2 className="text-slate-800 gh ru">Links</h2>
            <hr/>
            <div className="bg-white dw border border-slate-200 rounded-sm bv" style={{padding: '10px 25px'}}>
                <ul className="fw">
                    {
                        list.map(link =>
                           <LinkListItem link={link} iconList={projectLinkTitleIcon}/>
                        )
                    }

                </ul>
            </div>
        </div>
    );
};

export default LinkList;