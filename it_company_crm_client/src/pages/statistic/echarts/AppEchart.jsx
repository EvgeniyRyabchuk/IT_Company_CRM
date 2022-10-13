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
import BiggestProjectsTreemap from "./BiggestProjects";

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

    const simpleLineChartFormat = (data) => {
        const orderTitles = data.map(e => moment(e.title).format('MMMM'));
        const orderValues = data.map(e => e.value);
        return { titles: orderTitles,  values: orderValues }
    }

    const formatMetrics = (data) => {
        data.ordersDynamicMetric = simpleLineChartFormat(data.ordersDynamicMetric);
        data.customerDynamicMetric = simpleLineChartFormat(data.customerDynamicMetric);


        data.orderStatusesCounter = data.orderStatusesCounter.sort((e1, e2) => e1.status.index - e2.status.index);
        const orderSum = data.ordersDynamicMetric.values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        data.undoCasesGrouped = data.undoCasesGrouped.map(e => {
            const name = `${e.order_undo_case.type_name} ${e.order_undo_case.reason}}`;
            return { value: e.total, name, path: name };
        });

        data.biggestProjects = data.biggestProjects.map(e =>
            ({ value: [e.paid, null, e.budget, e.budget], name: e.name, id: e.id, description: '123'})
        )

        return data;
    }

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchStatistic = async () => {
            const { data } = await StatiscticService.index();
            const formatedData = formatMetrics(data);
            setData(formatedData);
        }
        fetchStatistic();

    }, [])

    const theme = useTheme();

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Statistic', path: '/statistic' } ]} />
      </Box>

      <Box sx={{ py: '12px' }} />

        {
            data &&
            <>
                <SimpleCard title="New Orders Dynamic (last months)">
                    <SimpleLineChart
                        data={data.ordersDynamicMetric ?? []}
                        height="350px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />
                </SimpleCard>

                <SimpleCard title="New Customers Dynamic (last months)">
                    <SimpleLineChart
                        data={data.customerDynamicMetric ?? []}
                        height="350px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />
                </SimpleCard>

                <SimpleCard title="">
                    <FunnelSales
                        data={data.funnelSales}
                        height="600px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />

                </SimpleCard>

                <SimpleCard title="Current Order Count With Status">
                    <BarRace
                        data={data.orderStatusesCounter ?? []}
                        height="400px"
                        color={[theme.palette.primary.main, theme.palette.primary.light]}
                    />
                </SimpleCard>

                <Box sx={{ my: 5, boxShadow: 1}}>
                    <SimpleCard title="">
                        <Grid container>
                            <Grid item xs={12} sm={12} md={9} xl={9}>
                                <UndoCasesTreemap
                                    data={data.undoCasesGrouped ?? []}
                                    height="400px"
                                    color={[theme.palette.primary.main, theme.palette.primary.light]}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} xl={3}>
                                <UndoOrdersPie
                                    data={data.orderRatio ?? []}
                                    height="400px"
                                    color={[theme.palette.primary.main, theme.palette.primary.light]}
                                />
                            </Grid>
                        </Grid>

                    </SimpleCard>
                </Box>

                <Box sx={{ my: 5, boxShadow: 1}}>
                    <SimpleCard title="">
                        <BiggestProjectsTreemap
                            data={data.biggestProjects ?? []}
                            height="1000px"
                            color={[theme.palette.primary.main, theme.palette.primary.light]}
                        />
                    </SimpleCard>
                </Box>


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
