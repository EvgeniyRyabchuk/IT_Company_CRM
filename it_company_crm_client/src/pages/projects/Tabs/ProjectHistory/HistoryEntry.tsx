import React from 'react';
import {ProjectHistory} from "../../../../types/project";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../../http";
import moment from "moment";

const HistoryEntry : React.FC<{entry: ProjectHistory}> = ({ entry}) => {
    return (
        <li className="todo-item" data-id="18-0">
            <div className="todo-title-wrapper">
                <div className="todo-title-area">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" className="drag-icon"
                    >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                    <div className="form-check">
                        <input id="Fix Responsiveness for new structure 💻"
                               type="checkbox"
                               className="form-check-input" />
                    </div>
                    <span className="todo-title">
                        { entry.action }
                    </span>
                </div>
                <div className="todo-item-action mt-lg-0 mt-50">
                    <div className="badge-wrapper me-1">
                        <span className="text-capitalize badge bg-light-success rounded-pill">
                        {entry.employee.position.name}
                        </span>
                    </div>
                    <small className="text-nowrap text-muted me-1">
                        { moment(entry.created_at).format('DD/MM/yyyy HH:MM:ss')}
                    </small>
                    <div className="avatar">
                        <img
                            src={`${API_URL_WITH_PUBLIC_STORAGE}/${entry.employee.user.avatar}`}
                            alt="avatarImg" height="32" width="32"
                        />
                    </div>
                </div>
            </div>
        </li>
    );
};

export default HistoryEntry;