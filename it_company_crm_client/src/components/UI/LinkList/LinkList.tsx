import React from 'react';
import {ProjectLink} from "../../../types/project";
import '../../../assets/components/UI/LinkList.css'
import LinkListItem from "./LinkListItem";
import {projectLinkTitleIcon} from "../../../utils/constant";
import {Box} from "@mui/system";

const LinkList : React.FC<{list: ProjectLink[]}> = ({list}) => {
    return (
        <div>
            <h2 className="text-slate-800 gh ru">Links</h2>
            <hr/>
            <Box className="bg-white dw border border-slate-200 rounded-sm bv"
                 sx={{ padding: '10px 25px' }}>
                <ul className="fw">
                    {
                        list.map(link =>
                           <LinkListItem link={link} iconList={projectLinkTitleIcon}/>
                        )
                    }
                </ul>
            </Box>
        </div>
    );
};

export default LinkList;