import {KanbanAction, KanbanActionTypes, KanbanCard, KanbanLane, KanbanState} from "../../types/kanban";


const initialState: KanbanState = {
    lanes: [],
    loading: false,
    error: null,
    sort: { key: 'sort', value: 'index'},
    order: {key: 'order', value: 'asc'},

}

const formatLaneIdsToStringAndStyledCard = (data: any) => {
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
            formatLaneIdsToStringAndStyledCard({lanes: newLanes})
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

        // case KanbanActionTypes.ADD_CARD: {
        //     const {laneId, card} = action.payload;
        //
        //     const newLane = state.lanes.filter((e: KanbanLane) => e.id === laneId)[0];
        //     newLane.cards = [...newLane.cards, card];
        //
        //     const index = state.lanes.findIndex((e: KanbanLane) => e.id === newLane.id);
        //     state.lanes.splice(index, 1, newLane);
        //
        //     const newLanes = [...state.lanes];
        //     formatLaneIdsToStringAndStyledCard({lanes: newLanes})
        //
        //     return {...state, lanes: newLanes}
        // }

        case KanbanActionTypes.DELETE_CARD: {
            const { cardId, laneId } = action.payload;
            const newLane = state.lanes.filter((kd: any) => kd.id === laneId)[0];
            newLane.cards = newLane.cards.filter((e: KanbanCard) => e.id !== cardId);

            const index = state.lanes.findIndex((e: KanbanLane) => e.id === newLane.id);
            state.lanes.splice(index, 1, newLane);

            return {...state, lanes: [ ...state.lanes ]}
        }
        case KanbanActionTypes.UPDATE_CARD: {
            const {laneId, updatedCard} = action.payload;

            const newLane = state.lanes.filter((e: KanbanLane) => e.id === laneId)[0];
            newLane.cards = newLane.cards.map((e: KanbanCard) => {
                    if(e.id == updatedCard.id) {
                        console.log('finded', updatedCard.tags)
                        const newCard = {
                            ...e,
                            title: updatedCard.title,
                            description: updatedCard.description,
                            priority: updatedCard.priority,
                            tags: [...updatedCard.tags]
                        };
                        return newCard;
                    }
                    else
                        return e;
                }
            )

            console.log(newLane, '==============================')

            const index = state.lanes.findIndex((e: KanbanLane) => e.id === newLane.id);
            state.lanes.splice(index, 1, newLane);

            formatLaneIdsToStringAndStyledCard({lanes: [...state.lanes]})

            return {...state, lanes: [...state.lanes]}
        }
        case KanbanActionTypes.MOVE_CARD:
            return { ...state, }

        case KanbanActionTypes.SET_CARDS:
            return { ...state, }

        case KanbanActionTypes.SET_SORT:
            return { ...state, sort: action.payload}

        case KanbanActionTypes.SET_ORDER:
            return { ...state, order: action.payload}

        case KanbanActionTypes.SET_LANES:
            return { ...state, lanes: [ ...action.payload]}

        default:
            return state;
    }
}