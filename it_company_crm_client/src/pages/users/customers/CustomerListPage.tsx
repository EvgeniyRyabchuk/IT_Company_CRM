import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Container} from "../../../assets/components/breadcrumb";
import MaterialReactTable from 'material-react-table';
import MRT_Row, {MRT_ColumnDef} from 'material-react-table';
import {Box, Button, Fab, IconButton, ListItemIcon, MenuItem, Typography} from '@mui/material';
import {
    AccountCircle,
    Delete,
    Edit,
    FileDownload,
    GroupAdd,
    PictureAsPdf,
    PictureAsPdfTwoTone,
    Send
} from '@mui/icons-material';
import {Customer, Employee, Phone} from "../../../types/user";
import {API_URL, API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import moment from "moment";
import FavoriteIcon from '@mui/icons-material/Favorite';

import type {ColumnFiltersState, PaginationState, SortingState,} from '@tanstack/react-table';
import {RowSelectionState} from '@tanstack/react-table';
import {getQueryVarsInStringFormat} from "../../../utils/pages";
import {ChatService} from "../../../services/ChatService";

import {useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {CustomerService} from "../../../services/CustomerService";
import JsPDF from 'jspdf';

const CustomerListPage = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');

    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowCount, setRowCount] = useState(0);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer>();


    const handleCreateEditRow = async (values: Customer, mode: string) => {
        console.log('submit', values);
        if(mode === 'create') {
            const { data } = await CustomerService.createCustomer(values);
            fetchCustomers();
        }
        else {
            const { data } = await CustomerService.updateCustomer(values);
            // update employee list
            const newCustomers = customers.map((e: Customer) => e.id === data.id ? data : e);
            setCustomers(newCustomers);
        }
    };

    const fetchCustomers = async () => {
        try {
            // hooks that returns query string for url
            const queryParamString = getQueryVarsInStringFormat([
                {key: 'perPage', value: pagination.pageSize},
                {key: 'filters', value: JSON.stringify(columnFilters ?? [])},
                {key: 'search', value: globalFilter ?? ''},
                {key: 'sort', value: JSON.stringify(sorting ?? [])},
                {key: 'page', value: pagination.pageIndex + 1}
            ])
            setIsLoading(true);
            const { data } = await CustomerService.getCustomer(queryParamString);

            setCustomers(data.data);
            setRowCount(data.total);
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
    };

    const onFavoriteClick = (customerId: number, oldValue: boolean) => {
        CustomerService.changeFavorite(customerId, !oldValue)
        const customerForUpdate = customers.find((e: Customer) => e.id === customerId);
        if(!customerForUpdate) return;
        customerForUpdate!.vip = !oldValue;
        const newCustomers = customers.
            map((e: Customer) => e.id === customerId ? customerForUpdate : e);

        setCustomers(newCustomers);
    }

    useEffect(() => {
        fetchCustomers();
    }, [ columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,])

    const columns = useMemo<MRT_ColumnDef<Customer>[]>(
        () => [
            {
                id: 'user.id',
                header: '#(id)',
                size: 100,
                accessorKey: 'user.id',
            },
            {
                //id is still required when using accessorFn instead of accessorKey
                id: 'user.full_name',
                header: 'Name',
                size: 250,
                accessorKey: 'user.full_name',
                Cell: ({ cell, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt="avatar"
                            width='40px'
                            height='40px'
                            src={`${API_URL_WITH_PUBLIC_STORAGE}/${row.original.user.avatar}`}
                            loading="lazy"
                            style={{ borderRadius: '50%' }}
                        />
                        <div style={{display: 'flex', flexDirection: 'column', margin: '5px 0px'}}>
                            <Typography>{cell.getValue<string>()}</Typography>
                            <Typography>{row.original.user.email}</Typography>
                        </div>

                    </Box>
                ),
            },
            {
                id: 'user.phones',
                header: 'Phone Number',
                size: 250,
                accessorKey: 'user.phones',
                enableSorting: false,
                Cell: ({ cell, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <ul>
                            {row.original.user.phones.map((e: Phone) =>
                              <li key={e.id}>{e.phone_number}</li>
                            )}
                        </ul>
                    </Box>
                ),
            },
            {
                id: 'order_count',
                header: 'Orders (all/finished)',
                size: 200,
                accessorKey: 'order_count',
                Cell: ({ cell, row }) => (
                    <Box
                        sx={(theme) => ({
                            backgroundColor:
                                cell.getValue<number>() < 50_000
                                    ? theme.palette.error.dark
                                    : cell.getValue<number>() >= 50_000 &&
                                    cell.getValue<number>() < 75_000
                                        ? theme.palette.warning.dark
                                        : theme.palette.success.dark,
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {row.original.order_count} / {row.original.finished_order_count}
                    </Box>
                ),
            },
            {

                id: 'user.created_at',
                header: 'Account Created At',
                muiTableHeadCellFilterTextFieldProps: {
                    type: 'date',
                },
                sortingFn: 'datetime',
                accessorKey: 'user.created_at',
                Cell: ({ cell, row }) => moment(row.original.user.created_at).format('DD/MM/YYYY'), //render Date as a string
                Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            },
            {

                id: 'vip',
                size: 80,
                header: 'Favorite',
                accessorKey: 'vip',
                enableColumnFilter: false,
                Cell: ({ cell, row }) =>
                    <Fab
                        aria-label="like"
                        style={{width: '40px', height: '40px'}}
                    >
                        <FavoriteIcon
                            style={{color: row.original.vip ? 'red' : 'black'}}
                            onClick={() =>
                                onFavoriteClick(row.original.id, row.original.vip ?? false)
                            }
                        />
                    </Fab>,
                Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            },
        ], [customers]);


    const tableRef = useRef<any>(null);

    return (
        <Container ref={tableRef}>

            <h2>All customers</h2>

            <MaterialReactTable

                columns={columns}
                data={customers}
                enableColumnFilterModes
                enableColumnResizing

                enableRowActions
                enableRowSelection

                getRowId={(row: any) => row.id} //give each row a more useful id
                onRowSelectionChange={setRowSelection} //connect internal row selection state to your own

                positionToolbarAlertBanner="bottom"
                positionActionsColumn='last'
                positionExpandColumn='last'

                manualFiltering
                manualPagination
                manualSorting

                muiToolbarAlertBannerProps={
                    isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                        }
                        : undefined
                }
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                state={{
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination,
                    showAlertBanner: isError,
                    showProgressBars: isRefetching,
                    sorting,
                    rowSelection
                }}



                renderDetailPanel={({ row }) => (
                    <Box

                    >

                        {row.original && row.original.user &&
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: '20px',
                                flexWrap: 'wrap'
                            }}
                        >

                            <img
                                alt="avatar"
                                height={200}
                                src={`${API_URL_WITH_PUBLIC_STORAGE}/${row.original.user.avatar}`}
                                loading="lazy"
                                style={{borderRadius: '50%'}}
                            />

                            {row.original.user.tags?.map((tag: { id: number; name: string; }) =>
                                <Box
                                    key={tag.id}
                                    sx={(theme) => ({
                                        backgroundColor: theme.palette.success.dark,
                                        borderRadius: '0.25rem',
                                        color: '#fff',
                                        maxWidth: '9ch',
                                        p: '0.25rem',
                                    })}
                                >
                                    {tag.name}
                                </Box>
                            )}
                            </div>
                        }
                    </Box>
                )}
                renderRowActionMenuItems={({ closeMenu, row }) => [
                    <MenuItem
                        key={0}
                        onClick={() => {
                            // View profile logic...
                            closeMenu();
                        }}
                        sx={{ m: 0 }}
                    >
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        View Profile
                    </MenuItem>,
                    <MenuItem
                        key={1}
                        onClick={ async () => {

                            const toUser = row.original;

                            const { data } = await ChatService.createChat(user!.id, toUser.id);
                            navigate(`/chats/${toUser.id}`);

                            closeMenu();
                        }}
                        sx={{ m: 0 }}
                    >
                        <ListItemIcon>
                            <Send />
                        </ListItemIcon>
                        Chat
                    </MenuItem>,
                    <MenuItem
                        key={2}
                        onClick={() => {
                            console.log('selected employee', row.original);
                            setSelectedCustomer({ ...row.original });
                            // setCreateEditModalState({ isOpen: true, mode: 'update'})
                            closeMenu();
                        }}
                        sx={{ m: 0 }}
                    >
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        Edit
                    </MenuItem>,
                    <MenuItem
                        key={3}
                        onClick={async () => {
                            const customerIndex = customers.findIndex(e => e.id === row.original.id);
                            await CustomerService.deleteCustomer(row.original.id);
                            customers.splice(customerIndex, 1);
                            setCustomers([...customers]);
                            closeMenu();
                        }}
                        sx={{ m: 0 }}
                    >
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                        Delete
                    </MenuItem>,
                ]}
                renderTopToolbarCustomActions={({ table }) => {

                    const handleAllExportRows = async () => {
                        const ids = Object.keys(rowSelection);
                        // const param = ids ? `?${JSON.stringify(ids)}` : '';
                        // eslint-disable-next-line no-restricted-globals
                        location.href = `${API_URL}/excel/customers`;

                    };
                    const handleExportSelectedRows = async () => {
                        const ids = Object.keys(rowSelection);
                        console.log(Object.keys(rowSelection));
                        const param = ids ? `?ids=${JSON.stringify(ids)}` : '';

                        console.log( `${API_URL}/excel/customers${param}`);
                        // eslint-disable-next-line no-restricted-globals
                        location.href = `${API_URL}/excel/customers${param}`;
                    };
                    // @ts-ignore
                    const handleExportPageRows = async (rows: MRT_Row<Employee>[]) => {
                        const ids = rows.map(e => e.id);
                        const param = ids ? `?ids=${JSON.stringify(ids)}` : '';
                        // eslint-disable-next-line no-restricted-globals
                        location.href = `${API_URL}/excel/customers${param}`;
                    }
                    // @ts-ignore
                    const handleExportPageRowsAsPdf = async (rows: MRT_Row<Employee>[]) => {
                        if(tableRef.current !== null) {
                            const report = new JsPDF('landscape','px','a4');
                            report.html(tableRef.current).then(() => {
                                report.save('report.pdf');
                            });
                        }

                    }

                    return (

                        <Box
                            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                        >
                            <Button
                                color="primary"
                                onClick={handleAllExportRows}
                                startIcon={<FileDownload />}
                                variant="contained"
                            >
                                Export All Data
                            </Button>

                            <Button
                                onClick={handleExportSelectedRows}
                                startIcon={<FileDownload />}
                                variant="contained"
                                disabled={table.getSelectedRowModel().flatRows.length === 0}
                            >
                                Export Selected rows
                            </Button>


                            <Button
                                disabled={table.getRowModel().rows.length === 0}
                                onClick={() => handleExportPageRows(table.getRowModel().rows)}
                                startIcon={<FileDownload />}
                                variant="contained"
                            >
                                Export Page Rows
                            </Button>


                            <Button
                                disabled={table.getRowModel().rows.length === 0}
                                onClick={() => handleExportPageRowsAsPdf(table.getRowModel().rows)}
                                startIcon={<PictureAsPdf />}
                                variant="contained"
                            >
                                Export Page As PDF
                            </Button>


                        </Box>

                    );
                }}


            />

            {/*<CreateEditEmployeeModal*/}
            {/*    onClose={() => setCreateEditModalState( { ...createEditModalState, isOpen: false })}*/}
            {/*    onSubmit={handleCreateEditRow}*/}
            {/*    open={createEditModalState.isOpen}*/}
            {/*    mode={createEditModalState.mode} */}
            {/*    employee={selectedEmployee}*/}
            {/*/>*/}

        </Container>
    );
};

export default CustomerListPage;