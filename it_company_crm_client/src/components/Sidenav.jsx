import { styled } from '@mui/system';
import MatxVerticalNav from "./MatxVerticalNav/MatxVerticalNav";
import useSettings from '../hooks/useSettings';
import { navigations } from '../routing/navigations';
import {Fragment, useMemo} from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import "react-perfect-scrollbar/dist/css/styles.css";
import useAuth from "../hooks/useAuth";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {

  const { counter } = useAuth();

  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };


  const navigationsWithBadge = useMemo(() => navigations.map(nav => {
    switch (nav.name) {
      case "Chat" :
        nav.badge = {value: counter.newChatMessages, color: 'white'};
        return nav;
      case 'News':
         nav.badge = {value: counter.newNews, color: 'white'};
        return nav;
      case 'Orders':
        nav.badge = {value: counter.newOrders, color: 'white'};
        return nav;
      case 'Projects':
        nav.badge = {value: counter.newProjects, color: 'white'};
        return nav;
      case 'Vacancies':
        nav.badge = {value: counter.newJobApplications, color: 'white'};
        return nav;
      default:
        return nav;
    }
  }), [counter]);

  console.log(navigationsWithBadge)

  return (
    <Fragment>

      <StyledScrollBar options={{ suppressScrollX: true }} >
        {children}
        <MatxVerticalNav items={navigationsWithBadge} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
