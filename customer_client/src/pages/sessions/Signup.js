import React, {useMemo} from "react";
import {Container as ContainerBase} from "../../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "../../assets/images/server-illustration-2.svg";
import googleIconImageSrc from "../../assets/images/google-icon.png";
import {ReactComponent as SignUpIcon} from "feather-icons/dist/icons/user-plus.svg";
import Icon from '../../assets/logos/logo_64_64.png';
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {Formik} from "formik";
import {Box, TextField} from "@mui/material";
import PhoneInputField from "../../components/PhoneInputField/PhoneInputField";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16
 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`  p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold !bg-primary-500 text-gray-100
   w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex 
   items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('first_name is required!'),
  last_name: Yup.string().required('last_name is required!'),
  middle_name: Yup.string().required('middle_name is required!'),

  email: Yup.string().required('Email is required!'),
  phone: Yup.object().shape({
    number: Yup.string().required('phone is required!'),
    countryData: Yup.object(),
  }),

  password: Yup.string().required('password is required!'),
  password_repetition: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null],
      'Passwords must match')
});


export default ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Sign up in DEV.WEEK",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign UpIcon With Google",
      url: "https://google.com"
    },
  ],
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "#"
}) => {

  const navigate = useNavigate();

  const { register, profile } = useAuth();

  const defInitialValues = useMemo(() => {
      return {
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone: {
          number: '',
          countryData: {
            countryCode: "",
            dialCode: "",
            format: "",
            name: "",
          },
        },
        password: '',
        password_repetition: '',
      }
    }, []);

  const submit = async (values) => {
    console.log(values)
    await register(values);
    navigate('/profile');
  }

  return (
      <>
        <Container>
          <Content>
            <MainContainer>
              <LogoLink href={logoLinkUrl}>
                <LogoImage src={Icon}/>
              </LogoLink>
              <MainContent>
                <Heading>{headingText}</Heading>
                <FormContainer>
                  <SocialButtonsContainer>
                    {socialButtons.map((socialButton, index) => (
                        <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img src={socialButton.iconImageSrc} className="icon" alt=""/>
                    </span>
                          <span className="text">{socialButton.text}</span>
                        </SocialButton>
                    ))}
                  </SocialButtonsContainer>
                  <DividerTextContainer>
                    <DividerText>Or Sign up with your e-mail</DividerText>
                  </DividerTextContainer>

                  <Formik
                      onSubmit={submit}
                      initialValues={defInitialValues}
                      validationSchema={validationSchema}
                  >
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isValid,
                      }) => (
                        <Form onSubmit={handleSubmit}>

                          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            {/* sx={{ width: '200px'}} */}

                            <TextField
                                sx={{ m: 1, minWidth: '170px', flexGrow: 1}}
                                size='small'
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"

                                name="last_name"
                                value={values.last_name}
                                onChange={handleChange}
                                helperText={touched.last_name && errors.last_name}
                                error={Boolean(errors.last_name && touched.last_name)}
                            />

                            <TextField
                                sx={{ m: 1,  minWidth: '170px', flexGrow: 1}}
                                size='small'
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"

                                name="first_name"
                                value={values.first_name}
                                onChange={handleChange}
                                helperText={touched.first_name && errors.first_name}
                                error={Boolean(errors.first_name && touched.first_name)}
                            />

                            <TextField
                                sx={{ m: 1,  minWidth: '170px', flexGrow: 1}}
                                size='small'
                                id="outlined-basic"
                                label="Middle Name"
                                variant="outlined"

                                name="middle_name"
                                value={values.middle_name}
                                onChange={handleChange}
                                helperText={touched.middle_name && errors.middle_name}
                                error={Boolean(errors.middle_name && touched.middle_name)}
                            />

                          </Box>

                          <Box sx={{ my: 3, display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
                            <Box sx={{ flexGrow: 1, width: '50%', minWidth: '300px', px: 1}}>
                              <Box sx={{ margin: '0 auto'}}>
                                <label htmlFor='email' >Email</label>
                                <TextField
                                    fullWidth
                                    sx={{
                                      display: 'block',
                                      "& > div": {
                                        height: '47px'
                                      },
                                      "& input": {
                                        padding: '10.5px 14px'
                                      }
                                    }}
                                    size='small'
                                    variant="outlined"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    helperText={touched.email && errors.email}
                                    error={Boolean(errors.email && touched.email)}
                                />
                              </Box>
                            </Box>

                            <Box sx={{ flexGrow: 1, minWidth: '300px', px: 1}}>
                              <Box sx={{ margin: '0 auto', width: '300px'}}>
                                <label htmlFor='phone' >Phone</label>
                                <PhoneInputField
                                    id="phone"
                                    style={{color: 'black'}}
                                    name="phone.number"
                                    value={values.phone.number}
                                    onChange={(data) => {
                                      setFieldValue('phone', data);
                                    }}
                                    touched={touched.phone}
                                    error={errors.phone}
                                />
                              </Box>
                            </Box>
                          </Box>

                          <Box sx={{ margin: '0 auto'}}>
                            <label htmlFor='email' >Password</label>

                            <TextField
                                fullWidth
                                sx={{ m: 1,  minWidth: '170px', flexGrow: 1}}
                                size='medium'
                                id="outlined-basic"
                                variant="outlined"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                helperText={touched.password && errors.password}
                                error={Boolean(errors.password && touched.password)}
                            />

                          </Box>

                          <Box sx={{ margin: '0 auto'}}>
                            <label htmlFor='email' >Password Confirm</label>
                            <TextField
                                fullWidth
                                sx={{ m: 1,  minWidth: '170px', flexGrow: 1}}
                                size='medium'
                                id="outlined-basic"
                                variant="outlined"

                                type="password"
                                placeholder="Password Repetition"

                                name="password_repetition"
                                value={values.password_repetition}
                                onChange={handleChange}
                                helperText={touched.password_repetition && errors.password_repetition}
                                error={Boolean(errors.password_repetition && touched.password_repetition)}
                            />
                          </Box>

                          <SubmitButton type="submit">
                            <SubmitButtonIcon className="icon"/>
                            <span className="text">{submitButtonText}</span>
                          </SubmitButton>
                          <p tw="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by treact's{" "}
                            <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                              Terms of Service
                            </a>{" "}
                            and its{" "}
                            <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                              Privacy Policy
                            </a>
                          </p>

                          <p tw="mt-8 text-sm text-gray-600 text-center">
                            Already have an account?{" "}
                            <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                              Sign In
                            </a>
                          </p>
                        </Form>
                    )}
                  </Formik>
                </FormContainer>
              </MainContent>
            </MainContainer>
          </Content>
        </Container>

      </>
  );
};




