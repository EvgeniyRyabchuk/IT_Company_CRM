import React, {useEffect, useState} from 'react';
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import SimpleWithSideImage from "../../components/faqs/SimpleWithSideImage";
import SimpleContactUs from "../../components/forms/SimpleContactUs";
import {SimpleFormStatus} from "../../types/global";
import {Box} from "@mui/material";
import JobApplicationSentSuccess from "../../components/statusCards/vacancy/JobApplicationSentSuccess";
import {VacancyService} from "../../services/VacancyService";
import {Vacancy} from "../../types/employeement";


const IndexPage = () => {

    const [status, setStatus] = useState<SimpleFormStatus>(SimpleFormStatus.PENDING);

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    useEffect(() => {

        const fetchVacancies = async () => {
            const { data } = await VacancyService.getVacancies();
            setVacancies(data);
        }
        fetchVacancies();
    }, [])

    return (
        <>
            {
                status === SimpleFormStatus.PENDING &&
                <AnimationRevealPage>
                    <SimpleWithSideImage vacancies={vacancies} />
                    <SimpleContactUs vacancies={vacancies} setStatus={setStatus} />
                </AnimationRevealPage>
            }
            {
                status === SimpleFormStatus.SUCCESS &&
                <Box sx={{ padding: '200px 50px',
                    maxWidth: '1280px',
                    margin: '0 auto'}}>
                    <JobApplicationSentSuccess />
                </Box>
            }

        </>
    );
};

export default IndexPage;