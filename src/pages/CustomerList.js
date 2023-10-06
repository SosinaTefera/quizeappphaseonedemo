import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';
import SuccessSnackBar from 'src/components/snackbar/SuccessSnackBar';

const CustomerList = () => {
  const location = useLocation();
  const [snackopen, setSnackOpen] = useState(false);


  const [examcat, setexamcat] = useState({
    response: [],

  })
  const [country, setCountry] = useState({
    response: [],

  })

  const handleSnackOpen = () => {
    setSnackOpen(true);
  };




  const [state, setState] = useState({
    response: [],
  })


  const [counter, updateCounter] = useState(0);
  const incrementCounter = () => {
    updateCounter(counter + 1);
  }


  useEffect(() => {
    // location.state!=null?handleSnackOpen(true):console.log("false")
    axios.get(`${process.env.REACT_APP_BASE_URL}/customers`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    ).then((res) => {
      setState({ ...state, ['response']: res.data })
    })
    axios.get(`${process.env.REACT_APP_BASE_URL}/categories`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    ).then((res) => {
      const categories = []
      res.data.map((data) => {
        const entry = {
          value: data.id,
          label: data.name
        }
        categories.push(entry);
      });
      setexamcat({ ...examcat, ['response']: categories })
      

      // console.log(`dsfasfdasdf${categories[0].label}`)
    })
    axios.get(`${process.env.REACT_APP_BASE_URL}/locations`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    ).then((res) => {
      const locations = []
      res.data.map((data) => {
        const entry = {
          value: data.id,
          label: data.name
        }
        locations.push(entry);
      });
      setCountry({ ...country, ['response']: locations })
      

      // console.log(`dsfasfdasdf${categories[0].label}`)
    })
  }, [counter])




  return (
    <>
      <Helmet>

        <title>Customers | Quiz App</title>
      </Helmet>
      {snackopen && (<SuccessSnackBar />)}
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
            <CustomerListResults country={country.response} incrementCounter={incrementCounter} customers={state.response} category={examcat.response} />
          </Box>
        </Container>
      </Box>
    </>);
}

export default CustomerList;
