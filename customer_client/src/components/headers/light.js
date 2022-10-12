import React, {useState} from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

// import logos from "../../assets/images/logos.svg";
import logo from "../../assets/logos/logo_64_64.png";

import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
  px-5 py-2 rounded drop-shadow-xl

`;

const stickyStyle = {
  top: '10px',
  position: 'sticky',
  zIndex: '999',
  opacity: '0.9',
  backgroundColor: 'white'
};


export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({
      roundedHeaderButton = false,
      logoLink,
      links,
      className,
      collapseBreakpointClass = "lg"
}) => {

  const logoName = 'DEV.WEEK';

  const navigate = useNavigate();

  const { logout } = useAuth();

  const { isAuthenticated } = useAuth();

  const indexNavs = [
    {
      id: 'services',
      name: 'services',
      title: 'Services',
      link: '/#services'
    },
    {
      id: 'ourteam',
      name: 'ourteam',
      title: 'Our Team',
      link: '/#ourteam'
    },
    {
      id: 'pricing',
      name: 'pricing',
      title: 'Pricing',
      link: '/#pricing'
    },
    {
      id: 'faqs',
      name: 'faqs',
      title: 'Faqs',
      link: '/#faqs'
    },
  ]

  const [activeIndexLink, setActiveIndexLink] = useState(null);
  const handleSetActive = (to) => {
    setActiveIndexLink(to);
  }
  const handleSetInactive = (to) => {
    setActiveIndexLink(null);
  }


  const defaultLinks = [
    <NavLinks key={1} >
      <NavLink onClick={(e) => {
        e.preventDefault()
        navigate('/make-an-order')
      }} href="/make-an-order">Make an Order</NavLink>

      {
        indexNavs.map((indexNav, index) =>
            <NavLink key={index}>
                  <Link
                      onMouseUp={(e) =>{
                        console.log('click')
                        navigate(indexNav.link)
                        // setTimeout(() => navigate(indexNav.link), 1000);

                      }}
                      onSetActive={handleSetActive}
                      activeClass="active"
                      style={{
                        cursor: 'pointer',
                        color: activeIndexLink && activeIndexLink === indexNav.id ? '#742DFF' : 'inherit'
                      }}
                      to={indexNav.name}
                      spy={true}
                      duration={300}
                      href={indexNav.link}>
                    {indexNav.title}
                  </Link>
            </NavLink>
        )
      }

      <NavLink onClick={(e) => {
        e.preventDefault()
        navigate('/contact-us')
      }} href="/contact-us">Contact Us</NavLink>
      <NavLink onClick={(e) => {
        e.preventDefault()
        navigate('/vacancies')
      }} href="/vacancies">Vacancies</NavLink>

      {
        isAuthenticated &&
          <>
            <NavLink
                style={{cursor: 'pointer'}}
                onClick={() => {
                  logout();
                  navigate('/session/login');
                }}
                tw="lg:ml-12!">
              Logout
            </NavLink>
            <PrimaryLink
                css={roundedHeaderButton && tw`rounded-full`}
                href="/profile"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/profile')
                }}
            >
              Profile
            </PrimaryLink>
          </>
      }

      {
          !isAuthenticated &&
          <>
            <NavLink
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/session/signup')
                }}
                href="/session/signup" tw="lg:ml-12!">
              Signup
            </NavLink>
            <PrimaryLink
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/session/login')
                }}
                css={roundedHeaderButton && tw`rounded-full`}
                href="/session/login">
              Log in
            </PrimaryLink>
          </>

      }
    </NavLinks>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink  onClick={(e) => {
      e.preventDefault()
      navigate('/')
    }}
     href="/">
      <img src={logo} alt="logo" />
      {logoName}
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header

        style={stickyStyle}
        className={className || "header-light"}>
      <DesktopNavLinks

          css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
