import { Box, styled } from '@mui/material';
import MatxLogo from './icons/MatxLogo';
import useSettings from '../hooks/useSettings';
import { Span } from '../assets/typography/Typography';
import Icon from '../assets/images/icon_800_800.png';

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 20px 20px 28px',
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block',
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        {/*<MatxLogo />*/}
        <img src={Icon} alt="logo" width={26} height={26}/>
        <StyledSpan mode={mode} className="sidenavHoverShow">
          Crm for IT 
        </StyledSpan>
      </Box>

      <Box className="sidenavHoverShow" sx={{ display: mode === 'compact' ? 'none' : 'block' }}>
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
