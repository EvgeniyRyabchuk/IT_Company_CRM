import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {JobApplication, JobApplicationStatus} from "../types/employeement";

interface JobApplicationMinMax {
    minMaxCreatedAtRange: string[];
}


export class JobApplicationService {

    static async getJobApplications(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<JobApplication>>> {
        return $api.get<PaginatedResponse<JobApplication>>(`/job-applications${queryParams ?? ''}`);
    }


    static async updateJobApplications(projectId: number, newProject: any):
        Promise<AxiosResponse<JobApplication>> {
        return $api.put<JobApplication>(`/job-applications/${projectId}`, { ...newProject});
    }

    static async deleteJobApplication(projectId: number): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/job-applications/${projectId}`);
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

