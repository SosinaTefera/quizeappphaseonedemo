import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import DatePicker from 'src/components/dashboard/DatePicker';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';



const Dashboard = () => {
  const [examcat, setexamcat] = useState({
    response: [],

  })
  const [state, setState] = useState({
    response: [],
  })

 

  useEffect(() => {

    console.log("Hello the token is"+getToken());
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
    })

    axios.get(`${process.env.REACT_APP_BASE_URL}/customers`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    ).then((res) => {
      setState({ ...state, ['response']: res.data })
    })
  }, [])


  return (
    <>
      <Helmet>
        <title>Dashboard | Quiz App</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}

          >
            <Grid
              item
              lg={12}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestOrders customers={state.response.reverse().slice(0,7)} />
            </Grid>

            <Grid
              item
              lg={4}
              sm={6}
              xl={3}
              xs={12}
            >
              <DatePicker />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCustomers category={examcat.response} />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default Dashboard;
