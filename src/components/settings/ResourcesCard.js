import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
 
  Typography,
  IconButton, 

} from '@material-ui/core';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import DeleteAlert from 'src/components/alertdialog/DeleteAlert';
import SuccessSnackBar from 'src/components/snackbar/SuccessSnackBar';
// import Article from '@mui/icons-material/Article';


const ResourceCard = ({incrementCounter, resource, ...rest }) => {

  const [snackopen, setSnackOpen] = React.useState(false);
  const handleSnackOpen = () => {
    setSnackOpen(true);
};
  

  const [alertopen, setAlertOpen] = React.useState(false);


  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  if(snackopen){
    
  }

  



  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >

      {alertopen && (<DeleteAlert id={resource.id} handleSnackOpen={handleSnackOpen} open={alertopen} incrementCounter={incrementCounter} handleClose={handleAlertClose} endpoint="exam-resources" />)}
      {snackopen && (<SuccessSnackBar />)}


      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            alt="resource"
            variant="square"
          >
            {/* <Article /> */}
          </Avatar>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {resource.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {resource.title}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pr: 1 }}
              variant="body2"
            >

              Category
          </Typography>
            <Typography>
              {resource.category.name}
            </Typography>

          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >


            <IconButton onClick={handleClickAlertOpen}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

ResourceCard.propTypes = {
  resource: PropTypes.object.isRequired
};

export default ResourceCard;
