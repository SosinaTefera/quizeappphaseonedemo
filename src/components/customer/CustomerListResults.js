import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Grid
  
} from '@material-ui/core';
import * as React from 'react';
import CustomersDialog from './CustomersDialog';
import getInitials from 'src/utils/getInitials';
import DeleteAlert from 'src/components/alertdialog/DeleteAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import SuccessSnackBar from 'src/components/snackbar/SuccessSnackBar';


const emails = ['username@gmail.com', 'user02@gmail.com'];

const CustomerListResults = ({country, incrementCounter,category, customers, ...rest }) => {
  const [id,setId] = React.useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertopen, setAlertOpen] = React.useState(false);
 
  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [snackopen, setSnackOpen] = useState(false);
  const handleSnackOpen = () => {
    setSnackOpen(true);
};

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [prod,setProduct] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (prod) => {
    setProduct(prod);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
;
  };
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
      setIsDisabled(false);

    } else {
      newSelectedCustomerIds = [];
      setIsDisabled(true);

    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
      setId(id);
      setIsDisabled(false);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
      setIsDisabled(true);
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Card {...rest}>
       <CustomersDialog
      onClose={handleClose}
      open={open}
      product={prod}
      country={country}
      category={category}
      incrementCounter={incrementCounter}
    />
    {alertopen && (<DeleteAlert id={selectedCustomerIds} open={alertopen} handleSnackOpen={handleSnackOpen} handleClose={handleAlertClose} incrementCounter={incrementCounter} endpoint="customers" />)}
    {snackopen && (<SuccessSnackBar />)}

    <Grid container justifyContent="right">
    <IconButton color="primary" disabled={selectedCustomerIds.length!==0?false:true} onClick={handleClickAlertOpen} 
    >
          <DeleteIcon />
    </IconButton>
    </Grid>
      

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table
            
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>     
                <TableCell>
                  Voucher
                </TableCell>
                <TableCell>
                  Service
                </TableCell>
                <TableCell>
                  Result
                </TableCell>
                <TableCell>
                  Country
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {customers.slice(page * limit, page * limit + limit).map((customer) => (

                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  //onClick={()=>handleClickOpen(customer)}
                >
                  
                  <TableCell padding="checkbox">
                  <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                    
                  </TableCell>
                  <TableCell
                  onClick={()=>handleClickOpen(customer)}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.firstName)}

                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.firstName+" "+customer.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                  {customer.voucher}
                  </TableCell>
                  <TableCell>
                  {customer.service.name}
                  </TableCell>
                  <TableCell>
                  {customer.examResult}
                  </TableCell>
                  <TableCell>
                  {customer.location.name}
                  </TableCell>
                  <TableCell>
                  {moment(customer.published_at).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}

              
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
     
    </Card>
    
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
