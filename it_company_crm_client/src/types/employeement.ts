
export interface Vacancy {
    id: number;
    title: string;
    describe: string;
    required: boolean;
    created_at: string;
}

export interface JobApplication {
    id: number;
    name: string;
    email: string;

    vacancy: Vacancy;
    job_application_status: JobApplicationStatus;
    resume_path: string;

    job_application_status_id: number;
    vacancy_id: number;
    created_at: string;
}

export interface JobApplicationStatus {
    id: number;
    name: string;
    bgColor: string;
}