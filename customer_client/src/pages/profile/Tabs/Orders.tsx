import React, {useEffect, useState} from 'react';
import {Computer, Download} from "@mui/icons-material";
import {Box, Button, CircularProgress, Grid, IconButton} from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http/index";
import {useNavigate} from "react-router-dom";
import {Order} from "../../../types/order";
import {OrderService} from "../../../services/OrderService";
import '../../../assets/components/Profile/orders.css';
import moment from 'moment';
import {defaultUserAvatar} from "../../../utils/constant";
import ModalWithTransition from "../../../components/modals/ModalWithTransition";
import {DarkBackground, MyLoader} from "../../../components/layout/LayoutSuspence";
import OrderDetail from "../../../components/modals/OrderDetail";
import {useFetching} from "../../../hooks/useFetching";


const Orders : React.FC<{}> = ({}) => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);

    const [fetching, isLoading, error] = useFetching(async () => {
        const { data } = await OrderService.getOrders();
        setOrders(data.data);
    })

    useEffect(() => {
        fetching();
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="MuiBox-root css-1phy807">



            {
                isLoading && <CircularProgress/>
            }

            <Grid container spacing={10}
                  className="MuiGrid-root MuiGrid-container css-1h77wgb">
                {
                    orders.map(order =>
                        <Grid key={order.id}
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              className="MuiGrid-root css-1twzmnh"
                        >
                            <div
                                onClick={() => {

                                    navigate(`/orders/${order.id}`);
                                    // setIsOpen(true);

                                }}
                                className="order-box MuiPaper-root
                                 MuiPaper-elevation MuiPaper-rounded
                                  MuiPaper-elevation1
                                  MuiCard-root css-14lzsk6">
                                <div className="MuiBox-root css-1lekzkb">
                                    <Box sx={{display: 'flex'}}>
                                        <div className="MuiBox-root css-1g86e6t">
                                            <Computer />
                                        </div>
                                        <IconButton
                                            sx={{ p: '0 5px'}}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.location.href = `${API_URL_WITH_PUBLIC_STORAGE}/${order.extra_file}`
                                            }}
                                        >
                                            <Download />
                                        </IconButton>
                                    </Box>

                                    <p
                                        style={{ backgroundColor: order.status.bgColor}}
                                        className=" MuiBox-root css-tuzptp">
                                        {order.status.name}
                                    </p>
                                </div>
                                <h5 className=" MuiBox-root css-19thmws">
                                    {order.project?.name ?? 'No created project for order yet'}
                                </h5>
                                <p
                                    className="project-item MuiBox-root css-1imspi1">
                                    {
                                        order.about
                                    }
                                </p>
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
                                    <AvatarGroup max={4}>
                                        {
                                            order.project ?
                                                order.project.employees
                                                    .map(employee =>
                                                        <Avatar alt="Remy Sharp"
                                                                src={`${API_URL_WITH_PUBLIC_STORAGE}/${employee.user.avatar}`}
                                                        />
                                                    )
                                                :
                                                <Avatar alt="Remy Sharp"
                                                        src={`${defaultUserAvatar}`}
                                                />
                                        }
                                    </AvatarGroup>
                                    <small className=" MuiBox-root css-1laq4cc">
                                        Days until the deadline&nbsp;
                                        {
                                            order.project ?
                                                moment(order.project.deadline).diff(moment(), 'days')
                                                :
                                                '-- / -- / --'
                                        }
                                    </small>
                                </div>
                            </div>
                        </Grid>
                    )
                }

            </Grid>
        </div>
    );
};

export default Orders;