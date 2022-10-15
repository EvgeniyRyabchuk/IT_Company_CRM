import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import { SectionDescription } from "../../components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "../../components/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../assets/images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../assets/images/svg-decorator-blob-8.svg";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;



const FAQS = ({
  subheading = "FAQS",
  heading = "You have Questions ?",
  description = "And we have got answers to all of them. Answers to standard questions that are often asked by clients when contacting the company for the first time.",
  faqs = [
    {
      question: "Do you work with a contract ?",
      answer:
        "Of course, we work officially. Before the start of work, we sign the contract and the technical task related to it in two copies. The documents have full legal validity.."
    },
    {
      question: "Do you provide a service guarantee? ?",
      answer:
        "So. We provide a month of free technical support and a warranty for the developed product (1 year).\n" +
          "\n" +
          "This period of free support is quite enough to detect possible defects in the process of operation.\n" +
          "\n" +
          "If such defects suddenly appear, we will eliminate them free of charge.\n" +
          "\n" +
          "Also, as part of the support, we advise our customers on additional issues that may arise during the use of the product.."
    },
    {
      question: "What is a domain and hosting? Why are they needed? ?",
      answer:
        "Hosting is a service for providing resources for placing a site on a server that is permanently located on the network. It is needed in order to store files with the site in 24/7 access, manage these files and change their properties. For this, hosting providers install special equipment - control panels.."
    },
    {
      question: "How to order a site? ?",
      answer:
        "You can contact us directly by phone, or write through the feedback form and describe your requirements or wishes. For example, in the application you can answer the following questions:\n" +
          "\n" +
          "What do you do (what goods, services do you sell)?\n" +
          "Why do you need a site/logo/naming/advertising (what do you need to convey to visitors)?\n" +
          "What do you have (logo, corporate style, photos, texts for the site, etc.)?\n" +
          "How quickly would you like to receive the finished product?\n" +
          "We will call you back in 30 seconds and discuss the details of the project in detail."
    }
  ],
  ...props

}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <Container {...props}>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
          </HeaderContent>
          <FAQSContainer>
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="group"
              >
                <Question>
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {faq.answer}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>

        <DecoratorBlob1/>
        <DecoratorBlob2 />

    </Container>
  );
};

export default FAQS;