import React, {useMemo, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../assets/images/dot-pattern.svg"
import FileUploader from "../FileUploader";
import PhoneInput from "../PhoneInputField/PhoneInputField";
import PhoneInputField from "../PhoneInputField/PhoneInputField";
import {OrderService} from "../../services/OrderService";
import {VacancyService} from "../../services/VacancyService";
import {Formik} from "formik";
import * as Yup from "yup";
import {Autocomplete, Box, Stack, TextField} from "@mui/material";
import {JobApplicationService} from "../../services/JobApplicationService";
import {showAxiosErrorAlert} from "../../utils/alert";


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-5 lg:py-5`;

const FormContainer = styled.div`
  ${tw`p-10 md:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl md:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col md:flex-row justify-between`;
const Column = tw.div`md:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 md:h-full resize-none`;
const SubmitButton = tw.button`w-full md:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`


/*

const defInitialValues = useMemo(() => {
    return {
      name: 'dssdfg',
      phone:  {
        number: '380984756384',
        countyData: {
          countryCode: "UA",
          dialCode: "380",
          format: "+... (..) ... .. ..",
          name: "Ukraine",
        },
      },
      email: 'jeka.rubchuk@gmail.com',
      message: 'sdfhdfhdfghdfghdfghdfghdfghdfgh',
      vacancy_id: null,
    }
  }, []);

 */

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),

  phone: Yup.object().shape({
    number: Yup.string().required('phone is required!'),
    countryData: Yup.object(),
  }),

  email: Yup.string().required('Email is required!'),
  message: Yup.string().optional(),
  vacancy_id: Yup.number().required('Vacancy Type is required!'),
});

export default ({setStatus, vacancies}) => {

  const [files, setFiles] = useState(null);

  const updateUploadedFiles = (files) => {
    setFiles(files);
  }

  const defInitialValues = useMemo(() => {
    return {
      name: '',
      phone:  {
        number: '',
        countyData: {},
      },
      email: '',
      message: '',
      vacancy_id: null,
    }
  }, []);


  const handleSubmit = async (values) => {
    console.log(values);
    const file = files && files.length > 0 && files[0];
    if(!file) {
      showAxiosErrorAlert({ primary: 'Resume file required'}, null);
    }

    const { data } = await JobApplicationService.createJobApplications(values, file);
    setStatus(1);
  };

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Apply for a Job</h2>

            <Formik
                onSubmit={handleSubmit}
                initialValues={defInitialValues}
                validationSchema={validationSchema}
            >
              {({ values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue
                }) => (
                  <form id="inner-form" onSubmit={handleSubmit}>
                    <TwoColumn>
                      <Column>
                        <InputContainer>
                          <Label htmlFor="name-input">Your Name</Label>
                          <Input id="name-input"
                                 type="text"
                                 name="name"

                                 value={values.name}
                                 onChange={handleChange}
                                 helperText={touched.name && errors.name}
                                 error={Boolean(errors.name && touched.name)}

                                 placeholder="E.g. John Doe"
                          />
                        </InputContainer>
                        <InputContainer tw='mt-20'>
                          <Label htmlFor="email-input">Your Email Address</Label>
                          <Input id="email-input"
                                 type="email"
                                 name="email"

                                 value={values.email}
                                 onChange={handleChange}
                                 helperText={touched.email && errors.email}
                                 error={Boolean(errors.email && touched.email)}

                                 placeholder="E.g. john@mail.com"
                          />
                        </InputContainer>
                      </Column>

                      <Column>
                        <InputContainer tw="flex-1 justify-center mt-0 mb-5">
                          <Label htmlFor="name-input" tw='static'
                                 className='text-center'
                          >Your Phone Number
                          </Label>
                          <PhoneInputField
                              className='vacancy-page-phone'
                              tw="mt-3"
                              style={{color: 'black'}}
                              name="phone"

                              value={values.phone.number}
                              onChange={(phone) => {
                                setFieldValue('phone', phone);
                              }}
                              touched={touched.phone}
                              error={errors.phone}
                          />

                        </InputContainer>

                        <InputContainer tw="flex-1">
                          <Label htmlFor="name-input">Your Message</Label>
                          <TextArea id="message-input"
                                    name="message"
                                    placeholder="E.g. Details about your event"
                                    value={values.message}
                                    onChange={handleChange}
                                    helperText={touched.message && errors.message}
                                    error={Boolean(errors.message && touched.message)}
                          />
                        </InputContainer>
                      </Column>
                    </TwoColumn>

                    <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          my: 3
                      }}>
                      <Autocomplete
                          size="small"
                          getOptionLabel={(option) => option.title}
                          disablePortal
                          id="controllable-states-demo"
                          options={vacancies}
                          sx={{
                            width: 300,
                            mx: 1,
                            backgroundColor: 'white',
                            color: 'black',
                            '& input': { color: 'black' },
                      }}
                          renderInput={
                            (params) =>
                                <TextField
                                    {...params}
                                    error={
                                      Boolean(touched.vacancy_id
                                          && errors.vacancy_id)
                                    }
                                    fullWidth
                                    helperText={
                                        touched.vacancy_id
                                        && errors.vacancy_id
                                    }
                                    label="Vacancy"
                                    name="vacancy_id"
                                    variant="outlined"
                                />
                          }
                          renderOption={(props, option) => (
                              <Box component="li"
                                   sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                   {...props}>
                                {option.title}
                              </Box>
                          )}
                          onChange={ (event, values) => {
                            if(values) {
                              setFieldValue("vacancy_id", values.id);
                            }
                          }}
                      />
                    </Box>



                    <FileUploader
                        accept="*"
                        // label="Profile Image(s)"
                        // multiple
                        updateFilesCb={updateUploadedFiles}
                    />

                    <SubmitButton type="button" value="Submit" onClick={handleSubmit}>
                      Submit
                    </SubmitButton>
                </form>
              )}
            </Formik>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>

    </Container>
  );
};
