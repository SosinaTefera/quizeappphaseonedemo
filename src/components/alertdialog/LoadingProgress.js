import {
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    DialogActions
} from "@material-ui/core";
const LoadingProgress = () => {

    return(
        <Dialog
                open={true}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Loading</DialogTitle>
                <DialogContent>

                    <CircularProgress />
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
    );
}

export default  LoadingProgress;