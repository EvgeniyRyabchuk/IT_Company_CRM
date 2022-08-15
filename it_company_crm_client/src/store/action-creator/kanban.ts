import {Dispatch} from "react";
import {KanbanService} from "../../services/KanbanService";
import {KanbanAction, KanbanActionTypes, KanbanCard, QueryStringVar} from "../../types/kanban";


export const getLanesByMember = (projectId: number, memberId: number, query: string) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            dispatch({type: KanbanActionTypes.FETCH_LANES_BY_MEMBER});
            const responce = await KanbanService.getLanesByMemberId(projectId, memberId, query);
            dispatch({type: KanbanActionTypes.FETCH_LANES_BY_MEMBER_SUCCESS, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.FETCH_LANES_BY_MEMBER_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

export const addLane = (projectId: number, memberId: number, params: any) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            const responce = await KanbanService.addLane(projectId, memberId, params);
            dispatch({type: KanbanActionTypes.ADD_LANE, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

export const deleteLane = (projectId: number, laneId: number) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            console.log('delete')
            const responce = await KanbanService.deleteLane(projectId, laneId);
            dispatch({type: KanbanActionTypes.DELETE_CARD, payload: laneId});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

export const updateLane = (projectId: number, laneId: number, data: any) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            const responce = await KanbanService.updateLane(projectId, laneId, data);
            dispatch({type: KanbanActionTypes.UPDATE_LANE, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

/*
export const moveLane = (userId: number, toUserId: number) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            const responce = await KanbanService.addLane(userId, toUserId);
            dispatch({type: KanbanActionTypes.ADD_LANE, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}



export const addCard = (userId: number, toUserId: number) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            const responce = await KanbanService.addLane(userId, toUserId);
            dispatch({type: KanbanActionTypes.ADD_LANE, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

export const deleteCard = (userId: number, toUserId: number) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            const responce = await KanbanService.addLane(userId, toUserId);
            dispatch({type: KanbanActionTypes.ADD_LANE, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

export const moveCard = (userId: number, toUserId: number) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            const responce = await KanbanService.addLane(userId, toUserId);
            dispatch({type: KanbanActionTypes.ADD_LANE, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

export const moveCupdateCardard = (userId: number, toUserId: number) => {
    return async (dispatch: Dispatch<KanbanAction>) => {
        try {
            const responce = await KanbanService.addLane(userId, toUserId);
            dispatch({type: KanbanActionTypes.ADD_LANE, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: KanbanActionTypes.SET_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

*/

export const setSort = (sort: QueryStringVar) => {
    return { type: KanbanActionTypes.SET_SORT, payload: sort};
}

export const setOrder = (order: QueryStringVar) => {
    return { type: KanbanActionTypes.SET_ORDER, payload: order};
}

export const setCards = (laneId: number, cards: KanbanCard[]) => {
    return { type: KanbanActionTypes.SET_SORT, payload: { laneId, cards}};
}