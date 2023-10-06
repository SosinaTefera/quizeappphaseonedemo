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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Dialoog from './Dialog';
import DeleteAlert from 'src/components/alertdialog/DeleteAlert';
import SuccessSnackBar from 'src/components/snackbar/SuccessSnackBar';


const ProductCard = ({incrementCounter, product, category, ...rest }) => {

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

  
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let choice = [];
  var f = product.choice.split('\\n');
  f.map((choices, index) => {
    var ind = index + 1
    var cho = "Choice" + ind + ". " + choices + " ";
    choice.push(cho)

  })

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >

      <Dialoog open={open} handleClose={handleClose} product={product} category={category} incrementCounter={incrementCounter} />
      {alertopen && (<DeleteAlert id={product.id} handleSnackOpen={handleSnackOpen} open={alertopen} incrementCounter={incrementCounter} handleClose={handleAlertClose} endpoint="exams" />)}
      {snackopen && (<SuccessSnackBar />)}


      <CardContent>
      
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.question}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {choice}
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
              {product.category.name}
            </Typography>

          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >



            <IconButton onClick={handleClickOpen}>
              <EditIcon color="action" />
            </IconButton>
            <IconButton onClick={handleClickAlertOpen}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
