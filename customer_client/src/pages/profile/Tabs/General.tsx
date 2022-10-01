import React from 'react';
import {AvatarGroup, Box} from "@mui/material";
import Avatar from "@mui/material/Avatar";


const General : React.FC<{}> = () => {
    return (
        <Box
            className="flex ak tnq trn">
            <div className="fj rc tnc">
                <div>
                    <h2 className="text-slate-800 gh ru">About Me</h2>
                    <div className="text-sm fb">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p>Consectetur adipiscing elit, sed do eiusmod tempor magna aliqua.</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-slate-800 gh ru">Departments</h2>
                    <div className="sn tnj fs">
                        {Array.from('x'.repeat(2)).map(e =>
                            <div className="bg-white dw border border-slate-200 rounded-sm bv">
                                <div className="uw flex items-center ld ru">
                                    <div className="os sf ub flex items-center justify-center hx rounded-full mr-2">
                                        <img className="nz" src="https://preview.cruip.com/mosaic/images/icon-03.svg" width="14" height="14" alt="Icon 03" />
                                    </div>
                                    <div className="ld">
                                        <span className="text-sm gp text-slate-800">
                                            Acme Marketing
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm ro">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                                </div>
                                <div className="flex fe items-center">
                                    <AvatarGroup
                                        sx={{
                                            '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 15 },
                                        }}
                                        total={24}>
                                        {
                                            Array.from('x'.repeat(5)).map(e1 =>
                                                <Avatar sx={{ height: '30px', width: '30px' }} alt="Remy Sharp" src="https://preview.cruip.com/mosaic/images/avatar-04.jpg" />
                                            )
                                        }

                                    </AvatarGroup>
                                </div>
                            </div>
                        )}


                    </div>

                </div>


                <div>
                    <h2 className="text-slate-800 gh ru">Work History</h2>
                    <div className="bg-white dw border border-slate-200 rounded-sm bv">
                        <ul className="fw">

                            <li className="je jc jd">
                                <div className="js flex items-center text-sm">

                                    <div className="os sf rounded-full ub hy ng ra">
                                        <svg className="os sf du yy" viewBox="0 0 32 32">
                                            <path d="M21 14a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5.75.75 0 0 1-.75.75Zm-7 10a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 0 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z"></path>
                                        </svg>
                                    </div>

                                    <div>
                                        <div className="gp text-slate-800 text-left">Senior Product Designer</div>
                                        <div className="flex a_ items-center fc lm">
                                            <div>Remote</div>
                                            <div className="gq">·</div>
                                            <div>April, 2020 - Today</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="__ rb _j">
                                    <ul className="flex flex-wrap jp -m-1">
                                        <li className="m-1">
                                            <button className="inline-flex items-center justify-center go gp gw rounded-full vp vd border border-slate-200 hover--border-slate-300 bv bg-white text-slate-500 wi wu">Marketing</button>
                                        </li>
                                        <li className="m-1">
                                            <button className="inline-flex items-center justify-center go gp gw rounded-full vp vd border border-slate-200 hover--border-slate-300 bv bg-white text-slate-500 wi wu">+4</button>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="je jc jd">
                                <div className="js flex items-center text-sm">

                                    <div className="os sf rounded-full ub ho ng ra">
                                        <svg className="os sf du text-indigo-50" viewBox="0 0 32 32">
                                            <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z"></path>
                                        </svg>
                                    </div>

                                    <div>
                                        <div className="gp text-slate-800 text-left">Product Designer</div>
                                        <div className="flex a_ items-center fc lm">
                                            <div>Milan, IT</div>
                                            <div className="gq">·</div>
                                            <div>April, 2018 - April 2020</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="__ rb _j">
                                    <ul className="flex flex-wrap jp -m-1">
                                        <li className="m-1">
                                            <button className="inline-flex items-center justify-center go gp gw rounded-full vp vd border border-slate-200 hover--border-slate-300 bv bg-white text-slate-500 wi wu">Marketing</button>
                                        </li>
                                        <li className="m-1">
                                            <button className="inline-flex items-center justify-center go gp gw rounded-full vp vd border border-slate-200 hover--border-slate-300 bv bg-white text-slate-500 wi wu">+4</button>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="je jc jd">
                                <div className="js flex items-center text-sm">

                                    <div className="os sf rounded-full ub ho ng ra">
                                        <svg className="os sf du text-indigo-50" viewBox="0 0 32 32">
                                            <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z"></path>
                                        </svg>
                                    </div>

                                    <div>
                                        <div className="gp text-slate-800 text-left">Product Designer</div>
                                        <div className="flex a_ items-center fc lm">
                                            <div>Milan, IT</div>
                                            <div className="gq">·</div>
                                            <div>April, 2018 - April 2020</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="__ rb _j">
                                    <ul className="flex flex-wrap jp -m-1">
                                        <li className="m-1">
                                            <button className="inline-flex items-center justify-center go gp gw rounded-full vp vd border border-slate-200 hover--border-slate-300 bv bg-white text-slate-500 wi wu">Marketing</button>
                                        </li>
                                        <li className="m-1">
                                            <button className="inline-flex items-center justify-center go gp gw rounded-full vp vd border border-slate-200 hover--border-slate-300 bv bg-white text-slate-500 wi wu">+4</button>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>


            <aside className="tnx tnw fw text-left">
                <div className="text-sm">
                    <h3 className="gp text-slate-800">Title</h3>
                    <div>Senior Product Designer</div>
                </div>
                <div className="text-sm">
                    <h3 className="gp text-slate-800">Location</h3>
                    <div>Milan, IT - Remote</div>
                </div>
                <div className="text-sm">
                    <h3 className="gp text-slate-800">Email</h3>
                    <div>carolinmcneail@acme.com</div>
                </div>
                <div className="text-sm">
                    <h3 className="gp text-slate-800">Birthdate</h3>
                    <div>4 April, 1987</div>
                </div>
                <div className="text-sm">
                    <h3 className="gp text-slate-800">Joined Acme</h3>
                    <div>7 April, 2017</div>
                </div>
            </aside>

        </Box>
    );
};

export default General;