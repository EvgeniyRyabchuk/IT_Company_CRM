import React, {useCallback, useEffect, useId, useMemo, useState} from 'react';


// @ts-ignore
import Board from 'react-trello';
import './style.scss';
import useQueryParams from "../../hooks/useQueryParams";
import defaultSortData from "./defaultSortData";
import KanbanCardEditModal from "../modals/KanbanCardEditModal/KanbanCardEditModal";
import {useAction} from "../../hooks/useAction";
import {userId} from "../Chat/ChatComponent";
import {useTypeSelector} from "../../hooks/useTypedSelector";

const Kanban = () => {

    const {
        getLanesByMember,
        addLane,
        deleteLane,
        updateLane




    } = useAction();
    const {
        lanes,
        sort,
        order

    } = useTypeSelector(state => state.kanban);

    const projectId = 2;

    const data = useMemo(() => {
        return { lanes: [] }
    }, []);

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

    const moveLane = async (data: any) => {
        const { removedIndex, addedIndex, payload } = data;

        const temp = lanes[removedIndex];
        // delete old item
        lanes.splice(removedIndex, 1);
        // insert new item
        lanes.splice(addedIndex, 0, temp);

        lanes.forEach((value: any, index: number) => {
            value.index = index
        })

        const res = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/lanes/swap`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ lanes: lanes })
        });

        /// setKanbanData({ lanes: [ ...kanbanData.lanes]});
    }

    const addCard = async (data: any) => {
        const res = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/lanes/${data.laneId}/cards`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data.card)
            });
        const card = await res.json();

        getLanesByMember(projectId, userId, queryParamString);

        // const lane = kanbanData.lanes.filter((kd:any) => kd.id === data.laneId)[0];
        // lane.cards = [ ...lane.cards, card];
        // lineIdsToString({lanes: [lane]});
        //
        //
        // setKanbanData({ lanes: [
        //     ...kanbanData.lanes
        // ]});


    }

    const deleteCard = async (data: any) => {
        const { cardId, laneId } = data;

        const res = await fetch(
            `http://127.0.0.1:8000/api/projects/${projectId}/lanes/${laneId}/cards/${cardId}`,
            { method: "DELETE" });
        const cards = await res.json();
        const lane = lanes.filter((kd:any) => kd.id === laneId)[0];
        lane.cards = cards;

       /// setKanbanData({ lanes: [
          ///      ...lanes,
        ///]});
    }

    const moveCard = async (data: any) => {

        if(sort.value != 'index' && order.value != 'asc')
            return;

        console.log(sort.value, order.value);

        const { fromLaneId, toLaneId, cardId, index } = data;

        const fromLane = lanes.filter((kd: any) => kd.id === fromLaneId)[0];
        const toLane = lanes.filter((kd: any) => kd.id === toLaneId)[0];

        const card = fromLane.cards.filter((c: any) => c.id == cardId)[0];

        console.log(fromLaneId, toLaneId, cardId, index, fromLane, '========================')

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

        console.log(toLane.cards);

        const res = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/lanes/${toLaneId}/cards/${card.id}/swap`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({
                    fromLane,
                    toLane
                })
            });


        ///setKanbanData({ lanes: [
          ///  ...kanbanData.lanes,
        ///]});

    }

    const updateCard = async (data: any) => {
        const { card, laneId } = data;
        const res = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/lanes/${laneId}/cards/${card.id}`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(card)
            });
        const resCard = await res.json();
        return resCard;
    }

    useEffect(() => {
        getLanesByMember(projectId, userId, queryParamString);
    }, [queryParamString])

    // card or line text update commit

    // handlers
    // const onDataChange = (newData: any) => {
    //     // console.log("data change");
    //     // console.log(newData);
    //     // console.log(kanbanData);
    //     //
    //     // if(!_.isEqual(newData, kanbanData)) {
    //     //     console.log("d");

    //     // }
    // }

    const onCardAdd = (card: any, laneId: any) => {
        console.log("onCardAdd");
        console.log(card)
        console.log(laneId);
        console.log("========== onCardAdd");

        addCard({card, laneId});

    }

    const onCardDelete = (cardId: any, laneId: any) => {
        console.log("onCardDelete")
        console.log(cardId, laneId);

        deleteCard({cardId, laneId});
    }
    const onCardMoveAcrossLanes = (fromLaneId: any, toLaneId: any, cardId: any, index: any) => {
        console.log("onCardMoveAcrossLanes")
        console.log(fromLaneId, toLaneId, cardId, index);
        moveCard({ fromLaneId, toLaneId, cardId, index });
    }

    const onLaneAdd = (params: any) => {
        console.log("onLaneAdd");
        console.log(params);
        addLane(projectId, userId, { ...params, employee_id: userId});
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
        moveLane({removedIndex, addedIndex, payload});
    }


    const onSort = (e: any) => {
        const payload = e.target.value.split('&');
        const sortValue = payload[0] ?? 'default';
        const orderValue =  payload[1] ?? 'asc';
        ///setSort({ ...sort, value: sortValue})
        ///setOrder({ ...order, value: orderValue});
    }
    const selectSortDefVal = () :string => {
        const def = sortedData.filter(e => e.selected === true)[0] ?? sortedData[0];
        return def.value + "&" + def.order;
    }

    const [open, setOpen] = useState(false);
    const [card, setCard] = useState();

    const onCardClick = (cardId: any, metadata: any, laneId: any) => {
        console.log('===============Click===============')
        console.log(cardId, metadata, laneId);
        const lane = lanes.filter((kd: any) => kd.id === laneId)[0];
        const card = lane.cards.filter((c: any) => c.id == cardId)[0];
        setOpen(true);
        ///setCard({...card, laneId});
    }

    const onModalClose = () => {
        setOpen(false);
    }

    const onModalSave = async (newCard: any) => {
        console.log(newCard)

        const lane = lanes.filter((kd: any) => kd.id === newCard.laneId)[0];
        const card = lane.cards.filter((c: any) => c.id == newCard.id)[0];
        card.title = newCard.title;
        card.description = newCard.description;
        card.priority = newCard.priority;

        const addedCard = await updateCard({card, laneId: newCard.laneId});
        card.tags = addedCard.tags;

        ///setKanbanData({ lanes: [...kanbanData.lanes]});
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