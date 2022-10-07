import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {JobApplication, JobApplicationStatus, Vacancy} from "../types/employeement";
import {PrimaryErrorAlert, PrimarySuccessAlert, showAxiosErrorAlert, showAxiosSuccessAlert} from "../utils/alert";

interface JobApplicationMinMax {
    minMaxCreatedAtRange: string[];
}

interface JobApplicationForm {
    name: string,
    email: string,
    vacancy_id: number,
}

export class JobApplicationService {

    static async getJobApplications(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<JobApplication>>> {
        return $api.get<PaginatedResponse<JobApplication>>(
            `/job-applications${queryParams ?? ''}`);
    }

    static async createJobApplications(payload: JobApplicationForm, file: any)
        : Promise<AxiosResponse<JobApplicationForm>> {
        try {
            const response =
                await $api.post<JobApplication>(`/job-applications`, {
                ...payload,
                resume_path: file
            },{headers: { 'Content-Type': 'multipart/form-data' }});

            showAxiosSuccessAlert(PrimarySuccessAlert.CREATED_VACANCY);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.CREATED_VACANCY}, err);
            throw err;
        }
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

