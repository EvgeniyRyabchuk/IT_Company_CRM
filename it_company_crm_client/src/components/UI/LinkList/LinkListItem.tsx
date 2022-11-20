import React, {ReactNode, useMemo} from 'react';
import {Link} from "@mui/icons-material";
import moment from "moment";
import {ProjectLink} from "../../../types/project";
import {LinkIcon, ProjectSocialLinkTitle} from "../../../types/global";
import {LinkComponent, LinkDateWrapper, LinkListWrapper} from "../../../assets/UI/LinkList";


const LinkListItem : React.FC<{link: ProjectLink, iconList: LinkIcon[]}> =
    ({link, iconList}) => {

    const linkIcon = useMemo<ReactNode>(() => {
        const item = iconList.find(e => e.title === link.title);
        if(!item) {
            return iconList.find(e => e.title === ProjectSocialLinkTitle.EXTERNAL_LINK)!.icon;
        }
        return item.icon;
    }, []);

    return (
        <li className="je jc jd">
            <div className="js flex items-center text-sm">
                <div className="os sf rounded-full ub hy ng ra">
                    { linkIcon }
                </div>
                <LinkListWrapper>
                    <div className="gp text-slate-800">
                        {link.title}
                    </div>
                    <div
                        className="flex a_ items-center fc lm">
                        <LinkComponent href={link.link}>
                            {link.link}
                        </LinkComponent>
                        <Link />
                        <div className="gq">·</div>
                    </div>
                </LinkListWrapper>
            </div>
            <LinkDateWrapper className="__ rb _j">
                Pinned at {
                    moment(link.created_at).format('DD/MM/yyyy HH:MM:ss')
                }
            </LinkDateWrapper>
        </li>
    );
};

export default LinkListItem;