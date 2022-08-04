import React, {useCallback, useEffect, useId, useMemo, useState} from 'react';


// @ts-ignore
import Board from 'react-trello';
import './style.scss';
import useQueryParams from "../../hooks/useQueryParams";
import fa from "@mobiscroll/react/dist/src/i18n/fa";
import defaultSortData from "./defaultSortData";

const Kanban = () => {
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

    const [sort, setSort] = useState({ key: 'sort', value: ''} );
    const [order, setOrder] = useState({ key: 'order', value: ''} );


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

    console.log(queryParamString);

    const lineIdsToString = useCallback((data: any) => {
        for (let lane of data.lanes) {
            lane.id = lane.id.toString();
            for (let card of lane.cards) {
                card.id = card.id.toString();
            }
        }
    }, []);

    const getLanesByMember = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/projects/5/members/1/lanes${queryParamString}`);
        const body = await response.json();
        lineIdsToString(body);
        setKanbanData({ lanes: [...body.lanes]});
    }

    // http requests

    const addLane = async (data: any) => {
        const res = await fetch(`http://127.0.0.1:8000/api/projects/1/lanes`,
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
            `http://127.0.0.1:8000/api/projects/1/lanes/${laneId}`,
            { method: "DELETE" });
        const cards = await res.json();

    }

    const updateLane = async (dataParams: any) => {
        const { laneId, data } = dataParams;

        const res = await fetch(`http://127.0.0.1:8000/api/projects/1/lanes/${laneId}`,
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

        const res = await fetch(`http://127.0.0.1:8000/api/projects/1/lanes/swap`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ lanes: kanbanData.lanes })
        });

        setKanbanData({ lanes: [ ...kanbanData.lanes]});
    }

    const addCard = async (data: any) => {
        const res = await fetch(`http://127.0.0.1:8000/api/projects/1/lanes/${data.laneId}/cards`,
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
            `http://127.0.0.1:8000/api/projects/1/lanes/${laneId}/cards/${cardId}`,
            { method: "DELETE" });
        const cards = await res.json();
        const lane = kanbanData.lanes.filter((kd:any) => kd.id === laneId)[0];
        lane.cards = cards;

        setKanbanData({ lanes: [
                ...kanbanData.lanes,
        ]});
    }

    const moveCard = async (data: any) => {
        const { fromLaneId, toLaneId, cardId, index } = data;

        const fromLane = kanbanData.lanes.filter((kd: any) => kd.id === fromLaneId)[0];
        const toLane = kanbanData.lanes.filter((kd: any) => kd.id === toLaneId)[0];

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

        console.log(toLane.cards);

        const res = await fetch(`http://127.0.0.1:8000/api/projects/1/lanes/${toLaneId}/cards/${card.id}/swap`,
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

    useEffect(() => {
        getLanesByMember();
    }, [queryParamString])

    // card or line text update commit

    // handlers
    const onDataChange = (newData: any) => {
        // console.log("data change");
        // console.log(newData);
        // console.log(kanbanData);
        //
        // if(!_.isEqual(newData, kanbanData)) {
        //     console.log("d");
        //     //TODO: send request to server for rename card
        // }
    }

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
        addLane({ ...params, employee_id: 11});
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
        console.log(def.value + "&" + def.order)
        return def.value + "&" + def.order;
    }

    // style={{width: '1000px', height: "800px", overflow: "auto", overflowX: "auto"}}
    return (
        <div className={'kanban-wrapper'}>
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

                onDataChange={onDataChange}

                handleLaneDragEnd={handleLaneDragEnd}

            />
        </div>
    );
};

export default Kanban;