import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Tab
} from '@material-ui/core';
import Pagination from '@mui/lab/Pagination';
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';
import * as React from 'react';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import CategoryListToolbar from 'src/components/category/CategoryListToolbar';
import CategoryListResults from 'src/components/category/CategoryListResult';
import ResourcesListToolbar from 'src/components/additionalresources/ResourcesListToolbar';
import ResourcesListResults from 'src/components/additionalresources/ResourcesListResults';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';

const ProductList = () => {
  const [value, setValue] = React.useState('1');
  const [counter, updateCounter] = useState(0);
  const incrementCounter = () => {
    updateCounter(counter + 1);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = useState({
    response: [],

  })
  const [examcat, setexamcat] = useState({
    response: [],

  })
  const [catresponse, setCatresponse] = useState({

    response: []
  })
  const [resourcesresponse, setResourcesresponse] = useState({
    response: []
  })
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/exams`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }).then((res) => {
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
      setCatresponse({ ...catresponse, ['response']: res.data })
      setexamcat({ ...examcat, ['response']: categories })
      // console.log(`dsfasfdasdf${categories[0].label}`)
    })
    axios.get(`${process.env.REACT_APP_BASE_URL}/additional-resources`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }).then((res) => {
        setResourcesresponse({ ...resourcesresponse, ['response']: res.data })
      })
  }, [counter])

  return (
    <>
      <Helmet>
        <title>Quizs | Quiz App</title>
      </Helmet>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
              <Tab label="Questions" value="1" />
              <Tab label="Categories" value="2" />
              <Tab label="Additional Resources" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 3
              }}
            >
              <Container maxWidth={false}>
                <ProductListToolbar incrementCounter={incrementCounter} category={examcat.response} />
                <Box sx={{ pt: 3 }}>
                  <Grid
                    container
                    spacing={3}
                  >
                    {state.response.map((question) => (
                      <Grid
                        item
                        key={question.id}
                        lg={4}
                        md={6}
                        xs={12}
                      >
                        <ProductCard incrementCounter={incrementCounter} category={examcat.response} product={question} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 3
                  }}
                >
                  <Pagination
                    color="primary"
                    count={3}
                    size="small"
                  />
                </Box>

              </Container>
            </Box>

          </TabPanel>
          <TabPanel value="2">
            <CategoryListToolbar incrementCounter={incrementCounter} />
            <CategoryListResults incrementCounter={incrementCounter} categories={catresponse.response} />
          </TabPanel>
          <TabPanel value="3">
            <ResourcesListToolbar incrementCounter={incrementCounter} category={examcat.response} />
            <ResourcesListResults incrementCounter={incrementCounter} category={examcat.response} resources={resourcesresponse.response} />
          </TabPanel>
        </TabContext>
      </Box>


    </>
  );
}
export default ProductList;
