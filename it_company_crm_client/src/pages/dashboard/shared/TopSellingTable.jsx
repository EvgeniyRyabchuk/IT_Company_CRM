import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from '../../../assets/typography/Typography';
import {API_URL_WITH_PUBLIC_STORAGE} from "../../../http";
import {defaultUserAvatar} from "../../../utils/constant";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

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

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));


export const SkeletonOrderRow = () => (
      Array.from(Array(5).keys()).map(e =>
          <TableRow key={e} hover>
            <TableCell colSpan={4} align="left"
                       sx={{ px: 0, textTransform: 'capitalize' }}>
              <Box display="flex" alignItems="center">
                <Skeleton variant="circular">
                  <Avatar src={ defaultUserAvatar}/>
                </Skeleton>

                <Skeleton variant="rectangular" sx={{ m: 0, ml: 4 }}>
                  <Paragraph>
                    asdfasdfasdf
                  </Paragraph>
                </Skeleton>

              </Box>
            </TableCell>

            <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
              <Skeleton variant="rectangular" sx={{ mr: 3}}/>
            </TableCell>

            <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
              <Skeleton variant="rectangular" sx={{ mr: 3}}>
                <Small>asdfasdfasdf</Small>
              </Skeleton >
            </TableCell>

            <TableCell sx={{ px: 0 }} colSpan={1}>
              <IconButton>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </TableCell>

          </TableRow>
      )
  )


const TopSellingTable = ({ orders, timeRangeList, timeRange, isLoading, onTimeRangeChange }) => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>
          {isLoading && <Skeleton /> }
          Orders
        </Title>
        <Select
            size="small"
            defaultValue={timeRange.value}
        >

          {timeRangeList.map((trl, index) =>
              <MenuItem
                  key={index}
                  onClick={() => {
                    onTimeRangeChange(trl)
                  }}
                  selected={timeRange.value === trl.value}
                  value={trl.value}
              >
                {trl.name}
              </MenuItem>
          )}

        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Customer / Project Type
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Revenue
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {
              isLoading ? <SkeletonOrderRow />  :
                  orders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                            <Box display="flex" alignItems="center">
                              <Avatar src={ order.customer ?
                                  `${API_URL_WITH_PUBLIC_STORAGE}/${order.customer.user.avatar}`
                                  : `${defaultUserAvatar}`
                              } />
                              <Paragraph sx={{ m: 0, ml: 4 }}>
                                {order.project ? order.project.project_type.name : 'no project yet'}
                              </Paragraph>
                            </Box>
                          </TableCell>

                          <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                            {/*${product.price > 999 */}
                            {/*  ? (product.price / 1000).toFixed(1)*/}
                            {/*  + 'k' : product.price}*/}
                            {order.project ? order.project.paid : 0}
                          </TableCell>

                          <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                            {
                              <Small bgcolor={order.status.bgColor}>{order.status.name}</Small>
                            }
                          </TableCell>

                          <TableCell sx={{ px: 0 }} colSpan={1}>
                            <IconButton>
                              <Icon color="primary">edit</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    ))
            }

          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'earphone',
    price: 100,
    available: 15,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'earphone',
    price: 1500,
    available: 30,
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'iPhone x',
    price: 1900,
    available: 35,
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'iPhone x',
    price: 100,
    available: 0,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'Head phone',
    price: 1190,
    available: 5,
  },
];

export default TopSellingTable;
