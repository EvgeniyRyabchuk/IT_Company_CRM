import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {JobApplication, JobApplicationStatus} from "../types/employeement";
import {PrimaryErrorAlert, PrimarySuccessAlert, showAxiosErrorAlert, showAxiosSuccessAlert} from "../utils/alert";

interface JobApplicationMinMax {
    minMaxCreatedAtRange: string[];
}


export class JobApplicationService {

    static async getJobApplications(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<JobApplication>>> {
        return $api.get<PaginatedResponse<JobApplication>>(
            `/job-applications${queryParams ?? ''}`);
    }


    static async updateJobApplications(jobApplicationId: number, newJobApplication: any):
        Promise<AxiosResponse<JobApplication>> {
        try {
            const response = await $api.put<JobApplication>(`/job-applications/${jobApplicationId}`,
                { ...newJobApplication});
            showAxiosSuccessAlert(PrimarySuccessAlert.UPDATED_JOB_APPLICATION);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.UPDATED_JOB_APPLICATION}, err);
            throw err;
        }

    }

    static async deleteJobApplication(jobApplicationId: number): Promise<AxiosResponse<string>> {
        try {
            const response = await $api.delete<string>(`/job-applications/${jobApplicationId}`);
            showAxiosSuccessAlert(PrimarySuccessAlert.DELETED_JOB_APPLICATION);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.DELETED_JOB_APPLICATION}, err);
            throw err;
        }
    }

    static async getJobApplicationStatuses():
        Promise<AxiosResponse<JobApplicationStatus[]>> {
        return $api.get<JobApplicationStatus[]>(`/job-applications/statuses`);
    }


    //
    // static async getProjectRoles():
    //     Promise<AxiosResponse<ProjectRole[]>> {
    //     return $api.get<ProjectType[]>(`/job-applications/roles`);
    // }
    //
    // static async getMinMaxValues():
    //     Promise<AxiosResponse<VacancyMinMax>> {
    //     return $api.get<VacancyMinMax>(`/job-applications/min-max`);
    // }

    static async getMinMaxValues():
        Promise<AxiosResponse<JobApplicationMinMax>> {
        return $api.get<JobApplicationMinMax>(`/job-applications/min-max`);
    }


}

