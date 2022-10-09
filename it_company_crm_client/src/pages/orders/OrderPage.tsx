import React, {useEffect, useMemo, useState} from 'react';
import {PageMode} from "../../types/global";
import {useNavigate, useParams} from "react-router-dom";
import {Order, OrderStatus} from "../../types/order";
import {OrderService} from "../../services/OrderService";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    Grid,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from "@mui/material";
import {Container} from "../../assets/components/breadcrumb";
import {Breadcrumb} from "../../components";
import {Delete, Devices, FileDownload} from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import '../../assets/components/ProjectPage/index.css';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const OrderPage : React.FC<{ mode: PageMode, setMode: () => void }>
    = ({ mode, setMode}) => {

        
    const navigate = useNavigate();

    const { orderId } = useParams();
    const [order, setOrder] = useState<Order>();

    const [statuses, setStatuses] = useState<OrderStatus[]>([]);
    const [orderPageMode, setOrderPageMode] = useState<PageMode>(PageMode.SELECT);

    console.log(order?.customer?.user.phones.map(t => t.phone_number));

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

    }, [])


   const userTagsAutocompliteDefaultValues = useMemo<string[]>(() => {
           return order && order.customer ?
               order.customer.user.tags.map(e => e.name) : [];
       }
   , [order]);


    const deleteOrder = async () => {
        if(order) {
            const { data } = await OrderService.deleteOrder(order.id);
            navigate(-1);
        }
    }

    return (
        <Container>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[
                    { name: "Orders", path: '/orders' },
                    { name: orderId }]
                } />
            </Box>


            <Card sx={{p: 3}}>
                <Grid item md={4} xs={12}>
                    <Box
                        style={{
                            display: 'flex', justifyContent: 'space-between'
                        }}>
                        <Box className='just-flex'>
                            <h3>Order #{order?.id}</h3>
                        </Box>
                        <Box style={{
                            display: 'flex', alignItems: 'center'
                        }}>
                            {/*<Button*/}
                            {/*    sx={{mx: 1}}*/}
                            {/*    variant='contained'*/}
                            {/*    color='secondary'*/}
                            {/*>*/}
                            {/*    <div>*/}
                            {/*        EDIT*/}
                            {/*    </div>*/}
                            {/*    <Edit />*/}
                            {/*</Button>*/}
                            <Button
                                sx={{
                                    mx: 1,
                                }}
                                variant='contained'
                                color={'error'}
                                onClick={deleteOrder}
                            >
                                <div>
                                    DELETE
                                </div>
                                <Delete />
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid container spacing={3} sx={{mt: 5}}>
                    <Grid item md={9} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <h3>Order Data</h3>
                                <div className='flex-table' style={{height: '450px'}}>
                                    <div className='flex-row'>
                                        <div className='flex-cell'>
                                            Created at:
                                        </div>
                                        <div className='flex-cell'>
                                            {
                                                moment(order?.created_at).format('DD/MM/YYYY')
                                            }
                                        </div>
                                    </div>

                                    <div className='flex-row'>
                                        <div className='flex-cell'>
                                            Status:
                                        </div>
                                        <div className='flex-cell' style={{
                                            color: `${order?.status.bgColor}`
                                        }}>

                                        {order?.status.name}

                                        </div>
                                    </div>
                                    <div className='flex-row'>
                                        <IconButton
                                            onClick={() => {
                                                // eslint-disable-next-line no-restricted-globals
                                                location.href = `${API_URL_WITH_PUBLIC_STORAGE}/${order?.extra_file}`
                                            }}
                                            style={{
                                                borderRadius: 0,
                                                fontSize: 'inherit',
                                                width: '100%'
                                            }}
                                        >
                                            <FileDownload />
                                            Download pinned customer file:
                                        </IconButton>
                                    </div>
                                    <div className='flex-row-column'>
                                        <div className='text-center'>
                                            Short Description:
                                        </div>
                                        <div className='flex-cell'>
                                            { order?.about}
                                        </div>
                                    </div>


                                    <div className='flex-row'>
                                        <div className='flex-cell'
                                             style={{padding: '10px'}}>
                                            Project Link
                                        </div>
                                        <div className='flex-cell'>
                                            {
                                                order?.project_id ?
                                                  <IconButton
                                                      onClick={() =>
                                                          navigate(`/projects/${order?.project_id}`)
                                                        }
                                                      style={{fontSize: 'inherit'}}>
                                                      <Devices/>
                                                      &nbsp;
                                                      Go to Project Page
                                                  </IconButton>
                                                    :
                                                    'Does not exist yet'
                                            }

                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item md={6} xs={12} >
                                <h3>Customer Data</h3>
                                {
                                    order?.customer ?
                                        <div className='flex-table' style={{height: '450px'}}>
                                            <div className='flex-row'>
                                                <div className='flex-cell'>
                                                    CUSTOMER USER ID
                                                </div>
                                                <div className='flex-cell'>
                                                    {order?.customer?.user.id}
                                                </div>
                                            </div>
                                            <div className='flex-row'>
                                                <div className='flex-cell'>
                                                    Full Name
                                                </div>
                                                <div className='flex-cell'>
                                                    {order?.customer?.user.full_name}
                                                </div>
                                            </div>

                                            <div className='flex-row'>
                                                <div className='flex-cell'>
                                                    Email
                                                </div>
                                                <div className='flex-cell'>
                                                    {order?.customer?.user.email}
                                                </div>
                                            </div>

                                            <div className='flex-row'>
                                                <div className='flex-cell text-center' style={{padding: '20px 0'}}>
                                                    Phones
                                                </div>
                                                <div className='flex-cell-list'>
                                                    <ul>
                                                        {order?.customer?.user.phones.map(phone =>
                                                            <li>{phone.phone_number}</li>
                                                        )}
                                                    </ul>

                                                </div>
                                            </div>
                                            <div className='flex-row-column'>
                                                <div className='text-center'>
                                                    Tags
                                                </div>
                                                { order &&
                                                    <div className='flex-cell-list'>
                                                        <Autocomplete
                                                            multiple
                                                            id="tags-filled"
                                                            options={order.customer ?
                                                                order.customer.user.tags.map((tag) => tag.name)
                                                                : []
                                                            }
                                                            defaultValue={[...userTagsAutocompliteDefaultValues]}
                                                            freeSolo
                                                            renderTags={(value: readonly string[], getTagProps) =>
                                                                value.map((option: string, index: number) => (
                                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                                ))
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    variant="filled"
                                                                    label="freeSolo"
                                                                    placeholder="Favorites"
                                                                />)}
                                                        />
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                        :
                                        <div className='flex-table' style={{height: '450px'}}>
                                            <div className='flex-row'>
                                                <div className='flex-cell'>
                                                    Name
                                                </div>
                                                <div className='flex-cell'>
                                                    {order?.order_contact!.name}
                                                </div>
                                            </div>

                                            <div className='flex-row'>
                                                <div className='flex-cell'>
                                                    Email
                                                </div>
                                                <div className='flex-cell'>
                                                    {order?.order_contact!.email}
                                                </div>
                                            </div>

                                            <div className='flex-row'>
                                                <div className='flex-cell text-center'
                                                     style={{padding: '20px 0'}}>
                                                    Phones
                                                </div>
                                                <div className='flex-cell'>
                                                    {order?.order_contact!.phone}
                                                </div>
                                            </div>
                                        </div>
                                }

                            </Grid>
                        </Grid>
                        <Box style={{marginTop: "50px"}}>
                            <h3>Transaction History</h3>

                            <TableContainer
                                component={Paper}
                                sx={{
                                    height: '270px',
                                    overflowY: "scroll"
                                }}
                            >
                                <Table
                                    // aria-label="simple table"
                                    stickyHeader aria-label="sticky table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">ID</TableCell>
                                            <TableCell align="center">Card</TableCell>
                                            <TableCell align="center">Summa</TableCell>
                                            <TableCell align="center">Issuer</TableCell>
                                            <TableCell align="center">Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order?.transactions.map((transaction) => (
                                            <TableRow
                                                key={transaction.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" align="center">
                                                    {transaction.id}
                                                </TableCell>
                                                <TableCell align="center">****{transaction.last_card_digits}</TableCell>
                                                <TableCell align="center">{transaction.summa}</TableCell>
                                                <TableCell align="center">{transaction.issuer}</TableCell>
                                                <TableCell align="center">{
                                                    moment(transaction.created_at).format('DD/MM/YYYY')
                                                }</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table> 
                            </TableContainer>
                        </Box>

                    </Grid>
                    <Grid item md={3} xs={12}>
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
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};


export default OrderPage;