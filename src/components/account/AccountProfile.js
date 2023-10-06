import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid
} from '@material-ui/core';
import * as React from 'react';
import axios from 'axios';


const user = {
  //avatar: '/static/images/avatars/avatar_6.png',
  city: 'Addis Ababa',
  country: 'country',
  jobTitle: 'Admin',
  name: 'Miki',
  timezone: 'GTM-7'
};


const AccountProfile = (props) => {





  const [userimage, setUSerimage] = React.useState({
    avatar: '/static/images/avatars/avatar_6.png'
  })

  const [state, setState] = React.useState({
    mainState: "initial",
    selectedFile: null
  });

  const handleUploadClick = event => {

   
    

    setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
    });
   
    

    

  };


  const handleSaveImage = ()=>{
    setUSerimage({avatar:URL.createObjectURL(state.selectedFile)})
    const formData = new FormData();

    formData.append(
      "image",
      "state.selectedFile",
    );
    // formData.append(
    //   "first_name",
    //   state.selectedFile,
    // );
    // formData.append(
    //   "second_name",
    //   state.selectedFile,
    // );

    // formData.append(
    //   "email",
    //   state.selectedFile,
    // );

  

    console.log(formData.values());
    axios.put("http://localhost:1337/users/1", formData).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    
  }


  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={userimage.avatar}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>


        <Grid container justify="center" alignItems="center">
          <input
            style={{ display: 'none' }}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor="contained-button-file">
            <Button
              component="span"
              color="primary"
              fullWidth
              variant="text"
            >
              Upload picture
            </Button>


          </label>

          
        </Grid>
        <Button
              onClick={ handleSaveImage}
              color="primary"
              fullWidth
              variant="text"

            >
              Save
            </Button>
      </CardActions>
    </Card>
  );

}

export default AccountProfile;
