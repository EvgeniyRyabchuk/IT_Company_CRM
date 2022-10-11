import React, {useEffect, useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "./misc/Headings.js";
import { SectionDescription } from "./misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "./misc/Buttons.js";
import { Container as ContainerBase, ContentWithPaddingXl as ContentBase } from "./misc/Layouts.js";
// @ts-ignore
import { ReactComponent as CheckboxIcon } from "../assets/images/checkbox-circle.svg";
import {ProjectService} from "../services/ProjectService";
import {Box, Divider, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const Container = tw(ContainerBase)`bg-primary-900 text-gray-100 -mx-8 px-8`;
const ContentWithPaddingXl = tw(
    ContentBase
)`relative z-10 mx-auto px-0 py-10 sm:px-6 md:px-8 lg:px-12
 xl:px-24 sm:py-20 flex flex-col max-w-screen-xl`;
const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4 text-gray-100`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-gray-300 text-center`;

const PlansContainer = tw.div`mt-16 flex flex-col
    flex-wrap
 items-center
 lg:flex-row lg:items-stretch 
 lg:justify-between text-gray-900 font-medium 

 `;

const Plan = styled.div`
  ${tw`w-full max-w-xs bg-white rounded-lg shadow-sm py-10
   px-6 sm:px-10 lg:px-6 lg:py-10 xl:p-10 mx-3 
   flex flex-col justify-between mt-16 first:mt-0
    lg:mt-0 shadow-raised my-5`}
`;

const PlanHeader = styled.div`
  .nameAndFeaturedContainer {
    ${tw`flex flex-wrap flex-col sm:flex-row justify-between items-center`}
  }
  .name {
    ${tw`lg:text-lg xl:text-xl font-bold uppercase tracking-wider mr-3`}
  }
  .featuredText {
    ${tw`text-xs font-bold px-3 rounded py-2 uppercase bg-green-300 text-green-900 leading-none mt-4 sm:mt-0 w-full sm:w-auto text-center`}
  }
  .pricingContainer {
    ${tw`mt-6 flex items-end justify-between`}
    .currentPrice {
      ${tw`text-lg font-bold leading-none`}
      .bigText {
        ${tw`text-3xl font-bold`}
      }
    }
    .oldPrice {
      ${tw`text-gray-500 text-lg line-through hidden sm:block`}
    }
  }
  .description {
    ${tw`mt-8 font-medium text-gray-700 lg:text-sm xl:text-base`}
  }
`;
const PlanFeatures = styled.ul`
  ${tw`mt-10 flex-1 border-t lg:-mx-6 -mx-6 sm:-mx-10 py-10 px-6 sm:px-10 lg:p-6 xl:-mx-10 xl:p-10`}
  .feature {
    ${tw`flex items-start mt-6 first:mt-0`}
    .icon {
      ${tw`w-6 h-6 text-primary-500 flex-shrink-0`}
    }
    .text {
      ${tw`font-semibold text-primary-900 tracking-wide ml-3`}
    }
  }
`;

const PlanAction = tw.div`mt-4`;
const ActionButton = styled(PrimaryButtonBase)`
  ${tw`block text-center text-sm font-semibold tracking-wider w-full text-gray-100 bg-primary-500 px-6 py-4 rounded hover:bg-primary-700 focus:shadow-outline focus:outline-none transition-colors duration-300`}
`;

//  const defaultPlans = [
//     {
//         name: "Personal",
//         price: ["$9", ".99/month"],
//         oldPrice: "$11.99",
//         description: "Perfect for when you want to host your personal blog or a hobby side project.",
//         features: ["1"],
//         url: "https://google.com"
//     },
//     {
//         name: "Business",
//         price: ["$15", ".99/month"],
//         oldPrice: "$19.99",
//         description: "Perfect for hosting blogs with lots of traffic or heavy development projects",
//         features: ["1"],
//         url: "https://google.com",
//         featured: "Most Popular"
//     },
//     {
//         name: "Enterprise",
//         price: ["$25", ".99/month"],
//         oldPrice: "$29.99",
//         description: "Perfect for hosting production websites & API services with high traffic load",
//         features: ["1"],
//         url: "https://google.com"
//     }
// ];
//
// // ts-ignore
// if (!plans) plans = defaultPlans;

const WhiteBackgroundOverlay = tw.div`absolute inset-x-0 bottom-0 h-1/6 lg:h-1/3 bg-white z-0`;

 const Pricing = ({
    subheading = "",
    heading = "Affordable Pricing",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    plans = null,
    primaryButtonText = "Make An Order",
     id,
    ...props
}) => {

     const [projectTypesPlans, setProjectTypesPlans] = useState([]);

     const navigate = useNavigate();

     const [open, setOpen] = useState(false);

     useEffect(() => {
        const fetchProjectTypes = async () => {
            const { data } = await ProjectService.getProjectTypes();
            setProjectTypesPlans(data);
        }
         fetchProjectTypes();
     }, []);




     const scrollToElement = () => {
         setTimeout(() => {
             const element = document.getElementById(id);
             if (element && open) {
                 element.scrollIntoView();
             }
         }, 0)
     }

    return (
        <Box
            id={id}
            style={{
                height: open ? 'auto' : '930px',
                overflow: 'hidden',
                position: 'relative'
            }}>
            <Container >
                <ContentWithPaddingXl>
                    <HeaderContainer>
                        {subheading && <Subheading>{subheading}</Subheading>}
                        <Heading style={{ color: 'white'}}>{heading}</Heading>
                        {description && <Description>{description}</Description>}
                    </HeaderContainer>
                    <PlansContainer >

                        {projectTypesPlans.map((plan) => (
                            <Plan key={plan.id}
                                  featured={['1']}>
                                <PlanHeader>
                                    <span className="nameAndFeaturedContainer">
                                      <span className="name">{plan.name}</span>
                                        {['1'] && <span className="featuredText">{['1']}</span>}
                                    </span>
                                    <div className="pricingContainer">
                                      <span className="currentPrice">
                                        {/*<span className="bigText">{plan.price[0]}</span>*/}
                                          {'$'}{plan.fromPrice}{" "}
                                            <Divider sx={{ my: 3}} />
                                          {' Development time from: '}
                                          <br/>
                                          {plan.fromTerm} {" "}
                                          {plan.fromTermType}
                                      </span>
                                        {/*{plan.oldPrice && <span className="oldPrice">{plan.oldPrice}</span>}*/}
                                    </div>
                                    <p className="description">{plan.description}</p>
                                </PlanHeader>
                                {/*<PlanFeatures>*/}
                                {/*    {plan.features.map((feature, index) => (*/}
                                {/*        <li className="feature" key={index}>*/}
                                {/*            <CheckboxIcon className="icon" />*/}
                                {/*            <span className="text">{feature}</span>*/}
                                {/*        </li>*/}
                                {/*    ))}*/}
                                {/*</PlanFeatures>*/}
                                <PlanAction>
                                    <ActionButton
                                        as="a"
                                        href='/make-an-order'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/make-an-order`)
                                        }}
                                    >
                                        {primaryButtonText}
                                    </ActionButton>
                                </PlanAction>
                            </Plan>
                        ))}
                    </PlansContainer>
                </ContentWithPaddingXl>
                {/*<WhiteBackgroundOverlay />*/}
            </Container>
            <Box sx={{
                width: '100%',
                height: '80px',
                opacity: '0.8',
                backgroundColor: 'black',
                position: open ? 'static' : 'absolute',
                top: 850,
                color: 'white',
                py: 3,
                zIndex: 99
            }}>
                <Typography
                    onClick={() => {
                        setOpen(!open);
                        scrollToElement();
                    }}
                    variant='span'
                            sx={{
                                fontSize: '25px',
                                cursor: 'pointer',
                                "&:hover": {
                                    // opacity: '1',
                                    color: 'yellow'
                            }
                            }}>

                    { open ?  'Hide' : 'Show More' }
                    { open ? <ArrowUpward /> :  <ArrowDownward /> }
                </Typography>
            </Box>
        </Box>

    );
};

export default Pricing;
