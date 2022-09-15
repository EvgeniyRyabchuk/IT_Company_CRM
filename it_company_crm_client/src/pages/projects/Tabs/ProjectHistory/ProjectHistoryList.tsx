import React, {useEffect, useMemo, useRef, useState} from 'react';
import '../../../../assets/components/ProjectPage/projectHistory.css'
import {ProjectService} from "../../../../services/ProjectService";
import HistoryEntry from "./HistoryEntry";
import {Project, ProjectHistory} from "../../../../types/project";
import {defLimit, defPage} from "../../../../utils/constant";
import {getPageCount, getQueryVarsInStringFormat} from "../../../../utils/pages";
import {useFetching} from "../../../../hooks/useFetching";
import {useObserver} from "../../../../hooks/useObserver";
import useDebounce from "../../../../hooks/useDebounce";
import {CircularProgress} from "@mui/material";

const ProjectHistoryList : React.FC<{
    project: Project,
    previewCount?: number | undefined
}> = ({project, previewCount}) => {

    const [history, setHistory] = useState<ProjectHistory[]>([]);

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const [page, setPage] = useState<number>(defPage);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(previewCount ?? defLimit);

    console.log(previewCount)

    const lastElementRef = useRef<any>();

    const urlParamsStr = useMemo<string>( () => {
        const params = [
            { key: 'page', value: page },
            { key: 'limit', value: limit },
            { key: 'search', value: search },
        ];
        return getQueryVarsInStringFormat(params);
    }, [page, limit, debouncedSearch]);

    const [fetchHistory, isLoading, error ] = useFetching(async () => {
        const { data } = await ProjectService.getHistory(project.id, urlParamsStr);
        const total = getPageCount(data.total, limit);

        setTotalPage(total);
        if(page > 1) {
            setHistory([...history, ...data.data]);
        }
        else if(page === 1) {
            setHistory([...data.data]);
        }
        else {
            setHistory([]);
        }
    });

    useEffect(() => {
        fetchHistory();
    }, [page, limit, debouncedSearch]);


    useObserver(lastElementRef,page < totalPage, isLoading, () => {
        console.log('-' , page, totalPage, '-');
        setPage(page + 1);
    });

    return (
        <div>
            <div className="app-content content overflow-hidden todo-application">
                <div className="content-area-wrapper container-xxl p-0">
                    <div className="content-right">
                        <div className="content-wrapper">
                            <div className="content-body">
                                <div className="todo-app-list">
                                    <div className="app-fixed-search d-flex align-items-center">
                                            <div className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                                </svg>
                                            </div>
                                            <div className="d-flex align-content-center justify-content-between w-100">
                                                <div className="input-group-merge input-group"><span className="input-group-text"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    className="text-muted">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                </svg></span>
                                                    <input
                                                        placeholder="Search history entry"
                                                        type="text"
                                                        className="form-control"
                                                        value={search}
                                                        onChange={(e: any) => setSearch(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="dropdown"><a href="/" aria-haspopup="true" className="hide-arrow me-1" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                     className="text-body">
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="12" cy="5" r="1"></circle>
                                                    <circle cx="12" cy="19" r="1"></circle>
                                                </svg>
                                            </a>
                                            <div role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-end"><a
                                                 role="menuitem" className="dropdown-item"
                                                href="/demo/vuexy-react-admin-dashboard-template/demo-1/">Sort A-Z</a>
                                                <a role="menuitem" className="dropdown-item" href="/demo/vuexy-react-admin-dashboard-template/demo-1/">
                                                    Sort Z-A
                                                </a>
                                                <a role="menuitem" className="dropdown-item" href="/demo/vuexy-react-admin-dashboard-template/demo-1/">
                                                    Sort Assignee
                                                </a>
                                                <a role="menuitem" className="dropdown-item" href="/demo/vuexy-react-admin-dashboard-template/demo-1/">
                                                    Sort Due Date</a>
                                                <a role="menuitem" className="dropdown-item"href="/demo/vuexy-react-admin-dashboard-template/demo-1/">
                                                    Reset Sort
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="scrollbar-container list-group todo-task-list-wrapper ps ps--active-y"
                                    >
                                        <ul
                                            className={`todo-task-list media-list1 
                                                ${previewCount && 'hidden-bottom-60'}
                                            `}
                                        >
                                            { history.map((h: ProjectHistory )=>
                                                <HistoryEntry key={h.id} entry={h} />
                                            )}
                                        </ul>

                                        <div
                                            ref={lastElementRef}
                                            style={{
                                                width: '100%',
                                                display: previewCount ? 'none' : 'block'
                                            }}>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { isLoading &&
                <CircularProgress />
            }
        </div>
    );
};

export default ProjectHistoryList;