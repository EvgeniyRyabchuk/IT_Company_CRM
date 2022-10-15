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
import {OrderService} from "../../services/OrderService";
import useAuth from "../../hooks/useAuth";

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
  email: Yup.string().required('Email is required!'),
  phone: Yup.object().shape({
    number: Yup.string().required('phone is required!'),
    countryData: Yup.object(),
  }),

  about:  Yup.string().required('About Project Text is required!'),
  type_id: Yup.number().required('Project Type is required!'),
});


/*

  const defInitialValues = useMemo(() => {
    return {
      name: user ? user.full_name : 'empty',
      phone:  {
        number: '380984756384',
        countyData: {
          countryCode: "UA",
          dialCode: "380",
          format: "+... (..) ... .. ..",
          name: "Ukraine",
        },
      },
      email: user ? user.email : 'empty@gmail.com',
      about: 'empty',
      type_id: null,
    }
  }, []);


 */

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

const TwoColContactUsWithIllustrationFullForm = ({
   subheading = "Contact Us",
   heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
   description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
   submitButtonText = "Send",
   textOnLeft = true,
   setStatus
  }) => {

  const [files, setFiles] = useState(null);

  const updateUploadedFiles = (files) => {
    setFiles(files);
  }

  const { user } = useAuth();

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
      name: user ? user.full_name : '',
      phone:  {
        number: user.phones[0].phone_number,
        countyData: {},
      },
      email: user ? user.email : '',
      about: '',
      type_id: null,
    }
  }, []);



  const handleFormSubmit = async (values) => {
    console.log(values)
    console.log(files)
    const file = files && files.length > 0 && files[0];

    const { data } = await OrderService.createOrder(values, file);

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
                      <Box sx={{
                        opacity: user ? '0.5' : '1',
                        backgroundColor: 'white',
                        pointerEvents: user ? "none" : 'auto'
                      }}>
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

                              value={values.phone.number}
                              onChange={(phone) => {
                                setFieldValue('phone', phone);
                              }}

                              touched={touched.phone}
                              error={errors.phone}
                          />

                        </Box>
                      </Box>
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
