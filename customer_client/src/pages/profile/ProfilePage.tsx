import React, {useEffect, useMemo, useState} from 'react';
import '../../assets/components/Profile/index.css';
import tw from "twin.macro";
import {Container as ContainerBase} from "../../components/misc/Layouts";
import {Box, CircularProgress} from '@mui/material';
import {useSearchParams} from "react-router-dom";
import {Settings} from "@mui/icons-material";
import {ProfileTabName, Tab, TabComponent} from "../../types/global";
import {MyLoader} from "../../components/layout/LayoutSuspence";
import { Suspense } from 'react';
import useAuth from "../../hooks/useAuth";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";

//@ts-ignore
import UserCover from '../../assets/images/user-cover-pic.png';

const Container = tw(ContainerBase)`min-h-screen text-white font-medium`;
const Content = tw.div`max-w-screen-xl my-0 sm:my-8 bg-white text-gray-900 shadow sm:rounded-lg mx-auto`;

//  Array.from(Array(2).keys()).map((tab: number)

const General = React.lazy(() => import("./Tabs/General"));
const Orders = React.lazy(() => import("./Tabs/Orders"));
const Payment = React.lazy(() => import("./Tabs/payment/Payment"));
const Chat = React.lazy(() => import("./Tabs/Chat"));

export const TabPanel : React.FC<TabComponent> = ({tabIndex, currentIndex, children, ...props}) => {
    return (
        <Box
            sx={{ display: currentIndex === tabIndex ? 'block' : 'none'}}
        >
            {children}
        </Box>
    )
}

const ProfilePage = () => {

    const { profileDetail, user } = useAuth();


    useEffect(() => {
        profileDetail();
    }, []);

    const tabs : Tab[] = [
        {
            index: 0,
            name: ProfileTabName.GENERAL,
            element: <General />
        },
        {
            index: 1,
            name: ProfileTabName.ORDERS,
            element: <Orders />
        },
        {
            index: 2,
            name: ProfileTabName.PAYMENT,
            element: <Payment />
        },
        {
            index: 3,
            name: ProfileTabName.CHATS,
            element: <Chat />
        }
    ]

    const [searchParams, setSearchPrams] = useSearchParams();


    const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

    const setCurrentTabByIndex = (index: number) => {
        const tab = tabs.find(tab => tab.index === index)!;
        setCurrentTab(tab);
    }


    useEffect(() => {
        const tabName  = searchParams.get('tab');
        switch (tabName) {
            case 'setCurrentTabByIndex':
                setCurrentTabByIndex(0)
                break;
            case 'orders':
                setCurrentTabByIndex(1)
                break;
            case 'payment':
                setCurrentTabByIndex(2)
                break;
            case 'chats':
                setCurrentTabByIndex(3)
                break;
            default:
                setCurrentTabByIndex(0);
        }
    }, [searchParams])

    const onTabIndexChange = (index: number) => {
        setCurrentTabByIndex(index);

        const tab = tabs.find(t => t.index === index);
        if(tab)
            setSearchPrams({ 'tab':  tab.name.toLowerCase()});
    }


    return (
        <Container>

            <Content>
                <div className="y flex">

                    <div className="uw flex ak wn wo wu">

                    <div className="y sb hu">
                        <img className="dy sh ou"
                             src={UserCover}
                             width="979"
                             height="220"
                             alt="Profile background"
                        />

                            <button className="qz g ty tf _u ye bl xj" >
                            <span className="d">Close sidebar</span>
                            <svg className="oi so du" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"></path>
                            </svg>
                        </button>
                    </div>


                <div className="y vs jj mk">
                    <div className="ib rh _x">
                        <div className="flex ak items-center ja jd jl">
                            <div className="inline-flex rj rq ri _y">
                                <img className="rounded-full ci cc"
                                     src={`${API_URL_WITH_PUBLIC_STORAGE}/${user!.avatar}`}
                                     width="128"
                                     height="128"
                                     alt="Avatar"
                                />
                            </div>
                            <div className="flex fc _k">
                                <button className="ve ub rounded border border-slate-200 hover--border-slate-300 bv">
                                    <svg className="oo sd du gq" viewBox="0 0 16 4">
                                        <circle cx="8" cy="2" r="2"></circle>
                                        <circle cx="2" cy="2" r="2"></circle>
                                        <circle cx="14" cy="2" r="2"></circle>
                                    </svg>
                                </button>
                                <button className="ve ub rounded border border-slate-200 hover--border-slate-300 bv">

                                </button>
                                <button className="r ho xi ye">
                                    <span className="nq px-3">
                                        Setting
                                         <Settings
                                             className="px-3"
                                         />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <header className="gn qe rh">
                        <div className="inline-flex aj ru">
                            <h1 className="gu text-slate-800 font-bold">{user!.full_name}</h1>
                            <svg className="oo sl du ub yn nq" viewBox="0 0 16 16">
                                <path d="M13 6a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5A.75.75 0 0 1 13 6ZM6 16a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 1 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z"></path>
                            </svg>
                        </div>
                        <div className="text-sm ro">
                            {user!.email}
                        </div>
                        <div className="flex flex-wrap justify-center jh fy">
                            <div className="flex items-center">
                                <svg className="oo sl du ub gq" viewBox="0 0 16 16">
                                    <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z"></path>
                                </svg>
                                <span className="text-sm gp lm text-slate-500 nq">Milan, IT</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="oo sl du ub gq" viewBox="0 0 16 16">
                                    <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z"></path>
                                </svg>
                                <a className="text-sm gp lm text-indigo-500 xh nq" href="#0">carolinmcneail.com</a>
                            </div>
                        </div>
                    </header>
                    {/*block mg text-indigo-500 lm cu cx*/}
                    {/*block mg text-slate-500 hover--text-slate-600 lm*/}

                    <div className="y rh">
                        <div className="g te ou sk hu" aria-hidden="true"></div>
                        <ul className="y text-sm gp flex a_ nd _m tem lh l">
                            {
                                tabs.map(tab =>
                                    <li
                                        style={{cursor: 'pointer'}}
                                        key={tab.index}
                                        className={"is last--mr-0 wb qr ttx wj qi ttk"}
                                        onClick={() => onTabIndexChange(tab.index)}
                                        // style={{display: tabIndex === tab.index ? 'block' : 'none'}}
                                    >
                                        <a
                                            className={
                                                currentTab.index === tab.index ?
                                                    'block mg text-indigo-500 lm cu cx'
                                                    : 'block mg text-slate-500 hover--text-slate-600 lm'
                                            }
                                           onClick={(e) => {
                                               e.preventDefault();


                                           }}>
                                            {tab.name}
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <TabPanel
                        currentIndex={currentTab.index}
                        tabIndex={currentTab.index}
                    >
                        <Suspense fallback={<CircularProgress />}>
                            {currentTab.element}
                        </Suspense>

                    </TabPanel>




                </div>

            </div>

        </div>

            </Content>
        </Container>

)
    }

export default ProfilePage;