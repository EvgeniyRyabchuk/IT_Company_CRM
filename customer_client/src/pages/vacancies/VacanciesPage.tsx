import React, {useState} from 'react';
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import SimpleWithSideImage from "../../components/faqs/SimpleWithSideImage";
import SimpleContactUs from "../../components/forms/SimpleContactUs";
import {SimpleFormStatus} from "../../types/global";
import ContactUsForm from "../../components/forms/TwoColContactUsWithIllustrationFullForm";
import {Box} from "@mui/material";
import ContactSuccess from "../../components/statusCards/contactUs/ContactSuccess";
import JobApplicationSentSuccess from "../../components/statusCards/vacancy/JobApplicationSentSuccess";


const IndexPage = () => {

    const [status, setStatus] = useState<SimpleFormStatus>(SimpleFormStatus.PENDING);


    return (
        <>
            {
                status === SimpleFormStatus.PENDING &&
                <AnimationRevealPage>
                    <SimpleWithSideImage/>
                    <SimpleContactUs setStatus={setStatus} />
                </AnimationRevealPage>
            }
            {
                status === SimpleFormStatus.SUCCESS &&
                <Box sx={{ padding: '50px', marginBottom: '100px'}}>
                    <JobApplicationSentSuccess />
                </Box>
            }

        </>
    );
};

export default IndexPage;