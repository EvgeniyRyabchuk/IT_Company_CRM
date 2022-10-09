import $api from "../http";
import {AxiosResponse} from "axios";
import {DashBoardAnalytic} from "../types/statistics";
import {TimeRange} from "../pages/dashboard/Analytics";


export class DashboardService {

    static async analytics(timeRange?: TimeRange | null |undefined):
        Promise<AxiosResponse<DashBoardAnalytic>> {

        const url =
            `/dashboard/analytics${timeRange 
                ? `?lastOrdersDateRangeType=${timeRange.value}` 
                : ''}`;

        return $api.get<DashBoardAnalytic>(url);
    }




}