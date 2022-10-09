import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from '../../../assets/typography/Typography';
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = ({ counter }) => {

  const cardList = useMemo(() => {
    return [
      { name: 'Total Customer', amount: counter.customers, icon: 'group', path: '/customers' },
      { name: 'Total Employees', amount: counter.employees, icon: 'badge', path: '/employees' },
      { name: 'Weekly Revenue', amount: `$${counter.weeklyRevenue}` , icon: 'attach_money', path: '/statistic' },
      { name: 'Total Orders',amount: counter.orders, icon: 'shopping_cart', path: '/orders' },
    ];
  }, [counter]);


  const navigate = useNavigate();

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
