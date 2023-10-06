import {
    Snackbar
} from "@material-ui/core";
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  
const SuccessSnackBar = () => {
    const [open, setOpen] = React.useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return(
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '20%' }}>
          Operation Successfull!
        </Alert>
      </Snackbar>
    );
}

export default  SuccessSnackBar;