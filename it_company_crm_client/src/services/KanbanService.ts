import {AxiosResponse} from "axios";
import $api from "../http";
import {KanbanCard, KanbanLane} from "../types/kanban";

export class KanbanService {

    static async getLanesByMemberId(projectId: number, memberId: number, queryParamString?: string)
        : Promise<AxiosResponse<KanbanLane[]>> {
        return $api.get<KanbanLane[]>(`/projects/${projectId}/members/${memberId}/lanes${queryParamString}`);
    }

    static async addLane(projectId: number, memberId: number, params: any)
        : Promise<AxiosResponse<KanbanLane[]>> {
        return $api.post<KanbanLane[]>(`/projects/${projectId}/lanes`, {
            ...params, employee_id: memberId
        });
    }

    static async updateLane(projectId: number, laneId: number, data: any)
        : Promise<AxiosResponse<any>> {
        return $api.put<any>(`projects/${projectId}/lanes/${laneId}`, { ...data });
    }

    static async moveLane(projectId: number, data: any)
        : Promise<AxiosResponse<any>> {
        return $api.put<any>(`projects/${projectId}/lanes/swap`, { ...data });
    }

    static async deleteLane(projectId: number, laneId: number)
        : Promise<AxiosResponse<any>> {
        return $api.delete<any>(`projects/${projectId}/lanes/${laneId}`);
    }




    static async addCard(projectId: number, laneId: number, card: KanbanCard)
        : Promise<AxiosResponse<KanbanCard>> {
        return $api.post<KanbanCard>(`projects/${projectId}/lanes/${laneId}/cards`, {
            ...card
        });
    }

    static async updateCard(projectId: number, laneId: number, card: KanbanCard)
        : Promise<AxiosResponse<KanbanCard>> {
        return $api.put<KanbanCard>(`projects/${projectId}/lanes/${laneId}/cards/${card.id}`, {
            ...card
        });
    }

    static async moveCard(projectId: number, toLaneId: number, cardId: number, data: any)
        : Promise<AxiosResponse<KanbanLane[]>> {
        return $api.put<KanbanLane[]>(`projects/${projectId}/lanes/${toLaneId}/cards/${cardId}/swap`, {
            ...data
        });
    }

    static async deleteCard(projectId: number, laneId: number, cardId: number)
        : Promise<AxiosResponse<KanbanLane[]>> {
        return $api.delete<KanbanLane[]>(`projects/${projectId}/lanes/${laneId}/cards/${cardId}`);
    }




}