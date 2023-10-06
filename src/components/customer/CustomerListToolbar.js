import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Dialog,
  Divider,
  Grid,
  DialogTitle,
  CardHeader,

} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

import CustomersDialog from './CustomersDialog';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const emails = ['username@gmail.com', 'user02@gmail.com'];
const CustomerListToolbar = (prop) => {

  const navigate = useNavigate();



  const states = [
    {
      value: 'Pending',
      label: 'Pending'
    },
    {
      value: 'Approved',
      label: 'Approved'
    },
    {
      value: 'Rejected',
      label: 'Rejected'
    }
  ];


  const [open, setOpen] = React.useState(false);
  //const [selectedvalue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = (prod) => {
    navigate('/app/customers/create');

    //setProduct(prod);
    //setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //setSelectedValue(value);
  };

  return(
  <Box prop>
    
    
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="primary"
        variant="contained"
        onClick={()=>{handleClickOpen()}}
      >
        Add customer
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
}

export default CustomerListToolbar;
