import { useState } from 'react';
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
  Grid,
  IconButton
 
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import * as React from 'react';
import AdminDialog from './AdminDialog';
import DeleteAlert from 'src/components/alertdialog/DeleteAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import SuccessSnackBar from 'src/components/snackbar/SuccessSnackBar';

const AdminListResults = ({incrementCounter, admins, ...rest }) => {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [admin,setAdmin] = useState([]);
  const [id,setId] = React.useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertopen, setAlertOpen] = React.useState(false);
  const [snackopen, setSnackOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

 
  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleClickOpen = (admin) => {
    setAdmin(admin);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //setSelectedValue(value);
  };

  const handleSnackOpen = () => {
    setSnackOpen(true);
};

  const handleSelectAll = (event) => {
    let newSelectedUserIds;

    if (event.target.checked) {
      newSelectedUserIds = admins.map((user) => user.id);
      setIsDisabled(false);
    } else {
      newSelectedUserIds = [];
      setIsDisabled(true);
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUserIds.indexOf(id);
    let newSelectedUserIds = [];

    if (selectedIndex === -1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
      setId(id);
      setIsDisabled(false);
    } else if (selectedIndex === 0) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
      setIsDisabled(true);
    } else if (selectedIndex === selectedUserIds.length - 1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, selectedIndex),
        selectedUserIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>

      <AdminDialog
      
      onClose={handleClose}
      open={open}
      users={admin}
      incrementCounter={incrementCounter}
      
    />
    {alertopen && (<DeleteAlert id={selectedUserIds} incrementCounter={incrementCounter} handleSnackOpen={handleSnackOpen} open={alertopen} handleClose={handleAlertClose} endpoint="users" />)}
    {snackopen && (<SuccessSnackBar />)}

    <Grid container justifyContent="right">
    <IconButton color="primary" disabled={selectedUserIds.length!==0?false:true} onClick={handleClickAlertOpen} 
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
                    checked={selectedUserIds.length === admins.length}
                    color="primary"
                    indeterminate={
                      selectedUserIds.length > 0
                      && selectedUserIds.length < admins.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  User Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {admins.slice(page * limit, page * limit + limit).map((admin) => (
                <TableRow
                  hover
                  key={admin.id}
                  selected={selectedUserIds.indexOf(admin.id) !== -1}
                  onClick={()=>handleClickOpen(admin)}
                >
                  
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.indexOf(admin.id) !== -1}
                      onChange={(event) => handleSelectOne(event, admin.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={admin.avatarUrl}
                        sx={{ mr: 2 }}
                        onClick={()=>handleClickOpen(admin)}

                      >
                        {getInitials(admin.first_name)}

                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${admin.first_name} ${admin.last_name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {admin.username}
                  </TableCell>
                  

                  <TableCell>
                    {admin.email}
                  </TableCell>
                  <TableCell>
                    {moment(admin.updated_at).format('DD/MM/YYYY')}
                  </TableCell>
                
                </TableRow>
                
              ))}

              
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={admins.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
     
    </Card>
    
  );
};

AdminListResults.propTypes = {
  admins: PropTypes.array.isRequired
};

export default AdminListResults;
