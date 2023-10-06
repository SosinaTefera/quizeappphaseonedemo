import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core';
import * as React from 'react';
import axios from 'axios';
import {getToken} from 'src/helper/helpers';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';



export default function DeleteAlert({handleSnackOpen,incrementCounter, open, handleClose, id,endpoint, ...rest}) {
    const [success,setSuccess] = React.useState(false);
    console.log(id)

    const handleDelete = (id) => {
        setSuccess(true);
        
        
        const response = id.map(i=>{
            
            return axios.delete(`${process.env.REACT_APP_BASE_URL}/${endpoint}/${i}`, {
                        headers: {
                            authorization: `Bearer ${getToken()}`
                        }
                    }).then((res) => {
                        if (res.status === 200) {
                            //console.log(res)
                            //navigate(0);
                            
            
                            
            
                            
                            
                            
                        }
                        console.log(res)
                    }).catch((err)=>{
                        console.log(err);
                    });

            
            

        })

        return Promise.all(response).then(() => {
            incrementCounter();
            setSuccess(false);
            handleSnackOpen();
            handleClose();
          });
        

      

    }


    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            {success && (<LoadingProgress />)}
            <DialogTitle>{"Warning"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    
                    You can't undo once you delete it.
                    Are You sure you want to delete the selected resource?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={()=>handleDelete(id)}>Yes</Button>
            </DialogActions>
        </Dialog>

    );

}
