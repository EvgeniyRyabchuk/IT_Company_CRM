import React, {useEffect, useState} from 'react';

import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
// @ts-ignore
import {ReactComponent as PlayIcon} from "feather-icons/dist/icons/play-circle.svg";
// @ts-ignore
import {ReactComponent as CloseIcon} from "feather-icons/dist/icons/x.svg";
// @ts-ignore
import {ReactComponent as SvgDecoratorBlob1} from "../../assets/images/svg-decorator-blob-1.svg";
// @ts-ignore
import {ReactComponent as SvgDecoratorBlob2} from "../../assets/images/dot-pattern.svg";
// @ts-ignore
import DesignIllustration from "../../assets/images/design-illustration.svg";
import Services from "../../components/Services";
import OurTeam from "../../components/cards/ProfileThreeColGrid";
import Pricing from "../../components/Pricing";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import FAQS from "../../components/faqs/SingleCol";
import {useLocation} from "react-router-dom";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const WatchVideoButton = styled.button`
  ${tw`mt-4 sm:mt-0 sm:ml-8 flex items-center text-secondary-300 transition duration-300 hocus:text-primary-400 focus:outline-none`}
  .playIcon {
    ${tw`stroke-1 w-12 h-12`}
  }
  .playText {
    ${tw`ml-2 font-medium`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none fill-current text-primary-500 opacity-25 absolute w-32 h-32 right-0 bottom-0 transform translate-x-10 translate-y-10 -z-10`}
`;

const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;


const IndexPage = () => {

    const heading = "Modern React Templates, Just For You";
    const description="Our templates are easy to setup, understand and customize. Fully modular components with a variety of pages and components.";
    const primaryButtonText="Make an Order";
    const primaryButtonUrl="/contact-us";
    const watchVideoButtonText="Watch Video";
    const watchVideoYoutubeUrl="https://www.youtube.com/embed/_GuOjXYl5ew";
    const imageSrc=DesignIllustration;
    const imageCss=null;
    const imageDecoratorBlob = false;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => setModalIsOpen(!modalIsOpen);


    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // if not a hash link, scroll to top
        if (hash === '') {
            window.scrollTo(0, 0);
        }
        // else scroll to id
        else {
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView();
                }
            }, 0);
        }
    }, [pathname, hash, key]); // do this on route change

    return (
        <>
            <TwoColumn>
                <LeftColumn>
                    <Heading>{heading}</Heading>
                    <Paragraph>{description}</Paragraph>
                    <Actions>

                        <PrimaryButton

                            /*
                            // @ts-ignore */
                            as="a" href={primaryButtonUrl}>
                            {primaryButtonText}
                        </PrimaryButton>
                        {/*<WatchVideoButton onClick={toggleModal}>*/}
                        {/*    <span className="playIconContainer">*/}
                        {/*      <PlayIcon className="playIcon" />*/}
                        {/*    </span>*/}
                        {/*    <span className="playText">{watchVideoButtonText}</span>*/}
                        {/*</WatchVideoButton>*/}
                    </Actions>
                </LeftColumn>
                <RightColumn>
                    <IllustrationContainer>
                        <img
                            src={imageSrc}
                            alt="Hero"
                        />
                        {imageDecoratorBlob && <DecoratorBlob2 />}
                    </IllustrationContainer>
                </RightColumn>
            </TwoColumn>
            <DecoratorBlob1 />
            <StyledModal
                closeTimeoutMS={300}
                className="mainHeroModal"
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                shouldCloseOnOverlayClick={true}
            >
                <CloseModalButton onClick={toggleModal}>
                    <CloseIcon tw="w-6 h-6" />
                </CloseModalButton>
            </StyledModal>
            <Services id='services' />
            <OurTeam id='ourteam'/>

            <Pricing id='pricing' />

            <FAQS id='faqs'/>

        </>

    );
};

export default IndexPage;