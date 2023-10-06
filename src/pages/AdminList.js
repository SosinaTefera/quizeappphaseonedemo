import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AdminListResults from 'src/components/admin/AdminListResults';
import AdminListToolbar from 'src/components/admin/AdminListToolbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {getToken} from 'src/helper/helpers';

const AdminList = () => {
  
  const [state,setState] = useState({
    response:[],
  })

  const [counter, updateCounter] = useState(0);
  const incrementCounter = () => {
    updateCounter(counter + 1);
}
  useEffect(() => {
    
      
       axios.get(`${process.env.REACT_APP_BASE_URL}/users`,{
         headers:{
           authorization: `Bearer ${getToken()}`
         }
       }).then((res)=>{
         //console.log(res.data)
        //state.setState({response: ["res.data"]});? admin.username :
        setState({...state , ['response']: res.data})

       })
      
      //console.log("test")
     
     //console.log(state.response)
  }, [counter])

  console.log(state.response)

 
  
  return(
  <>
    <Helmet>
      
      <title>Admins | Quiz App</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <AdminListToolbar />
        <Box sx={{ pt: 3 }}>
          <AdminListResults incrementCounter={incrementCounter} admins={state.response} />
        </Box>
      </Container>
    </Box>
  </>);
}

export default AdminList;
