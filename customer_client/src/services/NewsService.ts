import $api from "../http";
import {AxiosResponse} from "axios";
import {News} from "../types/news";
import {PaginatedResponse} from "../types/global";
import {toast} from "react-toastify";
import {
    PrimaryErrorAlert,
    PrimarySuccessAlert,
    PromiseAlert,
    showAxiosErrorAlert,
    showAxiosSuccessAlert
} from "../utils/alert";


/*

       try {
          const response = await $api.get<PaginatedResponse<News>>
              (`/news${queryParams ?? ''}`);
         showAxiosSuccessAlert(PrimarySuccessAlert.CREATED_NEWS);
          return response;
      }
      catch (err) {
          showAxiosErrorAlert({ primary: PrimaryErrorAlert.DELETED_NEWS}, err);
          throw err;
      }

*/

export class NewsService {

    static async getNews(queryParams?: string, isFetchAlertShow = false):
        Promise<AxiosResponse<PaginatedResponse<News>>> {

        const promise = $api.get<PaginatedResponse<News>>(`/news${queryParams ?? ''}`);
        if(isFetchAlertShow) {
            toast.promise(promise,
                {
                    pending: PromiseAlert.FETCH_NEWS_PENDING,
                    success: PromiseAlert.FETCH_NEWS_SUCCESS,
                    error: PromiseAlert.FETCH_NEWS_ERROR
                }
            )
        }
        return promise;
    }

    static async createNews(payload: News): Promise<AxiosResponse<News>> {
        try {
            const response = await $api.post<News>(`/news`, {
                ...payload
            });
            showAxiosSuccessAlert(PrimarySuccessAlert.CREATED_NEWS);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.CREATED_NEWS}, err);
            throw err;
        }
    }

    static async updateNews(newsId: number, newVacancy: News): Promise<AxiosResponse<News>> {
        try {
            const response = await $api.put<News>(`/news/${newsId}`,
                { ...newVacancy});
            showAxiosSuccessAlert(PrimarySuccessAlert.UPDATED_NEWS);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.UPDATED_NEWS}, err);
            throw err;
        }
    }

    static async deleteNews(newsId: number): Promise<AxiosResponse<string>> {
        try {
            const response = await $api.delete<string>(`/news/${newsId}`);
            showAxiosSuccessAlert(PrimarySuccessAlert.DELETED_NEWS);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.DELETED_NEWS}, err);
            throw err;
        }
    }

}


