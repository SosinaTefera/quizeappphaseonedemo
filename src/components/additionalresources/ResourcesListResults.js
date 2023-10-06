import { useState } from 'react';
import PropTypes from 'prop-types';
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
  Grid,
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete'
import * as React from 'react';
import ResourcesDialog from './ResourcesDialog';
import DeleteAlert from 'src/components/alertdialog/DeleteAlert';
import SuccessSnackBar from 'src/components/snackbar/SuccessSnackBar';


const ResourcesListResults = ({category, incrementCounter, resources, ...rest }) => {
  const [snackopen, setSnackOpen] = React.useState(false);
  const handleSnackOpen = () => {
    setSnackOpen(true);
};
  const [selectedResourceIds, setSelectedResourceIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [resource, setResource] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertopen, setAlertOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [id,setId] = React.useState(0);

  

 
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  // const handleDelete = (id) => {
  //   axios.delete(`${process.env.REACT_APP_BASE_URL}/additional-resources/${id}`, {
  //     headers: {
  //       authorization: `Bearer ${getToken()}`
  //     }
  //   }).then((res) => {
  //     if(res.status == 200){
  //       navigate(0);
  //     }
      
  //     console.log(res)
  //   })

  // }

  const handleSelectAll = (event) => {
    let newSelectedResourceIds;
    if (event.target.checked) {
      newSelectedResourceIds = resources.map((resource) => resource.id);
      setIsDisabled(false);
    } else {
      newSelectedResourceIds = [];
      setIsDisabled(true);
    }
    setSelectedResourceIds(newSelectedResourceIds);
    //setIsDisabled(true);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedResourceIds.indexOf(id);
    let newSelectedResourceIds = [];

    if (selectedIndex === -1) {
      setId(id);
      setIsDisabled(false);
      newSelectedResourceIds = newSelectedResourceIds.concat(selectedResourceIds, id);
    } else if (selectedIndex === 0) {
      setIsDisabled(true);
      newSelectedResourceIds = newSelectedResourceIds.concat(selectedResourceIds.slice(1));
    } else if (selectedIndex === selectedResourceIds.length - 1) {
      newSelectedResourceIds = newSelectedResourceIds.concat(selectedResourceIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedResourceIds = newSelectedResourceIds.concat(
        selectedResourceIds.slice(0, selectedIndex),
        selectedResourceIds.slice(selectedIndex + 1)
      );
    }

    setSelectedResourceIds(newSelectedResourceIds);

  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (res) => {
    setResource(res);
    setOpen(true);
  };
  console.log(selectedResourceIds);


  return (
    <Card {...rest}>
      <ResourcesDialog
        onClose={handleClose}
        open={open}
        resource={resource}
        category={category}
        incrementCounter={incrementCounter}
      />
      {alertopen && (<DeleteAlert id={selectedResourceIds} handleSnackOpen={handleSnackOpen} open={alertopen} incrementCounter={incrementCounter} handleClose={handleAlertClose} endpoint="additional-resources" />)}

      {/* {alertopen && (<DeleteAlert id={id} open={alertopen} handleSnackOpen={handleSnackOpen} handleClose={handleAlertClose} incrementCounter={incrementCounter} endpoint="additional-resources" />)} */}
      {snackopen && (<SuccessSnackBar />)}

      <Grid container justifyContent="right">

        <IconButton color="primary" disabled={selectedResourceIds.length!==0?false:true} onClick={handleClickAlertOpen} 
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
                    checked={selectedResourceIds.length === resources.length}
                    color="primary"
                    indeterminate={
                      selectedResourceIds.length > 0
                      && selectedResourceIds.length < resources.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  image
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {resources.slice(page * limit, page * limit + limit).map((resource) =>
               
                <TableRow
                  hover
                  key={resource.id}
                  selected={selectedResourceIds.indexOf(resource.id) !== -1}

                >

                  <TableCell padding="checkbox">


                    <Checkbox
                      checked={selectedResourceIds.indexOf(resource.id) !== -1}
                      onChange={(event) => handleSelectOne(event, resource.id)}
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



                      <Typography
                        color="textPrimary"
                        variant="body1"
                        onClick={()=>handleClickOpen(resource)}

                      >
                        {resource.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {resource.description}
                  </TableCell>


                  <TableCell>
                    {resource.category.name}
                  </TableCell>

                  <Avatar
                     src={resource.image!=null?`${process.env.REACT_APP_BASE_URL}${resource.image.url}`:resource.media}
                    sx={{ mr: 2 }}
                  >


                  </Avatar>



                </TableRow>
              )

              }


            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={resources.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />


    </Card>

  );
};

ResourcesListResults.propTypes = {
  admins: PropTypes.array.isRequired
};

export default ResourcesListResults;
