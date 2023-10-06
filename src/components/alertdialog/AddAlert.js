import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress
} from '@material-ui/core';
import * as React from 'react';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';



export default function AddAlert({setSnackOpen,snackopen, handleSnackOpen, incrementCounter, setAdd, parentClose, data, id, endpoint, ...rest }) {
    const [success, setSuccess] = React.useState(false);
    const [child, setChild] = React.useState(true);
    const handleCloseChild = () => {
        setChild(false);
    }


    React.useEffect(() => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/categories`, data,
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }).then((res) => {
                console.log(res)
                handleCloseChild();
                incrementCounter();
                parentClose();
                setAdd();

                //setSuccess(false);
                handleSnackOpen();
                //handleClose();


            })
    }, [])

    return (
        <Dialog
            open={child}
            keepMounted
            onClose={handleCloseChild}
            aria-describedby="alert-dialog-slide-description"
        >
            {success && (<LoadingProgress />)}

            <DialogTitle>Loading</DialogTitle>
            <DialogContent>

                <CircularProgress />
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );


}
