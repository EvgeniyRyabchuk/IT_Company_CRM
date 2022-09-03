import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    styled,
    TextField
} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";
import '../../assets/components/AltTable/style.scss';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {Add, Delete, East, Edit, FilterAlt, Search, Sort} from "@mui/icons-material";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount, getQueryVarsInStringFormat} from "../../utils/pages";
import defOrderSortOrderData, {getSortOrderOptionValue} from "./sortOptions";
import {SortOrderOptionType} from "../../types/global";
import {defLimit, defPage} from "../../utils/constant";
import ProjectFilter, {OrderFilterData} from "./OrderFilter";
import useDebounce from "../../hooks/useDebounce";
import {Order} from "../../types/order";
import {OrderService} from "../../services/OrderService";

export const SearchInput = styled("div")(({ theme }) => ({
    padding: "10px",
    width: '400px',
    display: 'flex',
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


    const urlParamsStr = useMemo<string>( () => {
        const params = [
            { key: 'page', value: page },
            { key: 'limit', value: limit },
            { key: 'sort', value: sort },
            { key: 'order', value: order },
            { key: 'search', value: search },

            // { key: 'projectTypes', value: JSON.stringify(filterOptionData?.projectTypes) },
            // { key: 'budgetRange', value: JSON.stringify(filterOptionData?.budgetRange) },
            // { key: 'deadlineRange', value: JSON.stringify(filterOptionData?.deadlineRange) },
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
        fetchOrders();
    }, [page, limit, sort, order, debouncedSearch, filterOptionData]);

    useObserver(lastElementRef,page < totalPage, isLoading, () => {
        console.log('-' , page, totalPage, '-');
        setPage(page + 1);
    });

    const onSortOrderHandleChange = (event: any) => {
        const value = event.target.value;
        const option = defOrderSortOrderData.find((e: SortOrderOptionType) => e.id == value);
        if(option) {
            setSort(option.value);
            setOrder(option.order);
            setPage(defPage);
            setLimit(defLimit);
        }
        console.log('sort', option)
    }

    // const addEmployeeToProjectHanle = async (employee: Employee) => {
    //     console.log('===============================');
    //     console.log(employee.id, selectedOrder!.id);
    //     if(selectedOrder)
    //     {
    //         const { data } = await ProjectService.addEmployeeToProject(employee.id, selectedOrder.id);
    //     }
    // }

    const deleteOrder = (orderId: number) => {
        const deleteIndex = orders.findIndex((e: Order) => e.id === orderId);
        orders.splice(deleteIndex, 1);
        setOrders([...orders]);
        OrderService.deleteOrder(orderId);
    }

    const handlerFilterChange = useCallback((data: OrderFilterData) => {
        setFilterOptionData({...data});
    }, []);

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
                                        minWidth: '200px'
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
                                                    title="View details">
                                                    <Sort
                                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                    />

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
                       <ProjectFilter
                           isOpen={isFilterOpen}
                           onFilterChange={handlerFilterChange}
                       />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover text-nowrap mb-0">
                                <thead className="thead-light">
                                <tr>
                                    <th style={{ width: '40%' }}>#id</th>
                                    <th className="text-center">Project</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Customer Contact Info</th>
                                    <th className="text-center">Extra File</th>
                                    <th className="text-center">Order Created At / Project Deadline</th>
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
                                                { e.order_status.name }
                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <Box
                                                className="h-auto py-0 px-3 badge badge-warning"
                                            >
                                                { e.customer_id ?
                                                    <div>
                                                         <span className="font-weight-bold text-black">
                                                            {e.customer!.user.full_name}
                                                        </span>
                                                        <span className="text-black-50 d-block">
                                                           {e.customer!.user.email}
                                                        </span>
                                                    </div>
                                                    :
                                                    <div>
                                                         <span className="font-weight-bold text-black">
                                                            {e.order_contact!.name}
                                                        </span>
                                                        <span className="text-black-50 d-block">
                                                           {e.order_contact!.phone}
                                                        </span>
                                                    </div>
                                                }

                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <Box
                                                className="h-auto py-0 px-3 badge badge-warning"
                                            >
                                                {
                                                    e.extra_file ?
                                                    'Extra File'
                                                        :
                                                    'no extra file'
                                                }

                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <div
                                                className="h-auto py-0 px-3 badge badge-danger"
                                                 style={{fontSize: '13px'}}>
                                                    {
                                                        moment(e.created_at).format('DD/MM/YYYY')
                                                    }
                                                    /
                                                    {
                                                        e.project_id && e.project?.deadline ?
                                                            moment(e.project.deadline).format('DD/MM/YYYY')
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
                                                <IconButton
                                                    // onClick={() => {
                                                    //     setSelectedOrder(e);
                                                    //     setOpenEmployeeAddModal(true);
                                                    // }}
                                                >
                                                    <div>
                                                        <Add />
                                                       <small>
                                                           Add to project
                                                       </small>
                                                    </div>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        navigator(`/projects/${e.id}`)
                                                    }}
                                                >
                                                    <East />
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