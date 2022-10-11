import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Fab,
  Grid,
  Hidden,
  Icon,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { Span } from '../../../assets/typography/Typography';

import { Fragment } from 'react';
import AvatarGroup from "@mui/material/AvatarGroup";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const ProjectName = styled(Span)(({ theme }) => ({
  marginLeft: 24,
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: { marginLeft: 4 },
}));

const StarOutline = styled(Fab)(() => ({
  marginLeft: 0,
  boxShadow: 'none',
  background: '#08ad6c !important',
  backgroundColor: 'rgba(9, 182, 109, 1) !important',
}));

const DateRange = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: 'none',
  color: 'white !important',
  background: `${theme.palette.error.main} !important`,
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: '32px !important',
  height: '32px !important',
}));

const RowCards = ({projects}) => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const navigate = useNavigate();

  return projects.map((project, index) => (
    <Fragment key={project.id}>
      <Card sx={{ py: 1, px: 2 }}
            className="project-card"
      >
        <Grid container alignItems="center">
          <Grid item md={5} xs={7}>
            <Box display="flex" alignItems="center">
              <Checkbox />
              <Hidden smDown>
                {index % 2 === 1 ? (
                  <StarOutline style={{minWidth: '40px', minHeight: '40px'}} size="small" sx={{zIndex: '1'}}>
                    <Icon >star_outline</Icon>
                  </StarOutline>
                ) : (
                  <DateRange style={{minWidth: '40px', minHeight: '40px'}} size="small" sx={{zIndex: '1'}}>
                    <Icon >date_range</Icon>
                  </DateRange>
                )}
              </Hidden>
              <ProjectName>Project {project.id} ({project.project_type.name})</ProjectName>
            </Box>
          </Grid>

          <Grid item md={3} xs={4}>
            <Box color={textMuted}>
              {moment(project.created_at).format('MM/dd/yyyy')}
            </Box>
          </Grid>

          <Hidden smDown>
            <Grid item xs={3}>
              <AvatarGroup max={4} display="flex" position="relative" >
                {
                  project.employees.map(employee =>
                      <Avatar key={employee.id} src={`${API_URL_WITH_PUBLIC_STORAGE}/${employee.user.avatar}`}/>
                  )
                }

              </AvatarGroup>
            </Grid>
          </Hidden>

          <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton  onClick={() => navigate('/projects')}>
                <Icon>more_vert</Icon>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Box py={1} />
    </Fragment>
  ));
};

export default RowCards;
