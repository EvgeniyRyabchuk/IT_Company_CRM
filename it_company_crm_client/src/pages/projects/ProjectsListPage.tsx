import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Box, Card, CardContent, CircularProgress, IconButton, MenuItem, Select} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";
import './style.scss';
import {Project} from "../../types/project";
import {ProjectService} from "../../services/ProjectService";
import {Link} from "react-router-dom";
import moment from "moment";
import {Add, Delete, Edit, Info, Keyboard, Sort} from "@mui/icons-material";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount, getQueryVarsInStringFormat} from "../../utils/pages";
import defProjectSortOrderData, {getSortOrderOptionValue} from "./sortOptions";
import {SortOrderOptionType} from "../../types/global";
import {defLimit, defPage} from "../../utils/constant";
import AddEmployeeToProjectModal from "../../components/modals/AddEmployeeToProjectModal/AddEmployeeToProjectModal";
import {Employee} from "../../types/user";

const ProjectsListPage = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const lastElementRef = useRef<any>();

    const [search, serSearch] = useState<string>('');
    const [page, setPage] = useState<number>(defPage);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(defLimit);
    const [sort, setSort] = useState<string>( 'created_at');
    const [order, setOrder] = useState<string>('desc');

    const urlParamsStr = useMemo<string>( () => {
        const params = [
            { key: 'page', value: page },
            { key: 'limit', value: limit },
            { key: 'sort', value: sort },
            { key: 'order', value: order },
            { key: 'search', value: search },
        ];
        return getQueryVarsInStringFormat(params);
    }, [sort, order, page, limit, search]);

    const [fetchProjects, isLoading, error ] = useFetching(async () => {
        const { data } = await ProjectService.getProjects(urlParamsStr);
        const total = getPageCount(data.total, limit);

        setTotalPage(total);
        if(page !== 1) {
            setProjects([...projects, ...data.data]);
        } else {
            setProjects([...data.data]);
        }
    });

    useEffect(() => {
        console.log('fetch projects')
        fetchProjects();
    }, [page, limit, sort, order])


    useObserver(lastElementRef,page < totalPage, isLoading, () => {
        console.log('-' , page, totalPage, '-');
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

            console.log('sort', option)
    }

    const [openEmployeeAddMoal, setOpenEmployeeAddModal] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);


    const addEmployeeToProjectHanle = () => {

    }

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Projects" }]} />
            </Box>

            <div className='table-alt-1'>
                <Card className="card-box mb-4">
                    <div className="card-header">
                        <div className="card-header--title">
                            <small>Tables</small>
                            <h3>Projects</h3>
                        </div>
                        <Box className="card-header--actions">
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
                                            { getSortOrderOptionValue(e) }
                                        </MenuItem>
                                    )
                                }
                            </Select>
                            <IconButton
                                size="small"
                                color="primary"
                                className="text-primary"
                                title="View details">
                                <Sort />
                            </IconButton>
                        </Box>
                    </div>
                    <CardContent className="p-0">
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
                                    <tr
                                        key={e.id}
                                    >
                                        <td>
                                            <div
                                                className="d-flex align-items-center"
                                                 style={{
                                                     display: 'flex',
                                                     justifyContent: 'center'
                                                 }}>
                                                <div>
                                                    <Link
                                                        to={{
                                                            pathname: `/projects/${e.id}`
                                                        }}
                                                        className="font-weight-bold text-black"
                                                        title="...">
                                                        {e.name}
                                                    </Link>
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
                                        <td className="text-center">
                                            <Box>
                                                { e.budget } / {e.paid} $
                                            </Box>
                                        </td>
                                        <td className="text-center">
                                            <Box
                                                className="h-auto py-0 px-3 badge badge-warning"
                                            >
                                                { e.member_count }
                                            </Box>
                                        </td>

                                        <td className="text-center">
                                            <Box>
                                                <IconButton>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton>
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
                                                <IconButton>
                                                    <Info />
                                                </IconButton>
                                            </Box>
                                        </td>
                                    </tr>
                                )}

                                </tbody>
                            </table>
                            { isLoading &&
                                <CircularProgress />
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
                    </CardContent>
                </Card>
            </div>



            <AddEmployeeToProjectModal
                open={openEmployeeAddMoal}
                onClose={() => setOpenEmployeeAddModal(false)}
                onSave={addEmployeeToProjectHanle}
                setOpen={setOpenEmployeeAddModal}
                project={selectedProject}
            />


        </Container>
    );
}


export default ProjectsListPage;