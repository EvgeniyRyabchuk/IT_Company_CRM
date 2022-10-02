import React, {useEffect, useState} from 'react';
import ModalWithTransition from "../ModalWithTransition";
import {
    Box,
    Button,
    Grid,
    IconButton,
    LinearProgress,
    Step,
    StepLabel,
    Stepper,
    styled,
    Typography
} from "@mui/material";
import {FlexBoxCenter, OrderDetailWrapper} from "../../../assets/components/Order/OrderDetail";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import {Download} from "@mui/icons-material";
import moment from "moment";
import {OrderService} from "../../../services/OrderService";
import {Order, OrderStatus} from "../../../types/order";
import {PageMode} from "../../../types/global";
import {useParams} from "react-router-dom";

interface Modal {
    isOpen: boolean,
    onClose: () => void
}



const OrderDetail : React.FC<{}>
    = () => {

    const orderId = 1;
    const [order, setOrder] = useState<Order>();

    const [statuses, setStatuses] = useState<OrderStatus[]>([]);
    const [orderPageMode, setOrderPageMode] = useState<PageMode>(PageMode.SELECT);

    useEffect(() => {

        const fetchOrder = async () => {
            const { data } = await OrderService.getOrder(orderId!);
            setOrder(data);
        }
        const fetchOrderStatuses = async () => {
            const { data } = await OrderService.getOrderStatuses();
            setStatuses(data);
        }
        fetchOrder();
        fetchOrderStatuses();



    }, []);


    return (
        <OrderDetailWrapper>
            <Grid container spacing={3}>
                <Grid item md={6} xl={6}>
                    <Grid container spacing={3}>
                        <Grid item md={12}>
                            <Typography sx={{pb: 1}} variant='h2'>Project Nightfall</Typography>

                            <Typography sx={{pb: 1}}
                                        variant='h6'
                            >
                                Project type
                            </Typography>

                            <Typography  align='justify'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. elit, sed
                                do eiusmod tempor ut labore et dolore magna aliqua. sed do eiusmod tempor ut labore
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container sx={{my: 1}}>
                                <Grid item xs={12} sm={12} md={6} xl={6}>
                                    <FlexBoxCenter>
                                        <Box>
                                            <Typography>
                                                Your Order Extra File
                                            </Typography>
                                            <IconButton>
                                                <Typography>
                                                    somedoc.doc
                                                </Typography>

                                                <Download sx={{mx: 1}}/>
                                            </IconButton>
                                        </Box>
                                    </FlexBoxCenter>

                                </Grid>
                                <Grid item xs={12} sm={12} md={6} xl={6}>
                                    <Box sx={{my: 2}}>
                                        <Typography variant={'caption'} align='center'>
                                            Team
                                        </Typography>
                                        <FlexBoxCenter>
                                            <AvatarGroup total={24}>
                                                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                                                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                                                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                                                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                                            </AvatarGroup>
                                        </FlexBoxCenter>
                                    </Box>


                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress variant="determinate" value={30} aria-label={'asd'} />
                                        </Box>
                                        <Box sx={{ minWidth: 35 }}>
                                            <Typography variant="body2" color="text.secondary">{`${Math.round(
                                                30
                                            )}%`}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <FlexBoxCenter>
                                <Box sx={{ m: 3}}>
                                    <Typography sx={{mb: 1}}>
                                        Budget
                                    </Typography>
                                    <Typography>
                                        $1000
                                    </Typography>
                                </Box>
                                <Box sx={{ m: 3}}>
                                    <Typography sx={{mb: 1}}>
                                        Paid
                                    </Typography>
                                    <Typography>
                                        $300
                                    </Typography>
                                </Box>
                                <Box sx={{ m: 3}}>
                                    <Typography sx={{mb: 1}}>
                                        Deadline
                                    </Typography>
                                    <Typography>
                                        10-10-1000
                                    </Typography>
                                </Box>
                            </FlexBoxCenter>

                        </Grid>
                    </Grid>

                </Grid>

                <Grid item md={6} xl={6}
                      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={{ width: 300 }}>
                        <Stepper activeStep={order?.status.index} orientation="vertical">
                            {statuses.map((status, index) => (
                                <Step key={status.name}>
                                    <StepLabel
                                        optional={
                                            <Typography variant="caption">
                                                Order status №{index+1}
                                                <br/>
                                                {
                                                    moment(order?.status_history
                                                        .find(sh => sh.status_id === status?.id)
                                                        ?.created_at ?? '')
                                                        .format('YYYY-MM-DD hh:mm:ss')
                                                }
                                            </Typography>
                                        }
                                    >
                                        {status.name}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item md={21}>
                    123
                </Grid>
            </Grid>
        </OrderDetailWrapper>
    );
};

export default OrderDetail;