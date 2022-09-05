import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";
import '../../assets/components/AltTable/style.scss';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {CloudDownload, Delete, Devices, East, Edit, FilterAlt, Search, Sort} from "@mui/icons-material";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount, getQueryVarsInStringFormat} from "../../utils/pages";
import defOrderSortOrderData, {getSortOrderOptionValue} from "./sortOptions";
import {SortOrderOptionType} from "../../types/global";
import {defLimit, defPage} from "../../utils/constant";
import OrderFilter, {OrderFilterData} from "./OrderFilter";
import useDebounce from "../../hooks/useDebounce";
import {Order, OrderStatus} from "../../types/order";
import {OrderService} from "../../services/OrderService";
import {styled} from "@mui/system";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import defProjectSortOrderData from "../projects/sortOptions";

export const SearchInput = styled("div")(({ theme }) => ({
    padding: "10px",
    width: '400px',
    display: 'flex',
}));

export const Line = styled("div")(({theme}) => ({
    height: '2px',
    backgroundColor: 'black',
    margin: '5px 0px',
    width: '100px',
}));

const ProjectsListPage = () => {

    const navigator = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);
    const lastElementRef = useRef<any>();

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const [page, setPage] = useState<number>(defPage);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(defLimit);
    const [sort, setSort] = useState<string>( 'created_at');
    const [order, setOrder] = useState<string>('desc');

    const [filterOptionData, setFilterOptionData] = useState<OrderFilterData | null>(null);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const [openEmployeeAddMoal, setOpenEmployeeAddModal] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [statuses, setStatuses] = useState<OrderStatus[]>([]);

    const urlParamsStr = useMemo<string>( () => {
        const params = [
            { key: 'page', value: page },
            { key: 'limit', value: limit },
            { key: 'sort', value: sort },
            { key: 'order', value: order },
            { key: 'search', value: search },

            { key: 'orderStatuses', value: JSON.stringify(filterOptionData?.orderStatuses) },
            { key: 'deadlineRange', value: JSON.stringify(filterOptionData?.deadlineRange) },
            { key: 'createdAtOrderRange', value: JSON.stringify(filterOptionData?.createdOrderRange) },
        ];
        return getQueryVarsInStringFormat(params);
    }, [sort, order, page, limit, debouncedSearch, filterOptionData]);

    const [fetchOrders, isLoading, error ] = useFetching(async () => {
        const { data } = await OrderService.getOrders(urlParamsStr);
        const total = getPageCount(data.total, limit);

        setTotalPage(total);
        if(page > 1) {
            setOrders([...orders, ...data.data]);
        }
        else if(page === 1) {
            setOrders([...data.data]);
        }
        else {
            setOrders([]);
        }
    });

    useEffect(() => {

        const fetchStatuses = async () => {
            const { data }  = await OrderService.getOrderStatuses();
            setStatuses(data);
        }
        fetchStatuses();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [page, limit, sort, order, debouncedSearch, filterOptionData]);

    useObserver(lastElementRef,page < totalPage, isLoading, () => {
        console.log('-' , page, totalPage, '-');
        setPage(page + 1);
    });

    const onSortOrderHandleChange = (event: any) => {
        const value = event.target.value;
        const option = defOrderSortOrderData.find((e: SortOrderOptionType) => e.id == value);
        if (option) {
            setSort(option.value);
            setOrder(option.order);
            setPage(defPage);
            setLimit(defLimit);
        }
    }

    const deleteOrder = (orderId: number) => {
        const deleteIndex = orders.findIndex((e: Order) => e.id === orderId);
        orders.splice(deleteIndex, 1);
        setOrders([...orders]);
        OrderService.deleteOrder(orderId);
    }

    const handlerFilterChange = useCallback((data: OrderFilterData, isReset: boolean) => {
        setFilterOptionData({...data});
        setPage(defPage);
        setLimit(defLimit);

    }, []);

    const handleStatusChange = async (event: any, orderId: number, oldStatusId: number) => {
        const value = event.target.value;
        const { data } = await OrderService.updateOrder(orderId, {
            'order_status_id': oldStatusId,
            'new_order_status_id': value
        });
        const newOrders = [ ...orders ];
        const findIndex = newOrders.findIndex(e => e.id === data.id);
        newOrders.splice(findIndex, 1, data);
        setOrders(newOrders);
    }

    return (
        <Container>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Orders" }]} />
            </Box>

            <div className='table-alt-1'>
                <Card className="card-box mb-4">
                    <div className="card-header" style={{display: 'block'}}>
                        <div className="card-header--title">
                            <small>Tables</small>
                            <h3>Orders</h3>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <SearchInput>
                                <TextField
                                    id="outlined-search"
                                    label="Search Order By Client (phone, email, name)"
                                    type="search"
                                    size='small'
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <Search />
                                            </InputAdornment>
                                        ),
                                         style: {
                                             paddingRight: '0'
                                         }
                                    }}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />
                            </SearchInput>
                            <Box
                                className="card-header--actions"
                                style={{
                                    display: 'flex',
                                    height: '40px',
                                }}
                            >
                                <Select
                                    size='small'
                                    style={{
                                        minWidth: '200px',
                                    }}
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    defaultValue='1'
                                    label="Sort"
                                    onChange={(e: any) => onSortOrderHandleChange(e)}
                                >
                                    {
                                        defOrderSortOrderData.map((e: SortOrderOptionType) =>
                                            <MenuItem
                                                key={e.id}
                                                value={e.id}
                                            >
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    className="text-primary"
                                                    title="View details"
                                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                >
                                                    <Sort/>

                                                </IconButton>
                                                { getSortOrderOptionValue(e) }
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    className="text-primary"
                                    title="View details"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    style={{
                                        border: '1px dashed gray',
                                        height: 'auto',
                                        padding: '0px 50px'
                                    }}
                                >
                                    Filter
                                    <FilterAlt/>

                                </IconButton>

                            </Box>
                        </div>

                    </div>
                    <CardContent className="p-0">
                       <OrderFilter
                           isOpen={isFilterOpen}
                           onFilterChange={handlerFilterChange}
                       />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover text-nowrap mb-0">
                                <thead className="thead-light">
                                <tr>
                                    <th className="text-center">#id</th>
                                    <th className="text-center">Project</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Customer Contact Info</th>
                                    <th className="text-center">Extra File</th>
                                    <th className="text-center">Created Order / Deadline Date</th>
                                    <th className="text-center">Actions</th>

                                </tr>
                                </thead>
                                <tbody>
                                { orders.map((e: Order) =>
                                    <tr
                                        key={e.id}>
                                        <td>
                                            <div
                                                className="d-flex align-items-center"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                <div>
                                                    <span className="font-weight-bold text-black">
                                                        {e.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className="d-flex align-items-center"
                                                 style={{
                                                     display: 'flex',
                                                     justifyContent: 'center'
                                                 }}>
                                                    {
                                                        e.project ?
                                                            <div>
                                                                 <span className="font-weight-bold text-black">
                                                                    {e.project.name}
                                                                </span>
                                                                    <span className="text-black-50 d-block">
                                                                    {e.project.project_type.name}
                                                                </span>
                                                            </div>
                                                            :
                                                            <span className="font-weight-bold text-black">
                                                                No project yet
                                                            </span>
                                                    }
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Box>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                    <Select
                                                        style={{
                                                            width: '200px',
                                                            border: `1px solid black`,
                                                            color: `${statuses.find(status =>
                                                                status.id === e.status_id
                                                            )!.bgColor}`
                                                        }}
                                                        id="demo-select-status"
                                                        defaultValue={
                                                            statuses.find(status =>
                                                                status.id === e.status_id
                                                            )!.id}
                                                        onChange={(event: any) =>
                                                            handleStatusChange(event, e.id, e.status_id)
                                                        }
                                                    >
                                                        {
                                                            statuses.map(status =>
                                                                <MenuItem
                                                                    key={status.id}
                                                                    value={status.id}
                                                                    style={{
                                                                        border: `1px solid ${status.bgColor} !important`
                                                                    }}
                                                                >
                                                                    {status.name}
                                                                </MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <Box style={{
                                                width: '250px',
                                                overflowX: 'hidden'
                                            }}>
                                                { e.customer_id ?
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="MuiAvatar-root MuiAvatar-circle"
                                                            style={{marginRight: '10px'}}
                                                            >
                                                            <Avatar
                                                                alt="avatar"
                                                                src={`${API_URL_WITH_PUBLIC_STORAGE}/${e.customer?.user.avatar}`}
                                                                className="MuiAvatar-img"
                                                            />
                                                            </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignContent: 'start'}}
                                                        >
                                                            <a href="#/"
                                                               style={{
                                                                   maxWidth: '200px',
                                                                   whiteSpace: 'nowrap',
                                                                   overflow: 'hidden',
                                                                   textOverflow: 'ellipsis',
                                                               }}
                                                               className="text-left font-weight-bold text-black"
                                                                title="...">
                                                                {e.customer!.user.full_name}
                                                            </a>
                                                            <div className="text-left text-black-50 d-block">
                                                                  {e.customer!.user.email}
                                                            </div>
                                                            <div className="text-left text-black-50 d-block">
                                                                {
                                                                    e.customer!.user.phones &&
                                                                    e.customer!.user.phones.length > 0 &&
                                                                    `${e.customer!.user.phones[0].phone_number}`
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                         <span className="font-weight-bold text-black">
                                                            {e.order_contact!.name}
                                                        </span>
                                                        <span className="text-black-50 d-block">
                                                           {e.order_contact!.email}
                                                        </span>
                                                        <span className="text-black-50 d-block">
                                                           {e.order_contact!.phone}
                                                        </span>
                                                    </div>
                                                }

                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <Box className="py-0 px-3 file-download">
                                                {
                                                    e.extra_file ?
                                                        <IconButton onClick={() => {
                                                            // eslint-disable-next-line no-restricted-globals
                                                            location.href = `${API_URL_WITH_PUBLIC_STORAGE}/${e.extra_file}`;
                                                        }}>
                                                            <CloudDownload/>
                                                        </IconButton>
                                                        :
                                                        'no extra file'
                                                }
                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <div
                                                className="h-auto py-0 px-3 badge d-flex"
                                                 style={{
                                                     fontSize: '13px',
                                                     flexWrap: 'wrap',
                                                     flexDirection: 'column',
                                                     alignContent: 'center'
                                                 }}>
                                                    {
                                                        <div>
                                                            {moment(e.created_at).format('DD/MM/YYYY')}
                                                        </div>

                                                    }
                                                    <Line />
                                                    {
                                                        e.project_id && e.project?.deadline ?
                                                            <div>
                                                                {moment(e.project.deadline).format('DD/MM/YYYY')}
                                                            </div>
                                                        :
                                                            'no deadline yet'
                                                    }
                                            </div>
                                        </td>



                                        <td className="text-center table-action-btn">
                                            <Box>
                                                <IconButton>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => deleteOrder(e.id)}>
                                                    <Delete />
                                                </IconButton>
                                                {
                                                    e.project_id &&
                                                    <IconButton
                                                        onClick={() => {
                                                            navigator(`/projects/${e.project_id}`)
                                                        }}
                                                    >
                                                        <Devices />
                                                        <East />
                                                    </IconButton>
                                                }

                                            </Box>
                                        </td>
                                    </tr>
                                )}

                                </tbody>
                            </table>
                            {
                                !isLoading && orders.length === 0 &&
                                    <h3>No data</h3>
                            }

                            <div
                                ref={lastElementRef}
                                style={{
                                    width: '100%',
                                    // height: 20,
                                    background: 'red',
                                }}>

                            </div>
                        </div>
                        { isLoading &&
                        <CircularProgress />
                        }
                    </CardContent>
                </Card>
            </div>



            {/*<AddEmployeeToProjectModal*/}
            {/*    open={openEmployeeAddMoal}*/}
            {/*    onClose={() => setOpenEmployeeAddModal(false)}*/}
            {/*    onSave={addEmployeeToProjectHanle}*/}
            {/*    setOpen={setOpenEmployeeAddModal}*/}
            {/*    project={selectedOrder}*/}
            {/*/>*/}


        </Container>
    );
}


export default ProjectsListPage;