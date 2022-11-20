import React, {useState} from 'react';
import {SimpleFormStatus} from "../../../types/global";
import ContactUsForm from "../../../components/forms/TwoColContactUsWithIllustrationFullForm";
import {Box, styled} from "@mui/material";
import ContactSuccess from "../../../components/statusCards/contactUs/ContactSuccess";


//@ts-ignore
const Wrapper = styled(Box)(() => ({
    padding: '200px 50px',
    maxWidth: '1280px',
    margin: '0 auto'
}))

const MakeAnOrderPage = () => {

    const [status, setStatus] = useState<SimpleFormStatus>(SimpleFormStatus.PENDING);

    return (
        <>
            {
                status === SimpleFormStatus.PENDING &&
                <ContactUsForm setStatus={setStatus} />
            }
            {
                status === SimpleFormStatus.SUCCESS &&
                <Wrapper>
                    <ContactSuccess />
                </Wrapper>
            }
        </>
    );
};

export default MakeAnOrderPage;