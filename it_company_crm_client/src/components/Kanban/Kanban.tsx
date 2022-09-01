import React, {useCallback, useEffect, useId, useMemo, useState} from 'react';


// @ts-ignore
import Board from 'react-trello';
import './style.scss';
import useQueryParams from "../../hooks/useQueryParams";
import defaultSortData from "./defaultSortData";
import KanbanCardEditModal from "../modals/KanbanCardEditModal/KanbanCardEditModal";
import {useAction} from "../../hooks/useAction";

import {useTypeSelector} from "../../hooks/useTypedSelector";
import {KanbanService} from "../../services/KanbanService";
import {KanbanCard, KanbanLane} from "../../types/kanban";
import useAuth from "../../hooks/useAuth";
import {Employee} from "../../types/user";

const Kanban : React.FC<{projectId: number}> = ({projectId}) => {
    const { user } = useAuth();

    const {
        getLanesByMember,
        addLane,
        deleteLane,
        updateLane,
        moveLane,
        deleteCard,
        moveCard,
        updateCard,
        setSort,
        setOrder
    } = useAction();

    const {
        lanes,
        sort,
        order

    } = useTypeSelector(state => state.kanban);

    const data = { lanes: [] };

    const [isDataChangeHandled, setIsDataChangeHandled] = useState(false);
    const sortedData = useMemo(() => {
        if(sort.value) {
            return defaultSortData.map(e => {
                if(e.value === sort.value && e.order === order.value)
                    e.selected = true;
                else
                    e.selected = false;
                return e;
            });
        }
        //TODO: push query params to url
        // https://stackoverflow.com/questions/40161516/how-do-you-programmatically-update-query-params-in-react-router
        return defaultSortData

    }, [sort, order]);

    // hooks that returns query string for url
    const { queryParamString } = useQueryParams([sort, order]);

    console.log(lanes);

    useEffect(() => {
        getLanesByMember(projectId, user!.id, queryParamString);
    }, [queryParamString])


    const onCardAdd = async (card: any, laneId: any) => {
        console.log("onCardAdd");
        console.log(card)
        console.log(laneId);
        console.log("========== onCardAdd");

        await KanbanService.addCard(projectId, laneId, card);
        getLanesByMember(projectId, user!.id, queryParamString);
    }

    const onCardDelete = (cardId: any, laneId: any) => {
        console.log("onCardDelete")
        console.log(cardId, laneId);
        deleteCard(projectId, laneId, cardId);
    }
    const onCardMoveAcrossLanes = (fromLaneId: any, toLaneId: any, cardId: any, index: any) => {
        console.log("onCardMoveAcrossLanes")
        console.log(fromLaneId, toLaneId, cardId, index);

        if(sort.value != 'index')
            return;
        if(order.value != 'asc')
            return;

        const fromLane = lanes.filter((kd: any) => kd.id === fromLaneId)[0];
        const toLane = lanes.filter((kd: any) => kd.id === toLaneId)[0];

        const card = fromLane.cards.filter((c: any) => c.id == cardId)[0];

        const temp = toLane.cards[index];

        // delete old item
        fromLane.cards.splice(card.index, 1);
        // insert new item
        toLane.cards.splice(index, 0, card);

        fromLane.cards.forEach((value: any, index: number) => {
            value.index = index
        });
        toLane.cards.forEach((value: any, index: number) => {
            value.index = index
        });

        moveCard(projectId, toLaneId, cardId, { fromLane, toLane })
    }

    const onLaneAdd = (params: any) => {
        console.log("onLaneAdd");
        console.log(params);
        addLane(projectId, user!.id, { ...params, employee_id: user!.id});
    }

    const onLaneDelete = (laneId: any) => {
        console.log("onLaneDelete")
        console.log(laneId);
        deleteLane(projectId, laneId);

    }
    const onLaneUpdate = (laneId: number, data: any) => {
        console.log("onLaneUpdate")
        console.log(laneId, data);
        updateLane(projectId, laneId, data);

    }
    const handleLaneDragEnd = (removedIndex: any, addedIndex: any, payload: any) => {
        console.log("handleLaneDragEnd")
        console.log(removedIndex, addedIndex, payload);

        const temp = lanes[removedIndex];
        // delete old item
        lanes.splice(removedIndex, 1);
        // insert new item
        lanes.splice(addedIndex, 0, temp);

        lanes.forEach((value: any, index: number) => {
            value.index = index
        })

        moveLane(projectId, { lanes: lanes});
    }


    const onSort = (e: any) => {
        const payload = e.target.value.split('&');
        const sortValue = payload[0] ?? 'default';
        const orderValue =  payload[1] ?? 'asc';

        setSort({ ...sort, value: sortValue});
        setOrder({ ...order, value: orderValue});
        ///setSort({ ...sort, value: sortValue})
        ///setOrder({ ...order, value: orderValue});
    }
    const selectSortDefVal = () :string => {
        const def = sortedData.filter(e => e.selected === true)[0] ?? sortedData[0];
        return def.value + "&" + def.order;
    }

    const [open, setOpen] = useState(false);
    const [card, setCard] = useState<KanbanCard>();
    const [cardOwner, setCardOwner] = useState<Employee>();

    const onCardClick = (cardId: any, metadata: any, laneId: any) => {
        console.log('===============Click===============')
        console.log(cardId, metadata, laneId);
        const lane = lanes.filter((kd: KanbanLane) => kd.id === laneId)[0];
        const card = lane.cards.filter((c: any) => c.id == cardId)[0];
        setCard({...card});
        setCardOwner(lane.employee);
        setOpen(true);
    }

    const onModalClose = () => {
        setOpen(false);
    }

    const onModalSave = async (newCard: KanbanCard) => {
        console.log(newCard)

        const lane = lanes.filter((kd: any) => kd.id == newCard.lane_id)[0];
        const card = lane.cards.filter((c: any) => c.id == newCard.id)[0];
        card.title = newCard.title;
        card.description = newCard.description;
        card.priority = newCard.priority;

        updateCard(projectId, lane.id, card);
        // getLanesByMember(projectId, userId, queryParamString);
        setOpen(false);
    }

    /*    https://colorhunt.co/palette/1c3879607eaaeae3d2f9f5eb*/

    return (
        <div className={'kanban-wrapper'}>

            <KanbanCardEditModal
                open={open}
                onClose={onModalClose}
                onSave={onModalSave}
                setOpen={setOpen}
                card={card}
                owner={cardOwner}
            />

            <select
                onChange={onSort}
                value={selectSortDefVal()}
            >
                { sortedData.map(e =>
                    <option
                        key={e.id}
                        value={e.value + "&" + e.order}
                    >
                        {e.name} ({e.order})
                    </option>
                )}

            </select>
            <Board
                data={lanes.length > 0 ? { lanes: lanes} : data}
                canAddLanes={true}
                editable={true}
                editLaneTitle={true}
                draggable={true}
                onCardAdd={onCardAdd}
                onCardDelete={onCardDelete}
                onCardMoveAcrossLanes={onCardMoveAcrossLanes}
                onLaneAdd={onLaneAdd}
                onLaneDelete={onLaneDelete}
                onLaneUpdate={onLaneUpdate}
                handleLaneDragEnd={handleLaneDragEnd}

                onCardClick={onCardClick}


                style={{
                    backgroundColor: '#607EAA'
                }}

            />
        </div>
    );
};

export default Kanban;