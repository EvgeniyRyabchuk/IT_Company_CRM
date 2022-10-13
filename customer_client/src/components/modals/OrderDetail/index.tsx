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
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import Transactions from "../../../pages/profile/Tabs/payment/Transactions";

interface Modal {
    isOpen: boolean,
    onClose: () => void
}



const OrderDetail : React.FC<{order: Order}>
    = ({order}) => {

    const [statuses, setStatuses] = useState<OrderStatus[]>([]);
    const [orderPageMode, setOrderPageMode] = useState<PageMode>(PageMode.SELECT);

    useEffect(() => {
        const fetchOrderStatuses = async () => {
            const { data } = await OrderService.getOrderStatuses();
            setStatuses(data);
        }
        fetchOrderStatuses();
    }, []);



    return (
        <OrderDetailWrapper>
            <Grid container spacing={3}>
                <Grid item md={9} xl={9} sx={{padding: '20px 50px !important'}}>
                    <Grid container spacing={3}>
                        <Grid item md={12}>
                            <Typography sx={{pb: 1}} variant='h2'>
                                {
                                    order.project ? `Project Name: ${order.project.name}`
                                        : 'No Created Project Yet'
                                }
                            </Typography>

                            <Typography
                                sx={{pb: 1}}
                                variant='h6'
                            >
                                {
                                    order.project &&
                                    `Project type: ${order.project.project_type.name}`
                                }
                            </Typography>

                            <Box sx={{ my: 3, textAlign: 'jusify'}}>
                                <h2>Your short description</h2>
                                <Typography
                                    align='justify'>
                                    { order.about }
                                </Typography>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container sx={{my: 1}}>
                                <Grid item xs={12} sm={12} md={6} xl={6}>
                                    <FlexBoxCenter>
                                        <Box>
                                            <Typography>
                                                Your Order Extra File
                                            </Typography>
                                            {
                                                order.extra_file ?

                                                <IconButton
                                                    onClick={() => {
                                                        window.location.href
                                                            = `${API_URL_WITH_PUBLIC_STORAGE}/${order.extra_file}`
                                                    }}
                                                >
                                                    <Typography>
                                                        { order.extra_file.split('/').at(-1) }
                                                        {/*somedoc.doc*/}
                                                    </Typography>

                                                    <Download sx={{mx: 1}}/>
                                                </IconButton> : 'No Extra File'
                                            }
                                        </Box>
                                    </FlexBoxCenter>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} xl={6}>
                                    <Box sx={{my: 2}}>
                                        <Typography variant={'caption'} align='center'>
                                            Progress
                                        </Typography>
                                        <FlexBoxCenter>
                                            {
                                                order.project &&
                                                <AvatarGroup
                                                    total={order.project.employees.length}>
                                                    {
                                                        order.project.employees.map(employee =>
                                                            <Avatar alt="Remy Sharp"
                                                                    src={`${API_URL_WITH_PUBLIC_STORAGE}/${employee.user.avatar}`}
                                                            />
                                                        )
                                                    }
                                                </AvatarGroup>
                                            }

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
                        {
                            order.project &&
                            <Grid item xs={12} sm={12} md={12}>
                                <FlexBoxCenter>
                                    <Box sx={{ m: 3}}>
                                        <Typography sx={{mb: 1}}>
                                            Budget
                                        </Typography>
                                        <Typography>
                                            { order.project.budget }
                                        </Typography>
                                    </Box>
                                    <Box sx={{ m: 3}}>
                                        <Typography sx={{mb: 1}}>
                                            Paid
                                        </Typography>
                                        <Typography>
                                            { order.project.paid }
                                        </Typography>
                                    </Box>
                                    <Box sx={{ m: 3}}>
                                        <Typography sx={{mb: 1}}>
                                            Deadline
                                        </Typography>
                                        <Typography>
                                            {
                                                moment(order.project.deadline)
                                                    .format('DD-MM-YYYY')
                                            }
                                        </Typography>
                                    </Box>
                                </FlexBoxCenter>
                            </Grid>
                        }
                        <Grid item xs={12} sm={12} md={12}>
                            <Transactions _for='order' orderId={order.id} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item
                      md={3}
                      xl={3}
                      sx={{p: 4}}
                >
                    <Box>
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

                </Grid>
            </Grid>
        </OrderDetailWrapper>
    );
};

export default OrderDetail;