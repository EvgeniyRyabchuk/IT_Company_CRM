import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

import notFound404Logo from '../../assets/images/matx/illustrations/404.svg';
import {JustifyBox2} from "../../assets/components/Shared";
import {IMG, NotFoundRoot} from "../../assets/components/Session";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundRoot>
      <JustifyBox2>
        <IMG src={notFound404Logo} alt="" />
        <Button
          color="primary"
          variant="contained" 
          sx={{ textTransform: 'capitalize' }}
          onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </JustifyBox2>
    </NotFoundRoot>
  );
};

export default NotFound;
