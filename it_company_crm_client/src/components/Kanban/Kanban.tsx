import React, {useCallback, useEffect, useId, useMemo, useState} from 'react';


// @ts-ignore
import Board from 'react-trello';
import './style.scss';
import useQueryParams from "../../hooks/useQueryParams";
import defaultSortData from "./defaultSortData";
import KanbanCardEditModal from "../modals/KanbanCardEditModal";

const Kanban = () => {

    const projectId = 2;
    const memberId = 1;

    const data = useMemo(() => {
        return {
            lanes: [
                {
                    cards: [
                        {
                            description: '2 Gallons of milk at the Deli store',
                            id: 'Card1',
                            label: '2017-12-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-12-01T10:00:00Z',
                                shortCode: 'abc'
                            },
                            title: 'Buy milk',

                        },
                        {
                            description: 'Sort out recyclable and waste as needed',
                            id: 'Card2',
                            label: '2017-11-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-11-01T10:00:00Z',
                                shortCode: 'aaa'
                            },
                            title: 'Dispose Garbage',

                        },
                        {
                            description: 'Can AI make memes?',
                            id: 'Card3',
                            label: '2017-10-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-10-01T10:00:00Z',
                                shortCode: 'fa1'
                            },
                            title: 'Write Blog',

                        },
                        {
                            description: 'Transfer to bank account',
                            id: 'Cardsdfads4',
                            label: '2017-09-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-09-01T10:00:00Z',
                                shortCode: 'ga2'
                            },
                            title: 'Pay Rent',

                        }
                    ],
                    currentPage: 1,
                    id: 'SORTED_LANE',
                    label: '4/0',
                    title: 'Sorted Lane 1',

                },
                {
                    cards: [
                        {
                            description: '2 Gallons of milk at the Deli store',
                            id: 'Cardasasdfdf1',
                            label: '2017-12-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-12-01T10:00:00Z',
                                shortCode: 'abc'
                            },
                            title: 'Buy milk'
                        },
                        {
                            description: 'Sort out recyclable and waste as needed',
                            id: 'Caradfd2',
                            label: '2017-11-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-11-01T10:00:00Z',
                                shortCode: 'aaa'
                            },
                            title: 'Dispose Garbage'
                        },
                        {
                            description: 'Can AI make memes?',
                            id: 'Caadfbrd3',
                            label: '2017-10-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-10-01T10:00:00Z',
                                shortCode: 'fa1'
                            },
                            title: 'Write Blog'
                        },
                        {
                            description: 'Transfer to bank account',
                            id: 'Cadfbrd4',
                            label: '2017-09-01',
                            laneId: 'SORTED_LANE',
                            metadata: {
                                completedAt: '2017-09-01T10:00:00Z',
                                shortCode: 'ga2'
                            },
                            title: 'Pay Rent'
                        }
                    ],
                    currentPage: 1,
                    id: 'SORTsadfbsdfED_LANE',
                    label: '4/0',
                    title: 'Sorted Lane 2',

                }
            ]
        }
    }, []);

    const [kanbanData, setKanbanData] = useState<any>(data);
    const [isDataChangeHandled, setIsDataChangeHandled] = useState(false);

    const [sort, setSort] = useState({ key: 'sort', value: 'index'} );
    const [order, setOrder] = useState({ key: 'order', value: 'asc'} );

    const sortData = useMemo(() => {
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

    const { queryParamString } = useQueryParams([sort, order]);

    const formatLineIdsToStringAndStyledCard = useCallback((data: any) => {
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
    }, []);

    console.log(kanbanData.lanes);

    // http requests

    const getLanesByMember = async () => {
        const url = `http://127.0.0.1:8000/api/projects/${projectId}/members/${memberId}/lanes${queryParamString}`;
        const response = await fetch(url);
        let body = await response.json();
        formatLineIdsToStringAndStyledCard(body);

        const lanes = body.lanes.map((e: any ) => { e.style = { 'backgroundColor': e.color}; return e; })
        setKanbanData({ lanes: [...lanes]});
    }


    const addLane = async (data: any) => {
        const res = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/lanes`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            });
        // const body = await res.json();
        // lineIdsToString(body);
        // setKanbanData({ lanes: [...body.lanes]});
        getLanesByMember();
    }

    const deleteLane = async (data: any) => {
        const { laneId } = data;

        const res = await fetch(
            `http://127.0.0.1:8000/api/projects/${projectId}/lanes/${laneId}`,
            { method: "DELETE" });
        const cards = await res.json();

    }

    const updateLane = async (dataParams: any) => {
        const { laneId, data } = dataParams;

        const res = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/lanes/${laneId}`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(data)
            });

    }

    const moveLane = async (data: any) => {
        const { removedIndex, addedIndex, payload } = data;

        const temp = kanbanData.lanes[removedIndex];
        // delete old item
        kanbanData.lanes.splice(removedIndex, 1);
        // insert new item
        kanbanData.lanes.splice(addedIndex, 0, temp);

        kanbanData.lanes.forEach((value: any, index: number) => {
            value.index = index
        })

        const res = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/lanes/swap`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ lanes: kanbanData.lanes })
        });

        setKanbanData({ lanes: [ ...kanbanData.lanes]});
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

        getLanesByMember();

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
        const lane = kanbanData.lanes.filter((kd:any) => kd.id === laneId)[0];
        lane.cards = cards;

        setKanbanData({ lanes: [
                ...kanbanData.lanes,
        ]});
    }

    const moveCard = async (data: any) => {

        if(sort.value != 'index' && order.value != 'asc')
            return;

        console.log(sort.value, order.value);

        const { fromLaneId, toLaneId, cardId, index } = data;

        const fromLane = kanbanData.lanes.filter((kd: any) => kd.id === fromLaneId)[0];
        const toLane = kanbanData.lanes.filter((kd: any) => kd.id === toLaneId)[0];

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


        setKanbanData({ lanes: [
            ...kanbanData.lanes,
        ]});

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
        getLanesByMember();
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
        addLane({ ...params, employee_id: 1});
    }
    const onLaneDelete = (laneId: any) => {
        console.log("onLaneDelete")
        console.log(laneId);
        deleteLane({ laneId });

    }
    const onLaneUpdate = (laneId: any, data: any) => {
        console.log("onLaneUpdate")
        console.log(laneId, data);
        updateLane({laneId, data});

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
        setSort({ ...sort, value: sortValue})
        setOrder({ ...order, value: orderValue});
    }
    const selectSortDefVal = () :string => {
        const def = sortData.filter(e => e.selected === true)[0] ?? sortData[0];
        return def.value + "&" + def.order;
    }

    const [open, setOpen] = useState(false);
    const [card, setCard] = useState();

    const onCardClick = (cardId: any, metadata: any, laneId: any) => {
        console.log('===============Click===============')
        console.log(cardId, metadata, laneId);
        const lane = kanbanData.lanes.filter((kd: any) => kd.id === laneId)[0];
        const card = lane.cards.filter((c: any) => c.id == cardId)[0];
        setOpen(true);
        setCard({...card, laneId});
    }

    const onModalClose = () => {
        setOpen(false);
    }

    const onModalSave = async (newCard: any) => {
        console.log(newCard)

        const lane = kanbanData.lanes.filter((kd: any) => kd.id === newCard.laneId)[0];
        const card = lane.cards.filter((c: any) => c.id == newCard.id)[0];
        card.title = newCard.title;
        card.description = newCard.description;
        card.priority = newCard.priority;

        const addedCard = await updateCard({card, laneId: newCard.laneId});

        card.tags = addedCard.tags;

        setKanbanData({ lanes: [...kanbanData.lanes]});
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
                { sortData.map(e =>
                    <option
                        key={e.id}
                        value={e.value + "&" + e.order}
                    >
                        {e.name} ({e.order})
                    </option>
                )}

            </select>
            <Board
                data={kanbanData}
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