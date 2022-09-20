import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Box, Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
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
import {CloudDownload, Delete, FilterAlt, Search, Sort} from "@mui/icons-material";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount, getQueryVarsInStringFormat} from "../../utils/pages";
import  {getSortOrderOptionValue} from "./sortOptions";
import {ComponentMode, SortOrderOptionType} from "../../types/global";
import {defLimit, defPage} from "../../utils/constant";
import useDebounce from "../../hooks/useDebounce";
import JobApplicationFilter, {JobApplicationFilterData} from "./JobApplicationFilter";
import {JobApplication, JobApplicationStatus, Vacancy} from "../../types/employeement";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import {JobApplicationService} from "../../services/JobApplicationService";
import {VacancyService} from "../../services/VacancyService";
import defJobApplicationSortOrderData from "./sortOptions";
import AddEditVacancyModal from "../../components/modals/AddVacancyModal/AddEditVacancyModal";

export const SearchInput = styled("div")(({ theme }) => ({
    padding: "10px",
    width: '300px',
    display: 'flex',
}));


const VacanciesListPage = () => {

    const navigator = useNavigate();

    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const lastElementRef = useRef<any>();

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const [page, setPage] = useState<number>(defPage);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(defLimit);
    const [sort, setSort] = useState<string>( 'created_at');
    const [order, setOrder] = useState<string>('desc');

    const [filterOptionData, setFilterOptionData] = useState<JobApplicationFilterData | null>(null);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [selectedJobAplication, setSelectedJobAplication] = useState<JobApplication | null>(null);

    const [statuses, setStatuses] = useState<JobApplicationStatus[]>([]);
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    const fetchStatuses = async () => {
        const { data }  = await JobApplicationService.getJobApplicationStatuses();
        setStatuses(data);
    }
    const fetchVacancies = async () => {
        const { data }  = await VacancyService.getVacancies();
        setVacancies(data);
    }
    const urlParamsStr = useMemo<string>( () => {
        const params = [
            { key: 'page', value: page },
            { key: 'limit', value: limit },
            { key: 'sort', value: sort },
            { key: 'order', value: order },
            { key: 'search', value: search },

            { key: 'jobApplicationStatus', value: JSON.stringify(filterOptionData?.jobApplicationStatus) },
            { key: 'vacancies', value: JSON.stringify(filterOptionData?.vacancies) },
            { key: 'createdAtRange', value: JSON.stringify(filterOptionData?.createdAtRange) },
        ];
        return getQueryVarsInStringFormat(params);
    }, [sort, order, page, limit, debouncedSearch, filterOptionData]);

    const [fetchJobApplication, isLoading, error ] = useFetching(async () => {
        const { data } = await JobApplicationService.getJobApplications(urlParamsStr);
        const total = getPageCount(data.total, limit);

        setTotalPage(total);
        if(page > 1) {
            setJobApplications([...jobApplications, ...data.data]);
        }
        else if(page === 1) {
            setJobApplications([...data.data]);
        }
        else {
            setJobApplications([]);
        }
    });

    useEffect(() => {
        fetchStatuses();
        fetchVacancies();
    }, [])

    useEffect(() => {
        fetchJobApplication();
    }, [page, limit, sort, order, debouncedSearch, filterOptionData]);

    useObserver(lastElementRef,page < totalPage, isLoading, () => {
        console.log('-' , page, totalPage, '-');
        setPage(page + 1);
    });

    const onSortOrderHandleChange = (event: any) => {
        const value = event.target.value;
        const option = defJobApplicationSortOrderData.find((e: SortOrderOptionType) => e.id == value);
        if(option) {
            setSort(option.value);
            setOrder(option.order);
            setPage(defPage);
            setLimit(defLimit);
        }

        console.log('sort', option)
    }


    const deleteJobApplication = (jobApplicationId: number) => {
        const deleteIndex = jobApplications.findIndex((e: JobApplication) => e.id === jobApplicationId);
        jobApplications.splice(deleteIndex, 1);
        setJobApplications([...jobApplications]);
        JobApplicationService.deleteJobApplication(jobApplicationId);
    }

    const handlerFilterChange = useCallback((data: JobApplicationFilterData) => {
        setFilterOptionData({...data});
        setPage(defPage);
        setLimit(defLimit);
    }, []);

    const handleStatusChange =
        async (statusId: number,
               jobApplication: JobApplication,
        ) => {
            // const status = statuses.find(s => s.id === statusId);
            // if(status) {
            //     if(status.name === OrderStatusNameEnum.UNDO) {
            //         if(!undoReason) {
            //
            //             setUndoModalOpen(true);
            //             setSelectedOrder(order)
            //             return;
            //         }
            //         // const { data } = await OrderService.undoOrder(order.id, undoReason);
            //         // setUndoModalOpen(false);
            //         // console.log(data);
            //     }
            // }
            //
            // const { data } = await OrderService.updateOrder(order.id, {
            //     'order_status_id': oldStatusId,
            //     'new_order_status_id': statusId,
            //     'undoReason': undoReason ?? null
            // });
            // const newOrders = [ ...orders ];
            // const findIndex = newOrders.findIndex(e => e.id === data.id);
            // newOrders.splice(findIndex, 1, data);
            // setOrders(newOrders);
        }


    const [addVacancyModalOpen, setAddVacancyModalOpen] = useState<boolean>(false);

    const onVacancyAddEditChange = async (newVacancy: Vacancy, mode: ComponentMode)  => {
        if(mode === 'create') {
            const { data } = await VacancyService.createVacancy(newVacancy);
        } else if(mode === 'update') {
            const { data } = await VacancyService.updateVacancy(newVacancy.id, newVacancy);
        }
    }

    return (
        <Container>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "JobApplications" }]} />
            </Box>

            <div className='table-alt-1'>
                <Card className="card-box mb-4">
                    <div className="card-header" style={{display: 'block'}}>
                        <div className="card-header--title">
                            <small>Tables</small>
                            <h3>Job Applications</h3>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                            <div style={{display: 'flex'}}>
                                <SearchInput style={{padding: 0, width: '300px'}}>
                                    <TextField
                                        id="outlined-search"
                                        label="Search By Name Or Email"
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

                                <Button
                                    variant='outlined'
                                    onClick={() => setAddVacancyModalOpen(true)}
                                    style={{width: '100xp', maxHeight: '40px', padding: '0 15px' }}
                                >
                                    Add Vacancy
                                </Button>
                            </div>

                            <Box
                                className="card-header--actions"
                                style={{
                                    display: 'flex',
                                    height: '40px',
                                }}>
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
                                        defJobApplicationSortOrderData.map((e: SortOrderOptionType) =>
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
                                                    <Sort />

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
                       <JobApplicationFilter
                           isOpen={isFilterOpen}
                           onFilterChange={handlerFilterChange}
                       />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover text-nowrap mb-0">
                                <thead className="thead-light">
                                <tr>
                                    <th style={{ width: '40%' }}>Name/Email</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Vacancy</th>
                                    <th className="text-center">Resume File</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                { jobApplications.map((e: JobApplication) =>
                                    <tr key={e.id}>
                                        <td>
                                            <div
                                                className="d-flex align-items-center"
                                                 style={{
                                                     display: 'flex',
                                                     justifyContent: 'center'
                                                 }}>
                                                <div>
                                                    <span className="font-weight-bold text-black">
                                                        {e.name}
                                                    </span>
                                                    <span className="text-black-50 d-block">
                                                        {e.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Box>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                    <Select
                                                        style={{
                                                            width: '200px',
                                                            border: `1px solid black`,
                                                            color: `${e.job_application_status.bgColor}`
                                                        }}
                                                        id="demo-select-status"
                                                        defaultValue={e.job_application_status_id}
                                                        value={e.job_application_status_id}
                                                        onChange={(event: any) => {
                                                            handleStatusChange(event.target.value, e)
                                                        }}
                                                    >
                                                        {
                                                            statuses.map(status =>
                                                                <MenuItem
                                                                    key={status.id}
                                                                    value={status.id}
                                                                    style={{
                                                                        border: `1px solid ${status.bgColor ?? '#ffffff'} !important`
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
                                            <Box
                                                className="h-auto py-0 px-3 badge badge-warning">
                                                { e.vacancy.title }
                                            </Box>
                                        </td>
                                        <td className="text-center">
                                            <Box>
                                                <Box className="py-0 px-3 file-download">
                                                    {
                                                        <IconButton onClick={() => {
                                                            // eslint-disable-next-line no-restricted-globals
                                                            location.href = `${API_URL_WITH_PUBLIC_STORAGE}/${e.resume_path}`;
                                                        }}>
                                                            <CloudDownload/>
                                                        </IconButton>
                                                    }
                                                </Box>
                                            </Box>
                                        </td>

                                        <td className="text-center table-action-btn">
                                            <Box>
                                                <IconButton onClick={() => deleteJobApplication(e.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </td>
                                    </tr>
                                )}

                                </tbody>
                            </table>
                            {
                                !isLoading && jobApplications.length === 0 &&
                                    <h3>No data</h3>
                            }

                            <div
                                ref={lastElementRef}
                                style={{
                                    width: '100%',
                                    height: 20,
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


            <AddEditVacancyModal
                open={addVacancyModalOpen}
                setOpen={setAddVacancyModalOpen}
                onClose={() => setAddVacancyModalOpen(false)}
                onSave={onVacancyAddEditChange}
            />


        </Container>
    );
}


export default VacanciesListPage;