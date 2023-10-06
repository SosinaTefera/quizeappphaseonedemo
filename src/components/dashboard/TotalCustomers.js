import {
  Avatar,
  Box,
  IconButton,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  MenuItem
} from '@material-ui/core';
import * as React from 'react';
import { orange } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import UploadFile from '@mui/icons-material/UploadFile';
import { getToken } from 'src/helper/helpers';
import axios from 'axios';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';


const TotalCustomers = ({ category, ...rest }) => {
  const [progressopen,setProgressOpen] = React.useState(false);
  const [alertopen, setAlertOpen] = React.useState(false);
  const [cats, setCategory] = React.useState('');
  const [title,setTitle] = React.useState('');
  const handleTitleChange = (event)=>{
    setTitle(event.target.value)
  }
  const [document, setDocument] = React.useState({
    pdf: null
  })


  const handleProgressOpen = () => {
    setProgressOpen(true);
  };
  const handleProgressClose = () => {
    setProgressOpen(false);
  };

  const handleUploadClick = event => {
    var file = event.target.files[0];
    setDocument({
      pdf: event.target.files[0]
    })
  };

  const handleChanges = (event) => {
    setCategory(event.target.value);
  };
  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleFileUpload = () => {
    handleProgressOpen();
    const formData = new FormData();
    axios.post(`${process.env.REACT_APP_BASE_URL}/exam-resources`, { title: title, category: { id: cats } }, {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    }).then((res) => {
      formData.append('files', document.pdf)
      formData.append('field', 'file');
      formData.append('ref', 'exam-resource');
      formData.append('refId', res.data.id)
      axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${getToken()}`
        }
      }).then((res) => {

        if (res.status == 200) {
          setDocument({
            pdf: null
          })
          handleProgressClose();
          handleAlertClose();
        }
        console.log(res);

      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })


  }
  

  return (
    <Card >
            {progressopen && (<LoadingProgress />)}

      <Dialog
        open={alertopen}
        keepMounted
        onClose={handleAlertClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Upload</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Fill The Form
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
             <TextField
                        fullWidth
                        label="Title"
                        margin="normal"
                        name="title"
                        onChange={handleTitleChange}
                        type="email"
                        value={title}
                        variant="standard"
                      />

            <input
              style={{ display: 'none' }}
              accept=".pdf"
              id="contained-button-file2"
              multiple
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file2">
              <Button
                component="span"
                color="primary"
                fullWidth
                variant="text"
                onChange={handleUploadClick}

              >
                Upload PDF
            </Button>


            </label>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={cats}
              onChange={handleChanges}
              helperText="Please select your currency"
              required
            >
              {category.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFileUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'center' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Upload Downlodable Resources
          </Typography>
            
          </Grid>
          <Grid item>
            <IconButton onClick={handleClickAlertOpen}>
              <Avatar
                sx={{
                  backgroundColor: orange[600],
                  height: 40,
                  width: 40
                }}
              >
                <UploadFile />
              </Avatar>
            </IconButton>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
          <ArrowUpwardIcon sx={{ color: orange[900] }} />
          
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Click here to Upload Downlodable Resources
        </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default TotalCustomers;
