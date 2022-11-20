import React, {useState} from 'react';

import userAvatar from '../../../assets/images/chat/user-avatar-32.png';

import MarketingIcon from '../../../assets/images/chat/channel-01.png';
import DevelopmentIcon from '../../../assets/images/chat/channel-02.png';
import ProductSupportIcon from '../../../assets/images/chat/channel-03.png';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ChatSidebarHeader = ({setUserModalOpen}: any) => {

    const [isChannelMenuOpen, setIsChannelMenuOpen] = useState(false);

    const onComboBoxClick = () => {
        setIsChannelMenuOpen(!isChannelMenuOpen);
    }

    return (
        <div className="b k tk">
            <div className="flex items-center bg-white cs border-slate-200 vc sa">
                <div className="ou flex items-center fe">
                    <div className="y" x-data="{ open: false }">
                        <button className="uw flex items-center ld" aria-haspopup="true"  onClick={onComboBoxClick}>
                            <img className="os sf rounded-full mr-2" src={userAvatar} width="32" height="32" alt="Group 01" />
                            <div className="ld">
                                <span className="gh text-slate-800">#Marketing</span>
                            </div>
                            <svg className="w-3 h-3 ub nz du gq" viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                            </svg>
                        </button>

                        <div className="uk tk g z x ur bg-white border border-slate-200 va rounded bd la re" style={{display: isChannelMenuOpen ? 'block' : 'none'}}>
                            <ul>
                                <li>
                                    <a className="gp text-sm g_ xg block va vn" href="#0" >
                                        <div className="flex items-center fe">
                                            <div className="uw flex items-center ld">
                                                <img className="og sw rounded-full mr-2" src={MarketingIcon} width="28" height="28" alt="Channel 01" />
                                                <div className="ld">#Marketing</div>
                                            </div>
                                            <svg className="w-3 h-3 ub du text-indigo-500 nz" viewBox="0 0 12 12">
                                                <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"></path>
                                            </svg>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="gp text-sm g_ xg block va vn" href="#0">
                                        <div className="flex items-center fe">
                                            <div className="uw flex items-center ld">
                                                <img className="og sw rounded-full mr-2" src={DevelopmentIcon} width="28" height="28" alt="Channel 02" />
                                                <div className="ld">#Developing</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="gp text-sm g_ xg block va vn" href="#0">
                                        <div className="flex items-center fe">
                                            <div className="uw flex items-center ld">
                                                <img className="og sw rounded-full mr-2" src={ProductSupportIcon} width="28" height="28" alt="Channel 02" />
                                                <div className="ld">#Developing</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button className="ve ub  border-slate-200 hover--border-slate-300 bv nq add-user-to-chat-btn"
                            onClick={() => setUserModalOpen(true)}>
                        {/*<svg className="oo sl du text-slate-500" viewBox="0 0 16 16">*/}
                        {/*    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"></path>*/}
                        {/*</svg>*/}
                        <PersonAddIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebarHeader;