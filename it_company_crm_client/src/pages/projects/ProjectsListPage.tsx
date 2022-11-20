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
import {Project} from "../../types/project";
import {ProjectService} from "../../services/ProjectService";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {Add, Delete, East, Edit, FilterAlt, Search, Sort} from "@mui/icons-material";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount, getQueryVarsInStringFormat} from "../../utils/pages";
import defProjectSortOrderData, {getSortOrderOptionValue} from "./sortOptions";
import {SortOrderOptionType} from "../../types/global";
import {defLimit, defPage} from "../../utils/constant";
import AddEmployeeToProjectModal from "../../components/modals/AddEmployeeToProjectModal/AddEmployeeToProjectModal";
import {Employee} from "../../types/user";
import ProjectFilter, {ProjectFilterData} from "./ProjectFilter";
import useDebounce from "../../hooks/useDebounce";
import {ViewService} from "../../services/ViewService";
import {SearchInput} from "../../assets/components/Shared";


const ProjectsListPage = () => {

    const navigator = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);
    const lastElementRef = useRef<any>();

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const [page, setPage] = useState<number>(defPage);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(defLimit);
    const [sort, setSort] = useState<string>( 'created_at');
    const [order, setOrder] = useState<string>('desc');

    const [filterOptionData, setFilterOptionData] = useState<ProjectFilterData | null>(null);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [openEmployeeAddMoal, setOpenEmployeeAddModal] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const urlParamsStr = useMemo<string>( () => {
        const params = [
            { key: 'page', value: page },
            { key: 'limit', value: limit },
            { key: 'sort', value: sort },
            { key: 'order', value: order },
            { key: 'search', value: debouncedSearch },

            { key: 'projectTypes', value: JSON.stringify(filterOptionData?.projectTypes) },
            { key: 'budgetRange', value: JSON.stringify(filterOptionData?.budgetRange) },
            { key: 'deadlineRange', value: JSON.stringify(filterOptionData?.deadlineRange) },
        ];
        return getQueryVarsInStringFormat(params);
    }, [sort, order, page, limit, debouncedSearch, filterOptionData]);

    const [fetchProjects, isLoading, error ] = useFetching(async () => {
        const { data } = await ProjectService.getProjects(urlParamsStr);
        const total = getPageCount(data.total, limit);

        ViewService.markAsSeen('projects', data.data.map(e => e.id));

        setTotalPage(total);
        if(page > 1) {
            setProjects([...projects, ...data.data]);
        }
        else if(page === 1) {
            setProjects([...data.data]);
        }
        else {
            setProjects([]);
        }
    });

    useEffect(() => {
        fetchProjects();
    }, [page, limit, sort, order, debouncedSearch, filterOptionData]);

    useObserver(lastElementRef,page < totalPage, isLoading, () => {
        setPage(page + 1);
    });

    const onSortOrderHandleChange = (event: any) => {
        const value = event.target.value;
        const option = defProjectSortOrderData.find((e: SortOrderOptionType) => e.id == value);
        if(option) {
            setSort(option.value);
            setOrder(option.order);
            setPage(defPage);
            setLimit(defLimit);
        }
    }

    const addEmployeeToProjectHandle = async (employee: Employee) => {
        if(selectedProject) {
            const { data } =
                await ProjectService.addEmployeeToProject(employee.id, selectedProject.id);
        }
    }

    const deleteProject = (projectId: number) => {
        const deleteIndex = projects.findIndex((e: Project) => e.id === projectId);
        projects.splice(deleteIndex, 1);
        setProjects([...projects]);
        ProjectService.deleteProject(projectId);
    }

    const handlerFilterChange = useCallback((data: ProjectFilterData) => {
        setFilterOptionData({...data});
        setPage(defPage);
        setLimit(defLimit);
    }, []);


    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Projects" }]} />
            </Box>

            <div className='table-alt-1'>
                <Card className="card-box mb-4">
                    <div className="card-header" style={{display: 'block'}}>
                        <div className="card-header--title">
                            <small>Tables</small>
                            <h3>Projects</h3>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {/*
                            // @ts-ignore */}
                            <SearchInput width='300px'>
                                <TextField
                                    id="outlined-search"
                                    label="Search Project By Name"
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
                                        defProjectSortOrderData.map((e: SortOrderOptionType) =>
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
                       <ProjectFilter
                           isOpen={isFilterOpen}
                           onFilterChange={handlerFilterChange}
                       />
                        <div className="table-responsive">
                            <table className="table table-striped table-hover text-nowrap mb-0">
                                <thead className="thead-light">
                                <tr>
                                    <th style={{ width: '40%' }}>Name</th>
                                    <th className="text-center">Deadline</th>
                                    <th className="text-center">Budget/Paid</th>
                                    <th className="text-center">Member Count</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                { projects.map((e: Project) =>
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
                                                        {e.project_type.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div
                                                className="h-auto py-0 px-3 badge badge-danger"
                                                 style={{fontSize: '13px'}}>
                                                    {
                                                        moment(e.deadline).format('DD/MM/YYYY')
                                                    }
                                            </div>
                                        </td>
                                        <td
                                            className="text-center">
                                            <Box>
                                                { e.budget } / {e.paid} $
                                            </Box>
                                        </td>
                                        <td
                                            className="text-center">
                                            <Box
                                                className="h-auto py-0 px-3 badge badge-warning"
                                            >
                                                { e.member_count }
                                            </Box>
                                        </td>

                                        <td className="text-center table-action-btn">
                                            <Box>
                                                <IconButton>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => deleteProject(e.id)}>
                                                    <Delete />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        setSelectedProject(e);
                                                        setOpenEmployeeAddModal(true);
                                                    }}
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
                                !isLoading && projects.length === 0 &&
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
                        { isLoading && <CircularProgress /> }
                    </CardContent>
                </Card>
            </div>

            <AddEmployeeToProjectModal
                open={openEmployeeAddMoal}
                onClose={() => setOpenEmployeeAddModal(false)}
                onSave={addEmployeeToProjectHandle}
                setOpen={setOpenEmployeeAddModal}
                project={selectedProject}
            />
        </Container>
    );
}


export default ProjectsListPage;