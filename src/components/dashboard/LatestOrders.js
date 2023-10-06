import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';



const LatestOrders = ({ customers }) => {
  const navigate = useNavigate();
  const nav = ()=>{
    navigate('/app/customers')
  }
  return (

    <Card >
      <CardHeader title="Customers" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
              </TableCell>
                <TableCell>
                  Email
              </TableCell>
                <TableCell>
                Created At
              </TableCell>
                <TableCell>
                  Service
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
                  <TableCell>
                    {`${customer.firstName} ${customer.lastName}`}
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {moment(customer.published_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {customer.service.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={nav}
        >
          View all
      </Button>
      </Box>
    </Card>
  );
}
export default LatestOrders;
