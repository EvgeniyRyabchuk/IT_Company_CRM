import React, {useCallback, useEffect, useMemo, useState} from 'react';


// @ts-ignore
import Board from 'react-trello';
import _, {forEach} from "lodash";
import './style.css';

import da from "@mobiscroll/react/dist/src/i18n/da";

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
                            title: 'Buy milk'
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
                            title: 'Dispose Garbage'
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
                            title: 'Write Blog'
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
                            title: 'Pay Rent'
                        }
                    ],
                    currentPage: 1,
                    id: 'SORTED_LANE',
                    label: '4/0',
                    title: 'Sorted Lane'
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
                    title: 'Sorted Lane'
                }
            ]
        }
    }, []);
    const [kanbanData, setKanbanData] = useState<any>(data);
    const [isDataChangeHandled, setIsDataChangeHandled] = useState(false);

    console.log(kanbanData, "dsfvsdfg");

    const lineIdsToString = useCallback((data: any) => {
        for (let lane of data.lanes) {
            lane.id = lane.id.toString();
            for (let card of lane.cards) {
                card.id = card.id.toString();
            }
        }
    }, []);

    const getLanesByMember = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/projects/1/members/11/lanes");
        const body = await response.json();
        lineIdsToString(body);
        setKanbanData({ lanes: [...body.lanes]});
    }

    const addLane = async (data: any) => {
        const res = await fetch(`http://127.0.0.1:8000/api/projects/1/lanes`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            });
        const body = await res.json();
        lineIdsToString(body);
        setKanbanData({ lanes: [...body.lanes]});
    }
    useEffect(() => {
        getLanesByMember();

    }, [])

    // card or line text update commit

    const onDataChange = (newData: any) => {
        console.log("data change");
        console.log(newData);
        console.log(kanbanData);

        if(!_.isEqual(newData, kanbanData)) {
            console.log("d");
            //TODO: send request to server for rename card
        }
    }

    const onCardAdd = (card: any, laneId: any) => {
        console.log("onCardAdd")
        console.log(card, laneId);

        setIsDataChangeHandled(true);
    }
    const onCardDelete = (cardId: any, laneId: any) => {
        console.log("onCardDelete")
        console.log(cardId, laneId);

    }
    const onCardMoveAcrossLanes = (fromLaneId: any, toLaneId: any, cardId: any, index: any) => {
        console.log("onCardMoveAcrossLanes")
        console.log(fromLaneId, toLaneId, cardId, index);

    }

    const onLaneAdd = (params: any) => {
        console.log("onLaneAdd");
        console.log(params);
        addLane({ ...params, employee_id: 11});

    }

    const onLaneDelete = (laneId: any) => {
        console.log("onLaneDelete")
        console.log(laneId);


    }

    const onLaneUpdate = (laneId: any, data: any) => {
        console.log("onLaneUpdate")
        console.log(laneId, data);

    }

    // style={{width: '1000px', height: "800px", overflow: "auto", overflowX: "auto"}}
    return (
        <div className={'kanban-wrapper'}>
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


            />
        </div>
    );
};

export default Kanban;