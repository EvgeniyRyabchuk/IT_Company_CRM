import React, {useState} from 'react';
import {SimpleFormStatus} from "../../../types/global";
import ContactUsForm from "../../../components/forms/TwoColContactUsWithIllustrationFullForm";
import {Box} from "@mui/material";
import ContactSuccess from "../../../components/statusCards/contactUs/ContactSuccess";

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
                <Box sx={{ padding: '200px 50px',
                    maxWidth: '1280px',
                    margin: '0 auto'}}>
                    <ContactSuccess />
                </Box>
            }

            {/*

      <ContactDetails
        cards={[
          {
            title: "New York",
            description: (
              <>
                <Address>
                  <AddressLine>40 Gates Court</AddressLine>
                  <AddressLine>Endicott, NY 13760</AddressLine>
                </Address>
                <Email>contact@treact.com</Email>
                <Phone>+1 (203) 991-6988</Phone>
              </>
            )
          },
          {
            title: "Illinois",
            description: (
              <>
                <Address>
                  <AddressLine>602 Annadale Drive</AddressLine>
                  <AddressLine>Dekalb, IL 60115</AddressLine>
                </Address>
                <Email>contact@treact.com</Email>
                <Phone>+1 (203) 991-6988</Phone>
              </>
            )
          },
          {
            title: "California",
            description: (
              <>
                <Address>
                  <AddressLine>96 NE. Delaware Lane</AddressLine>
                  <AddressLine>Sacramento, CA 95820</AddressLine>
                </Address>
                <Email>contact@treact.com</Email>
                <Phone>+1 (203) 991-6988</Phone>
              </>
            )
          },
          {
            title: "Tennessee",
            description: (
              <>
                <Address>
                  <AddressLine>74 Peachtree Ave.</AddressLine>
                  <AddressLine>Dyersburg, TN 38024</AddressLine>
                </Address>
                <Email>contact@treact.com</Email>
                <Phone>+1 (203) 991-6988</Phone>
              </>
            )
          },
          {
            title: "New Jersey",
            description: (
              <>
                <Address>
                  <AddressLine>8355 Summer Street</AddressLine>
                  <AddressLine>Manchester, NJ 08759</AddressLine>
                </Address>
                <Email>contact@treact.com</Email>
                <Phone>+1 (203) 991-6988</Phone>
              </>
            )
          },
          {
            title: "Ohio",
            description: (
              <>
                <Address>
                  <AddressLine>7713 Snake Hill Ave.</AddressLine>
                  <AddressLine>Piqua, OH 45356</AddressLine>
                </Address>
                <Email>contact@treact.com</Email>
                <Phone>+1 (203) 991-6988</Phone>
              </>
            )
          }
        ]}
      />
      */}


        </>
    );
};

export default MakeAnOrderPage;