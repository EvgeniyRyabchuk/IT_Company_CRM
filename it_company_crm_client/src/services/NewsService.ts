import $api from "../http";
import {AxiosResponse} from "axios";
import {News} from "../types/news";
import {PaginatedResponse} from "../types/global";


export class NewsService {


    static async getNews(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<News>>> {
        return $api.get<PaginatedResponse<News>>
            (`/news${queryParams ?? ''}`);
    }

    static async createNews(payload: News)
        : Promise<AxiosResponse<News>> {
        return $api.post<News>(`/news`, {
            ...payload
        });
    }

    static async updateNews(newsId: number, newVacancy: News):
        Promise<AxiosResponse<News>> {
        return $api.put<News>(`/news/${newsId}`,
            { ...newVacancy});
    }

    static async deleteNews(newsId: number):
        Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/news/${newsId}`);
    }



}


