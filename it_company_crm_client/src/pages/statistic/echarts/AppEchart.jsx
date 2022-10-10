import {Box, Grid, styled, useTheme} from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumb';
import SimpleCard from '../../../components/SimpleCard';
import SimpleLineChart from "./SimpleLineChart";
import {useEffect, useState} from "react";
import {StatiscticService} from "../../../services/StatiscticService";
import moment from "moment";
import BarRace from "./BarRace";
import FunnelSales from "./FunnelSales";
import UndoOrdersPie from "./UndoOrdersPie";
import UndoCasesTreemap from "./UndoCasesTreemap";
import BiggestProjects from "./BiggestProjects";

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
  },
}));

const AppEchart = () => {

    const formatMetrics = (data) => {
        const orderTitles = data.ordersDynamicMetric.map(e => moment(e.title).format('MMMM'));
        const orderValues = data.ordersDynamicMetric.map(e => e.value);

        data.ordersDynamicMetric = {
            titles: orderTitles,
            values: orderValues
        }

        data.orderStatusesCounter = data.orderStatusesCounter.sort((e1, e2) => e1.status.index - e2.status.index);

        const orderSum = data.ordersDynamicMetric.values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        return data;
    }

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchStatistic = async () => {
            const { data } = await StatiscticService.index();
            const formatedData = formatMetrics(data);
            console.log(formatedData);
            setData(formatedData);
        }
        fetchStatistic();

    }, [])

    const theme = useTheme();
    console.log('==============');
    console.log(data);
    console.log('==============');
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Statistic', path: '/statistic' } ]} />
      </Box>

      <Box sx={{ py: '12px' }} />

        {
            data &&
            <>
                <SimpleCard title="Order Dynamic (last months)">
                    <SimpleLineChart
                        data={data?.ordersDynamicMetric ?? []}
                        height="350px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />
                </SimpleCard>

                <SimpleCard title="Customer Dynamic (last months)">
                    <SimpleLineChart
                        data={data?.ordersDynamicMetric ?? []}
                        height="350px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />
                </SimpleCard>

                <SimpleCard title="Sales funnel (for order statuses)">

                    <FunnelSales
                        data={data.funnelSales}
                        height="600px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />


                </SimpleCard>

                <SimpleCard title="Sorted statuses by number of orders">
                    <BarRace
                        data={data?.orderStatusesCounter ?? []}
                        height="400px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />
                </SimpleCard>

                <SimpleCard title="Sorted statuses by number of orders">
                    <Grid container>
                        <Grid item xs={12} sm={12} md={9} xl={9}>
                            <UndoCasesTreemap
                                data={data?.orderStatusesCounter ?? []}
                                height="400px"
                                color={[theme.palette.primary.main, theme.palette.primary.light]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} xl={3}>
                            <UndoOrdersPie
                                data={data?.orderStatusesCounter ?? []}
                                height="400px"
                                color={[theme.palette.primary.main, theme.palette.primary.light]}
                            />
                        </Grid>
                    </Grid>

                </SimpleCard>



                <SimpleCard title="Biggest Projects">
                    <BiggestProjects
                        data={data?.orderStatusesCounter ?? []}
                        height="1000px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />
                </SimpleCard>

            </>

        }



      {/*<SimpleCard title="Line Chart">*/}
      {/*  <LineChart*/}
      {/*    height="350px"*/}
      {/*    color={[theme.palette.primary.main, theme.palette.primary.light]}*/}
      {/*  />*/}
      {/*</SimpleCard>*/}

      {/*<Box sx={{ py: '12px' }} />*/}

      {/*<SimpleCard title="Comparison Chart">*/}
      {/*  <ComparisonChart*/}
      {/*    height="350px"*/}
      {/*    color={[theme.palette.primary.dark, theme.palette.primary.light]}*/}
      {/*  />*/}
      {/*</SimpleCard>*/}

      {/*<Box sx={{ py: '12px' }} />*/}

      {/*<SimpleCard title="Area Chart">*/}
      {/*  <AreaChart height="350px" color={[theme.palette.primary.main]} />*/}
      {/*</SimpleCard>*/}
    </Container>
  );
};

export default AppEchart;
