import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import {SectionHeading} from "./misc/Headings.js";
// @ts-ignore
import defaultCardImage from '../assets/images/shield-icon.svg';
// @ts-ignore
import { ReactComponent as SvgDecoratorBlob3 } from "../assets/images/svg-decorator-blob-3.svg";
// @ts-ignore
import SupportIconImage from "../assets/images/support-icon.svg";
// @ts-ignore
import ShieldIconImage from "../assets/images/shield-icon.svg";
// @ts-ignore
import CustomizeIconImage from "../assets/images/customize-icon.svg";
// @ts-ignore
import FastIconImage from "../assets/images/fast-icon.svg";
// @ts-ignore
import ReliableIconImage from "../assets/images/reliable-icon.svg";
// @ts-ignore
import SimpleIconImage from "../assets/images/simple-icon.svg";
import exp from "constants";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

const Services : React.FC<any> = ({ ...props}) => {
    /*
     * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component):
     *  1) imageSrc - the image shown at the top of the card
     *  2) title - the title of the card
     *  3) description - the description of the card
     *  If a key for a particular card is not provided, a default value is used
     */

    const cards = [
        {
            imageSrc: ShieldIconImage,
            title: "Ads Management",
            description: "We create and manage ads that you need, from creation to deployment. Lorem ipsum donor sit amet consicou."

        },
        {
            imageSrc: SupportIconImage,
            title: "Understandable Development",
            description: 'The project manager is always available. He will answer even difficult questions in simple human language.'
        },
        {
            imageSrc: CustomizeIconImage,
            title: "Compilation of TA",
            description: 'Listening to your wishes, we ask additional questions, express our vision and record the summary of the conversation in a technical task.'

        },
        {
            imageSrc: ReliableIconImage,
            title: "Demonstration and adjustment",
            description: 'Demonstration of the first sketches and "skeleton", receiving edits and comments from the client, further refinement.'

        },
        {
            imageSrc: FastIconImage,
            title: "Experts Team",
            description: 'We have a large team consisting of experienced specialists who will calculate the psychology of your potential client.'

        },
        {
            imageSrc: SimpleIconImage,
            title: "Contact us",
            description: 'You contact us by phone or leave a request, after which we call you back in 30 seconds to discuss the project.'
        }
    ];

    return (
        <Container {...props}>
            <ThreeColumnContainer>
                <Heading>Our Professional <span tw="text-primary-500">Services</span></Heading>
                {cards.map((card, i) => (
                    <Column key={i}>
                        <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
                            <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p>
              </span>
                        </Card>
                    </Column>
                ))}
            </ThreeColumnContainer>
            <DecoratorBlob />
        </Container>
    );
};

export default Services;