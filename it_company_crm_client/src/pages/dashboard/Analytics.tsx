import {Card, CircularProgress, Grid, styled, useTheme} from '@mui/material';
import {Fragment, useEffect, useState} from 'react';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import {Box} from "@mui/system";
import StatCards3 from "./shared/StatCards3";
import {DashboardService} from "../../services/DashboardService";
import {useFetching} from "../../hooks/useFetching";
import {DashBoardAnalytic} from "../../types/statistics";
import EventCalendarWidget from "../../components/EventCalendar/EventCalendar";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

export type TimeRange = {
  name: 'This Month' | 'Last Month';
  value: 'thisMonth' | 'lastMonth';
}

const Analytics = () => {
  const { palette } = useTheme();

  const [data, setData] = useState<DashBoardAnalytic | null>(null);

  const timeRangeList : TimeRange[] = [
      {
        name: 'This Month',
        value: 'thisMonth',
      },
      {
        name: 'Last Month',
        value: 'lastMonth',
      },
  ];
  const [ordersTimeRange, setOrdersTimeRange] = useState<TimeRange>({
    name: 'This Month',
    value: 'thisMonth',
  });

  const [fetchData, isLoading, error] = useFetching(async () => {
    const { data } = await DashboardService.analytics();
    setData(data);
  });
  const [fetchDataWithTimeRange, isTimeRangeLoading, TimeRange] =
      useFetching(async (timeRange: TimeRange | undefined) => {
      const { data } = await DashboardService.analytics(timeRange);
      setData(data);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleTimeRangeChange = (range: TimeRange) => {
    fetchDataWithTimeRange(range);
  }

  return (
    <Fragment>
      { isLoading && <CircularProgress /> }
      { data &&
          <ContentBox className="analytics">
            <Grid container spacing={3}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <StatCards counter={data.counter} />

                <TopSellingTable
                    isLoading={isTimeRangeLoading}
                    orders={data.lastOrders}
                    timeRangeList={timeRangeList}

                    timeRange={ordersTimeRange}
                    onTimeRangeChange={handleTimeRangeChange}
                />

                <StatCards2
                    newCustomers={data.increases.find(e => e.targetName === 'customers')}
                    transactins={data.increases.find(e => e.targetName === 'transactions')}
                />

                <H4>On going Projects</H4>
                {/*
                // @ts-ignore */}
                <div>
                  <RowCards projects={data.lastProjects} />
                </div>
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Card sx={{ px: 3, py: 2, mb: 3 }} >
                  <Title>Project Types Count</Title>
                  <SubTitle>All the time</SubTitle>

                  <DoughnutChart
                      data={data.percentProjectTypes.map(type =>
                            ({value: type.absolute, name: type.target.name})
                        )
                      }
                      height="500px"
                      color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                  />
                </Card>

                {/*<UpgradeCard />*/}

                <Box sx={{ py: 2, mb: 3 }}>
                  <StatCards3 />
                </Box>

                <Box sx={{
                  "& .react-calendar" : {border: '0px', padding: 0, margin: 0, boxShadow: 1, width: '100%'}
                  , height: '320px'
                }}
                     display='flex'
                     justifyContent='center'
                     alignContent='center'>
                  <EventCalendarWidget />
                </Box>

                {/*<Campaigns />*/}
              </Grid>
            </Grid>
          </ContentBox>
      }

    </Fragment>
  );
};

export default Analytics;
