import $api from "../http";
import {AxiosResponse} from "axios";
import {DashBoardAnalytic, StatisticResponse} from "../types/statistics";
import {TimeRange} from "../pages/dashboard/Analytics";


export class StatiscticService {

    static async index(): Promise<AxiosResponse<StatisticResponse>> {
        const url = `/statistic`;
        return $api.get<StatisticResponse>(url);
    }




}