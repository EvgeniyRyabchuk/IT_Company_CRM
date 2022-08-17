import {Employee} from "./user";
import {Project} from "./project";

export interface KanbanPriorities {
    id: number;
    title: string;
}

export interface KanbanCard {
    id: number;
    lane_id: number,
    title: string,
    description: string,
    index: number,
    label: string,
    cardColor: string,
    priority: string,
    created_at: string,
    updated_at: string,
    tags: KanbanPriorities[]
}

export interface KanbanLane {

    id: number;

    employee_id: number;
    project_id: number;

    employee: Employee;
    project: Project;

    label: string;
    title: string;
    color: string;
    index: number,

    cards: KanbanCard[];

    created_at: string;
    updated_at: string;
}

export interface QueryStringVar {
    key: string;
    value: string;
}

export interface KanbanState {
    lanes: KanbanLane[];

    loading: boolean;
    error: null | string;
    sort: QueryStringVar;
    order: QueryStringVar;
}

export enum KanbanActionTypes {
    FETCH_LANES_BY_MEMBER = "FETCH_LANES_BY_MEMBER",
    FETCH_LANES_BY_MEMBER_SUCCESS = "FETCH_LANES_BY_MEMBER_SUCCESS",
    FETCH_LANES_BY_MEMBER_ERROR = "FETCH_LANES_BY_MEMBER_ERROR",

    ADD_LANE = 'ADD_LANE',
    DELETE_LANE = 'DELETE_LANE',
    UPDATE_LANE = 'UPDATE_LANE',
    MOVE_LANE = 'MOVE_LANE',

    ADD_CARD = 'ADD_CARD',
    DELETE_CARD = 'DELETE_CARD',
    MOVE_CARD = 'MOVE_CARD',
    UPDATE_CARD = 'UPDATE_CARD',

    SET_ERROR = 'SET_ERROR',

    SET_SORT = 'SET_SORT',
    SET_ORDER = 'SET_ORDER',

    SET_CARDS = 'SET_CARDS',

    SET_LANES = 'SET_LANES'
}

interface FetchKanbanLaneByMemberAction {
    type: KanbanActionTypes.FETCH_LANES_BY_MEMBER
}
interface FetchKanbanLaneByMemberSuccessAction {
    type: KanbanActionTypes.FETCH_LANES_BY_MEMBER_SUCCESS,
    payload: any[];
}
interface FetchKanbanLaneByMemberErrorAction {
    type: KanbanActionTypes.FETCH_LANES_BY_MEMBER_ERROR
    payload: string
}

interface AddKanbanLaneAction {
    type: KanbanActionTypes.ADD_LANE
    payload: any;
}
interface DeleteKanbanLaneAction {
    type: KanbanActionTypes.DELETE_LANE
    payload: number;
}
interface UpdateKanbanLaneAction {
    type: KanbanActionTypes.UPDATE_LANE
    payload: KanbanLane;
}
interface MoveKanbanLaneAction {
    type: KanbanActionTypes.MOVE_LANE
    payload: any;
}


interface AddKanbanCardAction {
    type: KanbanActionTypes.ADD_CARD
    payload: any;
}
interface DeleteKanbanCardAction {
    type: KanbanActionTypes.DELETE_CARD
    payload: { cardId: number, laneId: number };
}
interface UpdateKanbanCardAction {
    type: KanbanActionTypes.UPDATE_CARD
    payload: { updatedCard: KanbanCard, laneId: number };
}
interface MoveKanbanCardAction {
    type: KanbanActionTypes.MOVE_CARD
    payload: { fromLane: KanbanLane, toLane: KanbanLane };
}
interface KanbanSetErrorAction {
    type: KanbanActionTypes.SET_ERROR
    payload: string;
}

interface KanbanSetSortAction {
    type: KanbanActionTypes.SET_SORT
    payload: QueryStringVar;
}
interface KanbanSetOrderAction {
    type: KanbanActionTypes.SET_ORDER
    payload: QueryStringVar
}
interface KanbanSetCardsAction {
    type: KanbanActionTypes.SET_CARDS;
    payload: { laneId: number, cards: KanbanCard[] };
}

interface KanbanSetLanesAction {
    type: KanbanActionTypes.SET_LANES;
    payload: KanbanLane[];
}

export type KanbanAction =
    FetchKanbanLaneByMemberAction |
    FetchKanbanLaneByMemberSuccessAction |
    FetchKanbanLaneByMemberErrorAction |
    AddKanbanLaneAction | DeleteKanbanLaneAction | UpdateKanbanLaneAction | MoveKanbanLaneAction |
    AddKanbanCardAction | DeleteKanbanCardAction | UpdateKanbanCardAction | MoveKanbanCardAction |
    KanbanSetErrorAction |
    KanbanSetSortAction | KanbanSetOrderAction | KanbanSetCardsAction |
    KanbanSetLanesAction

