import {KanbanAction, KanbanActionTypes, KanbanLane, KanbanState} from "../../types/kanban";
import {useCallback} from "react";


const initialState: KanbanState = {
    lanes: [],
    loading: false,
    error: null,
    sort: { key: 'sort', value: 'index'},
    order: {key: 'order', value: 'asc'},

}

const formatLineIdsToStringAndStyledCard = (data: any) => {
    for (let lane of data.lanes) {
        lane.id = lane.id.toString();
        for (let card of lane.cards) {
            card.id = card.id.toString();
            if(card.tags[0]) {
                card.style = {
                    border: `2px dashed ${card.tags[0].bgcolor}`
                };
            }
        }
    }
}


export const kanbanReducer = (state = initialState, action: KanbanAction) : KanbanState  => {
    switch(action.type) {
        case KanbanActionTypes.FETCH_LANES_BY_MEMBER:
            return {...state, loading: true}
        case KanbanActionTypes.FETCH_LANES_BY_MEMBER_SUCCESS:
            const newLanes = [...action.payload];
            formatLineIdsToStringAndStyledCard({lanes: newLanes})
            return {...state, loading: false, lanes: newLanes}
        case KanbanActionTypes.FETCH_LANES_BY_MEMBER_ERROR:
            return {...state, loading: false, error: action.payload}

        case KanbanActionTypes.SET_ERROR:
            return { ...state, error: action.payload}

        case KanbanActionTypes.ADD_LANE:
            return { ...state, lanes: [ ...action.payload, ]}

        case KanbanActionTypes.DELETE_LANE: {

            const index = state.lanes.findIndex((e: KanbanLane) => e.id === action.payload);
            state.lanes.splice(index, 1);
            return {...state, lanes: [...state.lanes]}
        }
        case KanbanActionTypes.UPDATE_LANE: {
            const newLane = action.payload;
            const index = state.lanes.findIndex((e: KanbanLane) => e.id === newLane.id);
            state.lanes.splice(index, 1, newLane);
            return { ...state, lanes: [...state.lanes] }
        }

        case KanbanActionTypes.MOVE_LANE:
            return { ...state, }

        case KanbanActionTypes.ADD_CARD:
            return { ...state, }

        case KanbanActionTypes.DELETE_CARD:
            return { ...state, }

        case KanbanActionTypes.UPDATE_CARD:
            return { ...state, }

        case KanbanActionTypes.MOVE_CARD:
            return { ...state, }

        case KanbanActionTypes.SET_CARDS:
            return { ...state, }

        case KanbanActionTypes.SET_SORT:
            return { ...state, sort: action.payload}

        case KanbanActionTypes.SET_ORDER:
            return { ...state, order: action.payload}

        default:
            return state;
    }
}