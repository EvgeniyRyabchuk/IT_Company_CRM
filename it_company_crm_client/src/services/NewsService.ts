import $api from "../http";
import {AxiosResponse} from "axios";
import {News} from "../types/news";


export class NewsService {


    static async getNews(queryParams?: string):
        Promise<AxiosResponse<News[]>> {
        return $api.get<News[]>(`/news${queryParams ?? ''}`);
    }

    static async createNews(payload: News)
        : Promise<AxiosResponse<News>> {
        return $api.post<News>(`/news`, {
            ...payload
        });
    }


    static async updateNews(vacancyId: number, newVacancy: News):
        Promise<AxiosResponse<News>> {
        return $api.put<News>(`/news/${vacancyId}`,
            { ...newVacancy});
    }

    static async deleteNews(vacancyId: number):
        Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/news/${vacancyId}`);
    }



}


