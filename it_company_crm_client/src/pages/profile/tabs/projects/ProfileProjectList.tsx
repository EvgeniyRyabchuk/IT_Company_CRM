import React from 'react';
import './index.css';

const ProfileProjectList = () => {
    return (
        <div className="MuiBox-root css-1phy807">
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb">

                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-1twzmnh">
                    <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-14lzsk6">
                        <div className="MuiBox-root css-1lekzkb">
                            <div className="MuiBox-root css-1g86e6t"><svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-svogci" focusable="false"
                                aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                    d="M10.28,11.32a2.94,2.94,0,0,0,1-.71,2.78,2.78,0,0,0,.57-1.83,3.17,3.17,0,0,0-.57-1.9A3.8,3.8,0,0,0,8,5.56H2.75A.75.75,0,0,0,2,6.31V17.25a.76.76,0,0,0,.75.75H7.6a8.76,8.76,0,0,0,1.76-.17,3.48,3.48,0,0,0,1.41-.62,3.6,3.6,0,0,0,.88-1,3.66,3.66,0,0,0,.55-2,3.24,3.24,0,0,0-.49-1.82A2.76,2.76,0,0,0,10.28,11.32ZM4.87,7.72H7.19a4.73,4.73,0,0,1,1.47.19,1.12,1.12,0,0,1,.66,1.15,1.16,1.16,0,0,1-.5,1.09,2.48,2.48,0,0,1-1.32.31H4.87Zm3.89,8.05A2.73,2.73,0,0,1,7.5,16H4.87V12.5H7.54a3.18,3.18,0,0,1,1.25.22,1.44,1.44,0,0,1,.79,1.41A1.69,1.69,0,0,1,8.76,15.77ZM15.5,7.5h4A.5.5,0,0,0,20,7V6.5a.5.5,0,0,0-.5-.5h-4a.5.5,0,0,0-.5.5V7A.5.5,0,0,0,15.5,7.5Zm6.36,6.24a.5.5,0,0,0,.14-.35,8.44,8.44,0,0,0-.08-1.27,4.32,4.32,0,0,0-.71-1.84A3.62,3.62,0,0,0,19.67,9a5,5,0,0,0-2.09-.42,4.28,4.28,0,0,0-3.19,1.24,4.82,4.82,0,0,0-1.23,3.55,4.31,4.31,0,0,0,1.36,3.57A4.87,4.87,0,0,0,17.66,18,4.31,4.31,0,0,0,21,16.7a3.28,3.28,0,0,0,.8-1.29.24.24,0,0,0,0-.22.23.23,0,0,0-.2-.1H19.78a.51.51,0,0,0-.42.22,1.64,1.64,0,0,1-.34.39,2,2,0,0,1-1.3.41,2.29,2.29,0,0,1-1.28-.34,2.09,2.09,0,0,1-.93-1.88h6A.51.51,0,0,0,21.86,13.74Zm-6.3-1.24a2.39,2.39,0,0,1,.62-1.38,1.87,1.87,0,0,1,1.4-.52,2,2,0,0,1,1.38.49,1.94,1.94,0,0,1,.62,1.41Z">
                                </path>
                            </svg></div>
                            <p className=" MuiBox-root css-tuzptp">Pending</p>
                        </div>
                        <h5 className=" MuiBox-root css-19thmws">Create Minimal Logo</h5>
                        <p className=" MuiBox-root css-1imspi1">Minimalistic logo for fitness appk, the project will get brand
                            identity when the get recognized...</p>
                        <div className="css-3de75">
                            <span className="MuiLinearProgress-root
                            MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-3bkacx"
                            role="progressbar" >
                                <span className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary
                                MuiLinearProgress-bar1Determinate css-17jm9ao"
                                      style={{transform: 'translateX(-30%)'}}>
                                </span>
                            </span>
                            <h6 className=" MuiBox-root css-11tyiws">70%</h6>
                        </div>
                        <div className="MuiBox-root css-1lekzkb">
                            <div className="MuiAvatarGroup-root css-143gqfl">
                                <div className="MuiAvatar-root MuiAvatar-circular MuiAvatarGroup-avatar css-1trgs9a">
                                    <img src="/static/avatar/002-girl.svg" className="MuiAvatar-img css-1hy9t21"/></div>
                                <div className="MuiAvatar-root MuiAvatar-circular MuiAvatarGroup-avatar css-1trgs9a">
                                    <img src="/static/avatar/001-man.svg" className="MuiAvatar-img css-1hy9t21"/>
                                </div>
                            </div><small className=" MuiBox-root css-1laq4cc">Due In 2 Days</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       )
};

export default ProfileProjectList;