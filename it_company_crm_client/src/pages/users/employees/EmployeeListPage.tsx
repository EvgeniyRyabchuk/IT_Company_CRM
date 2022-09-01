import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Container} from "../../../assets/components/breadcrumb";
import MaterialReactTable from 'material-react-table';
import MRT_Row, {MRT_ColumnDef} from 'material-react-table';
import {Box, Button, ListItemIcon, MenuItem, Typography} from '@mui/material';
import {AccountCircle, Delete, Edit, FileDownload, GroupAdd, Send} from '@mui/icons-material';
import {Employee, Role, Skill} from "../../../types/user";
import {EmployeeService} from "../../../services/EmployeeService";
import {API_URL, API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import moment from "moment";

import type {ColumnFiltersState, PaginationState, SortingState,} from '@tanstack/react-table';
import {RowSelectionState} from '@tanstack/react-table';
import {getQueryVarsInStringFormat} from "../../../utils/pages";
import CreateEditEmployeeModal from "../../../components/modals/CreateEditEmployeeModal/CreateEditEmployeeModal";
import {ChatService} from "../../../services/ChatService";

import {useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const EmployeeListPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);

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

    const [createEditModalState, setCreateEditModalState] = useState({
            isOpen: false,
            mode: 'create',
    });
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

    const handleCreateEditRow = async (values: Employee, mode: string) => {
        console.log('submit', values);
        if(mode === 'create') {
            const { data } = await EmployeeService.createEmployee(values);
            fetchEmployees();
        }
        else {
            const { data } = await EmployeeService.updateEmployee(values);
            // update employee list
            const newEmployees = employees.map((e: Employee) => e.id === data.id ? data : e);
            setEmployees(newEmployees);
        }
    };

    console.log(isLoading);

    const fetchEmployees = async () => {
        try {
            if (!employees.length || employees.length === 0) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }
            // hooks that returns query string for url
            const queryParamString = getQueryVarsInStringFormat([
                {key: 'perPage', value: pagination.pageSize},
                {key: 'filters', value: JSON.stringify(columnFilters ?? [])},
                {key: 'search', value: globalFilter ?? ''},
                {key: 'sort', value: JSON.stringify(sorting ?? [])},
                {key: 'page', value: pagination.pageIndex + 1}
            ])

            const { data } = await EmployeeService.getEmployees(queryParamString);

            setEmployees(data.data);
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

    useEffect(() => {
        //
        fetchEmployees();
    }, [ columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,])

    const columns = useMemo<MRT_ColumnDef<Employee>[]>(
        () => [
            {
                id: 'id',
                header: '#',
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
                id: 'project_count',
                header: 'Members in projects',
                size: 200,
                accessorKey: 'project_count',
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
                        {row.original.project_count}
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
            ], []);



    const handleDeleteRow = useCallback(
        (row: any) => {
            if (
                // eslint-disable-next-line no-restricted-globals
                !confirm(`Are you sure you want to delete ${row.original.user.full_name}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            employees.splice(row.index, 1);
            setEmployees([...employees]);
        },
        [employees],
    );

    return (
        <Container>

            <h2>All employees</h2>

            <MaterialReactTable
                columns={columns}
                data={employees}
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
                        { row.original && row.original.user &&
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    alt="avatar"
                                    height={200}
                                    src={`${API_URL_WITH_PUBLIC_STORAGE}/${row.original.user.avatar}`}
                                    loading="lazy"
                                    style={{borderRadius: '50%'}}
                                />
                                    <Box sx={{textAlign: 'center'}}>
                                    <Typography variant="h2">
                                        Position: {row.original.position.name}
                                    </Typography>
                                    <Typography variant="h2">
                                        Level: {row.original.level.name}
                                    </Typography>
                                    </Box>

                                {row.original.skills?.map((skill: Skill) =>
                                    <Box
                                        key={skill.id}
                                        sx={(theme) => ({
                                        backgroundColor: theme.palette.success.dark,
                                        borderRadius: '0.25rem',
                                        color: '#fff',
                                        maxWidth: '9ch',
                                        p: '0.25rem',
                                    })}>
                                        {skill.name}
                                    </Box>
                                )}
                                {
                                    row.original.user.roles.map((role: Role) =>
                                        <Box
                                            key={role.id}
                                            sx={(theme) => ({
                                                backgroundColor: theme.palette.secondary.dark,
                                                borderRadius: '0.25rem',
                                                color: '#fff',
                                                maxWidth: '9ch',
                                                p: '0.25rem',
                                            })}>
                                            {role.name}
                                        </Box>
                                    )
                                }
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
                            setSelectedEmployee({ ...row.original });
                            setCreateEditModalState({ isOpen: true, mode: 'update'})
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
                            const employeeIndex = employees.findIndex(e => e.id === row.original.id);
                            await EmployeeService.deleteEmployee(row.original.id);
                            employees.splice(employeeIndex, 1);
                            setEmployees([...employees]);
                            closeMenu();
                        }}
                        sx={{ m: 0 }}
                    >
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                        Delete
                    </MenuItem>,
                    <MenuItem
                        key={4}
                        onClick={() => {
                            closeMenu();
                        }}
                        sx={{ m: 0 }}
                    >
                        <ListItemIcon>
                            <GroupAdd />
                        </ListItemIcon>
                        Add to projects
                    </MenuItem>,
                ]}
                renderTopToolbarCustomActions={({ table }) => {

                    const handleAllExportRows = async () => {
                        const ids = Object.keys(rowSelection);
                        // const param = ids ? `?${JSON.stringify(ids)}` : '';
                        // eslint-disable-next-line no-restricted-globals
                        location.href = `${API_URL}/excel/employees`;

                    };
                    const handleExportSelectedRows = async () => {
                        const ids = Object.keys(rowSelection);
                        console.log(Object.keys(rowSelection));
                        const param = ids ? `?ids=${JSON.stringify(ids)}` : '';

                        console.log( `${API_URL}/excel/employees${param}`);
                        // eslint-disable-next-line no-restricted-globals
                        location.href = `${API_URL}/excel/employees${param}`;
                    };
                    // @ts-ignore
                    const handleExportPageRows = async (rows: MRT_Row<Employee>[]) => {
                        const ids = rows.map(e => e.id);
                        const param = ids ? `?ids=${JSON.stringify(ids)}` : '';
                        // eslint-disable-next-line no-restricted-globals
                        location.href = `${API_URL}/excel/employees${param}`;
                    }

                    return (

                        <Box
                            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                        >
                            <Button
                                color="secondary"
                                onClick={() => setCreateEditModalState({ isOpen: true, mode: 'create'})}
                                variant="contained"
                            >
                                Create New Employee Account
                            </Button>

                            <Button
                                color="primary"
                                onClick={handleAllExportRows}
                                startIcon={<FileDownload />}
                                variant="contained"
                            >
                                Export All Data
                            </Button>

                            <Button
                                disabled={table.getSelectedRowModel().flatRows.length === 0}
                                onClick={handleExportSelectedRows}
                                startIcon={<FileDownload />}
                                variant="contained"
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

                        </Box>

                    );
                }}


            />

            <CreateEditEmployeeModal
                onClose={() => setCreateEditModalState( { ...createEditModalState, isOpen: false })}
                onSubmit={handleCreateEditRow}
                open={createEditModalState.isOpen}
                mode={createEditModalState.mode}
                employee={selectedEmployee}
            />

        </Container>
    );
};

export default EmployeeListPage;

