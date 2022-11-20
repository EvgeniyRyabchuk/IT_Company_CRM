import {Card, Fab, Grid, Icon, IconButton, lighten, styled, Typography, useTheme} from '@mui/material';
import {RemoveRedEye} from "@mui/icons-material";
import {useMemo} from "react";
import useAuth from "../../../hooks/useAuth";



const StatCards3 = () => {

  const { counter } = useAuth();

  const cardList = useMemo(() => {

    return [
      { name: 'Unwatched Orders', amount: counter.newOrders, icon: 'folder' },
      { name: 'Unwatched Projects', amount: counter.newProjects, icon: 'devices' },
      { name: 'Unwatched Job Applications', amount: counter.newJobApplications, icon: 'border_color' },
      { name: 'Unwatched News', amount: counter.newNews, icon: 'reorder' },
    ];
  }, [counter]);

  return (
      <Grid container>
        {cardList.map((item, index) => (
            <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={6} sx={{ p: 1}}>
              <Card sx={{ p: 1}}>
                <IconButton>
                  <Icon className="icon">{item.icon}</Icon>
                </IconButton>

                <Typography variant='h4' sx={{ my: 1}}>
                  {item.amount}
                </Typography>

                <Typography variant='p' sx={{ mb: 3}}>
                  {item.name}
                </Typography>
              </Card>

            </Grid>
        ))}

      </Grid>
  );
};

export default StatCards3;
