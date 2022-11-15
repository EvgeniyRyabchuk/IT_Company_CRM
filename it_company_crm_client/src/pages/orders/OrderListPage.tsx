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
import {Add, CloudDownload, Delete, Devices, East, Edit, FilterAlt, Info, Search, Sort} from "@mui/icons-material";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount, getQueryVarsInStringFormat} from "../../utils/pages";
import defOrderSortOrderData, {getSortOrderOptionValue} from "./sortOptions";
import {ModalStandartState, SortOrderOptionType} from "../../types/global";
import {defLimit, defPage} from "../../utils/constant";
import OrderFilter, {OrderFilterData} from "./OrderFilter";
import useDebounce from "../../hooks/useDebounce";
import {Order, OrderStatus, OrderStatusNameEnum, UndoOrderReason} from "../../types/order";
import {OrderService} from "../../services/OrderService";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import CreateEditProjectModal from "../../components/modals/CreateEditProjectModal/CreateEditProjectModal";
import {ProjectService} from "../../services/ProjectService";
import UndoOrderModal from "../../components/modals/UndoOrderModal/UndoOrderModal";
import {ViewService} from "../../services/ViewService";
import {FlexJustifyCenter, Line, SearchInput} from "../../assets/components/Shared";
import {CustomerBoxWrapper, CustomerInfoBox, CustomerProfileLink, OrderDatesBox} from "../../assets/components/Order";


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
            { key: 'projectExistMode', value: filterOptionData?.projectExistMode},
        ];
        return getQueryVarsInStringFormat(params);
    }, [sort, order, page, limit, debouncedSearch, filterOptionData]);

    const [fetchOrders, isLoading, error ] = useFetching(async () => {
        const { data } = await OrderService.getOrders(urlParamsStr);
        const total = getPageCount(data.total, limit);

        ViewService.markAsSeen('orders', data.data.map(order => order.id));

        setTotalPage(total);
        if(data.current_page > 1) {
            setOrders([...orders, ...data.data]);
        }
        else if(data.current_page === 1) {
            setOrders([...data.data]);
        }
        else {
            setOrders([]);
        }
    });

    const fetchStatuses = async () => {
        const { data }  = await OrderService.getOrderStatuses();
        setStatuses(data);
    }

    useEffect(() => {
        fetchStatuses();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [page, limit, sort, order, debouncedSearch, filterOptionData]);

    useObserver(lastElementRef,page < totalPage, isLoading, () => {
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

    const handleStatusChange =
        async (statusId: number,
               order: Order,
               oldStatusId: number,
               undoReason?: UndoOrderReason | null | undefined
        ) => {
        const status = statuses.find(s => s.id === statusId);
        if(status) {
            if(status.name === OrderStatusNameEnum.UNDO) {
                if(!undoReason) {
                    setUndoModalOpen(true);
                    setSelectedOrder(order)
                    return;
                }
            }
        }

        const { data } = await OrderService.updateOrder(order.id, {
            'order_status_id': oldStatusId,
            'new_order_status_id': statusId,
            'undoReason': undoReason ?? null
        });
        const newOrders = [ ...orders ];
        const findIndex = newOrders.findIndex(e => e.id === data.id);
        newOrders.splice(findIndex, 1, data);
        setOrders(newOrders);
    }

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [createEditModalState, setCreateEditModalState] = useState<ModalStandartState>({
        isOpen: false,
        mode: 'create',
    });
    const [undoModalOpen, setUndoModalOpen] = useState<boolean>(false);

    const handleCreateEditRow = async (orderId: number | null | undefined, values: any, mode: string) => {
        if(mode === 'create') {
            const { data } = await ProjectService.createProjectForOrder(values);
            const newOrders : Order[] = orders.map((order) => {
                if(order.id === data.order!.id)
                    return {...order, project: data, project_id: data.id };
                return order;
            });
            setOrders([...newOrders]);
        }
        else {
            const { data: updatedProject } = await ProjectService.updateProject(values.id, values);

            const newOrders = orders.map((e: Order) => {
                if(e.id === orderId) {
                    e.project = updatedProject;
                    return e;
                } else {
                    return e;
                }});
            setOrders(newOrders);
        }
        setSelectedOrder(null);
    };

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Orders" }]} />
            </Box>

            <div className='table-alt-1'>
                <Card className="card-box mb-4">
                    <div className="card-header" style={{
                        display: 'block',
                        padding: '15px 10px'
                    }}>
                        <div className="card-header--title">
                            <small>Tables</small>
                            <h3>Orders</h3>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignContent: 'center'}}
                        >
                            <SearchInput
                                sx={{p: 0}}>
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
                                    defaultValue='2'
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
                        <div className="table-responsive"
                             style={{ maxHeight: '70vh', overflow: 'auto' }}
                        >
                            <table
                                className="table table-striped table-hover text-nowrap mb-0">
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
                                        id={`${e.id}`}
                                        key={e.id}>
                                        <td>
                                            <FlexJustifyCenter className="d-flex align-items-center">
                                                <div>
                                                    <span className="font-weight-bold text-black">
                                                        {e.id}
                                                    </span>
                                                </div>
                                            </FlexJustifyCenter>
                                        </td>
                                        <td>
                                            <FlexJustifyCenter className="d-flex align-items-center">
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
                                            </FlexJustifyCenter>
                                        </td>
                                        <td className="text-center">
                                            <Box>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                    <Select
                                                        style={{
                                                            width: '200px',
                                                            border: `1px solid black`,
                                                            color: `${e.status.bgColor}`
                                                        }}
                                                        id="demo-select-status"
                                                        defaultValue={e.status_id}
                                                        value={e.status_id}
                                                        onChange={(event: any) => {
                                                            handleStatusChange(event.target.value, e, e.status_id)
                                                        }}>
                                                        {
                                                            statuses.map(status =>
                                                                <MenuItem
                                                                    key={status.id}
                                                                    value={status.id}
                                                                    style={{
                                                                        border: `1px solid ${status.bgColor
                                                                        ?? '#ffffff'} !important`
                                                                    }}>
                                                                    {status.name}
                                                                </MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <CustomerBoxWrapper>
                                                { e.customer_id ?
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="MuiAvatar-root MuiAvatar-circle"
                                                            style={{marginRight: '10px'}}>
                                                            <Avatar
                                                                alt="avatar"
                                                                src={`${API_URL_WITH_PUBLIC_STORAGE}/${e.customer?.user.avatar}`}
                                                                className="MuiAvatar-img"
                                                            />
                                                        </div>
                                                        <CustomerInfoBox>
                                                            <CustomerProfileLink
                                                               href="#/"
                                                               className="text-left font-weight-bold text-black"
                                                               title="...">
                                                                {e.customer!.user.full_name}
                                                            </CustomerProfileLink>
                                                            <div className="text-left text-black-50 d-block">
                                                                  {e.customer!.user.email}
                                                            </div>
                                                            <div className="text-left text-black-50 d-block">
                                                                {
                                                                    e.customer!.user.phones &&
                                                                    e.customer!.user.phones.length > 0 &&
                                                                    `${e.customer!.user.phones.map(p => p.phone_number)}`
                                                                }
                                                            </div>
                                                        </CustomerInfoBox>
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

                                            </CustomerBoxWrapper>
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
                                                        : 'no extra file'
                                                }
                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <OrderDatesBox className="h-auto py-0 px-3 badge d-flex">
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
                                            </OrderDatesBox>
                                        </td>

                                        <td className="text-center table-action-btn">
                                            <Box>
                                                <IconButton onClick={() => deleteOrder(e.id)}>
                                                    <Delete />
                                                </IconButton>
                                                {
                                                    e.project_id ?
                                                        <span>
                                                            <IconButton
                                                                onClick={() => {
                                                                    navigator(`/projects/${e.project_id}`)
                                                                }}
                                                            >
                                                                <Devices/>
                                                                <East/>
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => {
                                                                    setCreateEditModalState({isOpen: true, mode: 'update'})
                                                                    setSelectedOrder(e);
                                                                }}
                                                            >
                                                                Edit Project
                                                                <Edit/>
                                                            </IconButton>
                                                            </span>
                                                    :
                                                        <IconButton onClick={() => {
                                                            setCreateEditModalState({isOpen: true, mode: 'create'})
                                                            setSelectedOrder(e);
                                                        }}>
                                                            <Add />
                                                            Create Project
                                                        </IconButton>
                                                }
                                                <IconButton onClick={() => { navigator(`/orders/${e.id}`) }}>
                                                    <Info />
                                                </IconButton>
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
                            <div ref={lastElementRef}
                                style={{
                                    width: '100%',
                                    background: 'red',
                                }}>
                            </div>
                        </div>
                        { isLoading && <CircularProgress /> }
                    </CardContent>
                </Card>
            </div>

            {
                selectedOrder &&
                <CreateEditProjectModal
                    setOpen={() => {}}
                    onClose={() => setCreateEditModalState( { ...createEditModalState, isOpen: false })}
                    onSave={handleCreateEditRow}
                    open={createEditModalState.isOpen}
                    mode={createEditModalState.mode}
                    order={selectedOrder}
                />
            }
            {
                statuses && selectedOrder &&
                <UndoOrderModal
                    onClose={() => {
                        setUndoModalOpen(false);
                        setSelectedOrder(null);
                    }}
                    onSave={(reason) => {
                        const undoStatus = statuses.find(s => s.name === OrderStatusNameEnum.UNDO);
                        handleStatusChange(undoStatus!.id,
                            selectedOrder,
                            selectedOrder.status.id,
                            reason
                        )
                    }}
                    open={undoModalOpen}
                    setOpen={setUndoModalOpen}
                    order={selectedOrder}
                />
            }
        </Container>
    );
}

export default ProjectsListPage;