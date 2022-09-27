import React, {ReactNode, useMemo} from 'react';
import {Link} from "@mui/icons-material";
import moment from "moment";
import {ProjectLink} from "../../../types/project";
import {LinkIcon, ProjectSocialLinkTitle} from "../../../types/global";

const LinkListItem : React.FC<{link: ProjectLink, iconList: LinkIcon[]}> =
    ({link, iconList}) => {

    const linkIcon = useMemo<ReactNode>(() => {
        const item = iconList.find(e => e.title === link.title);
        if(!item) {
            return iconList.find(e => e.title === ProjectSocialLinkTitle.EXTERNAL_LINK)!.icon;
        }
        return item.icon;
    }, []);

    console.log(linkIcon)
    return (
        <li className="je jc jd">
            <div className="js flex items-center text-sm">

                <div className="os sf rounded-full ub hy ng ra">
                    {
                        linkIcon
                    }
                </div>

                <div style={{
                    textAlign: 'start',
                    overflow: "hidden",
                    width: '100%'
                }}>
                    <div className="gp text-slate-800">
                        {link.title}
                    </div>
                    <div
                        className="flex a_ items-center fc lm">
                        <a
                            style={{
                                width: 'calc(100% - 32px)',
                                color: '#1976D2',
                                overflowWrap: 'break-word'
                            }}
                            href={link.link}>
                            {link.link}

                        </a>
                        <Link />
                        <div className="gq">·</div>

                    </div>

                </div>
            </div>

            <div className="__ rb _j"
                 style={{
                     minWidth: '200px',
                     width: '200px',
                     textAlign: 'end'
                 }}>
                Pinned at {
                moment(link.created_at).format('DD/MM/yyyy HH:MM:ss')
            }
            </div>
        </li>
    );
};

export default LinkListItem;