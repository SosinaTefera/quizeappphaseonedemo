import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {

  const [state,setState] = useState({
    response:[],
  })

  //let response = [];
  
  useEffect(() => {
    
      
       axios.get(`${process.env.REACT_APP_BASE_URL}/categories`).then((res)=>{
         //console.log(res.data)
        //state.setState({response: ["res.data"]});
        setState({...state , ['response']: res.data})

       })
      
      //console.log("test")
     
     //console.log(state.response)
  }, [])

 
 
  
  return(
  <>
    <Helmet>
      
      <title>Customers | Quiz App</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults incrementCounter={incrementCounter} customers={state.response} />
        </Box>
      </Container>
    </Box>
  </>);
}

export default CustomerList;
