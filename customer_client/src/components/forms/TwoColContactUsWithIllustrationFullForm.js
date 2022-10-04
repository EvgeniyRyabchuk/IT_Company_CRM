import React, {useEffect, useMemo, useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../../components/misc/Buttons.js";
import EmailIllustrationSrc from "../../assets/images/email-illustration.svg";
import FileUploader from "../FileUploader";
import {ProjectService} from "../../services/ProjectService";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import * as Yup from "yup";
import {Formik, FormikProps, FormikValues} from 'formik';
import PhoneInputField from "../PhoneInputField/PhoneInputField";

const Container = tw.div`relative`;

const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-10 md:py-10`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-500`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col mx-auto md:mx-0 max-w-xl`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// require('yup-phone');

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required!'),
  email: Yup.string().required('Deadline is required!'),
  phone: Yup.string().required('Phone number is require'),
  about:  Yup.string().required('Deadline is required!'),
  type_id: Yup.number().required('Project Type is required!'),
});


const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

 const TwoColContactUsWithIllustrationFullForm = ({
  subheading = "Contact Us",
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  submitButtonText = "Send",
  textOnLeft = true,
  setStatus
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  const [files, setFiles] = useState(null);

  const updateUploadedFiles = (files) => {
    setFiles(files);
  }

  const [projectTypes, setProjectTypes] = useState([]);

  useEffect(() => {
    const getProjectTypes = async () => {
      const { data } = await ProjectService.getProjectTypes();
      setProjectTypes([...data]);
    }
    getProjectTypes();

  }, []);

  const defInitialValues = useMemo(() => {
    return {
      name: 'dssdfg',
      phone: '380242342342',
      email: 'jeka.rubchuk@gmail.com',
      about: 'dsgsdfg',
      type_id: null,
    }
  }, []);



  const handleFormSubmit = (values) => {
    console.log(values)
    console.log(files)
    setStatus(1);
  }

  return (
    <Container>

        <TwoColumn>
          <ImageColumn>
            <Image imageSrc={EmailIllustrationSrc} />
          </ImageColumn>

          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              {description && <Description>{description}</Description>}

              <Formik
                  onSubmit={handleFormSubmit}
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

                    <Form id="inner-form" onSubmit={handleSubmit}>
                      <Input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={values.name}
                          onChange={handleChange}
                          helperText={touched.name && errors.name}
                          error={Boolean(errors.name && touched.name)}
                      />
                      {touched.name && errors.name &&
                          <p style={{color:'red'}}
                             className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">
                            {errors.name}
                          </p>
                      }

                      <Box sx={{ my: 3, display: 'flex', justifyContent: 'center'}}>
                        <Input
                            style={{width: '50%'}}
                            type="email"
                            name="email"
                            placeholder="Your Email Address"
                            value={values.email}
                            onChange={handleChange}
                            helperText={touched.email && errors.email}
                            error={Boolean(errors.email && touched.email)}
                        />
                        {touched.email && errors.email &&
                            <p style={{color:'red'}}
                               className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">
                              {errors.email}
                            </p>
                        }

                        <PhoneInputField
                            style={{color: 'black', width: '50%'}}

                            name="phone"

                            value={values.phone}
                            onChange={(phone) => {
                              setFieldValue('phone', phone);
                            }}

                            touched={touched.phone}
                            error={errors.phone}
                        />

                      </Box>

                      {values.phone}

                      {/*<Input type="text" name="subject" placeholder="Subject" />*/}

                      <Box sx={{ mt: 3}}>
                        <Autocomplete
                            size="small"
                            getOptionLabel={(option) => option.name}
                            disablePortal
                            id="combo-box-types"
                            options={projectTypes}
                            renderInput={
                              (params) =>
                                  <TextField
                                      {...params}
                                      error={
                                        Boolean(touched.type_id && errors.type_id)
                                      }
                                      fullWidth
                                      helperText={
                                          touched.type_id && errors.type_id
                                      }
                                      label="Project Type"
                                      name="type_id"
                                      variant="outlined"
                                  />
                            }
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  {option.name} ({option.id})
                                </Box>
                            )}
                            onChange={ (event, values) => {
                              if(values)
                                setFieldValue("type_id", values.id);
                            }}
                        />

                      </Box>



                      <Textarea
                          name="about"
                          placeholder="Your Message Here"
                          value={values.about}
                          onChange={handleChange}
                          helperText={touched.about && errors.about}
                          error={Boolean(errors.about && touched.about)}
                      />


                      <FileUploader
                          accept="*"
                          // label="Profile Image(s)"
                          // multiple
                          updateFilesCb={updateUploadedFiles}
                      />


                      <Button
                          style={{ height: '50px'}}
                          color='primary'
                          variant='contained'
                          type="submit">
                        Submit
                      </Button>
                    </Form>
                )}
              </Formik>
            </TextContent>
          </TextColumn>
        </TwoColumn>


    </Container>
  );
};

export default TwoColContactUsWithIllustrationFullForm;