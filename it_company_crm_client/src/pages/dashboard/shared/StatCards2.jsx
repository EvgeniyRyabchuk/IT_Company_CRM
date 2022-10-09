import { Card, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import {Box} from "@mui/system";


const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));




const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));


export const PersentSpan = ({ value }) => {
  const { palette } = useTheme();

  const textSuccess = palette.success.main;
  const textError = palette.error.main;

  const bgSuccess = lighten(palette.success.main, 0.85);
  const bgError = lighten(palette.error.main, 0.85);

  return (
      <>
        <IconBox sx={{ background: value >= 0 ? bgSuccess : bgError }}> 
          <Icon className="icon">{value >= 0 ? 'expand_less' : 'expand_more' }</Icon>
        </IconBox>
        <Span
            textcolor={value >= 0 ? textSuccess : textError}
        >
          {value > 0 && '+'}
          ({value.toFixed(2)}%)
        </Span>
      </>

  )
}



const StatCards2 = ({ newCustomers, transactins}) => {
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);

  const conditionText = '(last week compare before last)'

  return (
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
        <CardHeader>
          <Title>
            Dynamic {conditionText}
          </Title>
        </CardHeader>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{ p: 2 }}>
                  <ContentBox>
                    <FabIcon size="medium" sx={{ background: 'rgba(9, 182, 109, 0.15)', zIndex: '1' }}>
                      <Icon sx={{ color: '#08ad6c' }}>trending_up</Icon>
                    </FabIcon>
                    <H3 textcolor={'#08ad6c'}>New Customers</H3>
                    &nbsp;
                    {/*<small>{conditionText}</small>*/}
                  </ContentBox>

                  <ContentBox sx={{ pt: 2 }}>
                    <H1>{newCustomers.absolute}</H1>
                    <PersentSpan value={newCustomers.percent}/>
                  </ContentBox>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{ p: 2 }}>
                  <ContentBox>
                    <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden', zIndex: '1' }}>
                      <Icon sx={{ color: textError }}>star_outline</Icon>
                    </FabIcon>
                    <H3 textcolor={textError}>Transactions</H3>
                    &nbsp;
                    {/*<small>{conditionText}</small>*/}
                  </ContentBox>

                  <ContentBox sx={{ pt: 2 }}>
                    <H1>${transactins.absolute}</H1>
                    <PersentSpan value={transactins.percent}/>
                  </ContentBox>
                </Card>
              </Grid>

            </Grid>
      </Card>
  );
};

export default StatCards2;
