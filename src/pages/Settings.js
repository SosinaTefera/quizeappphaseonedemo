import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Pagination from '@mui/lab/Pagination';

import ResourceCard from 'src/components/settings/ResourcesCard';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { getToken } from 'src/helper/helpers';

const SettingsView = () => {

  const [counter, updateCounter] = useState(0);
  const incrementCounter = () => {
    updateCounter(counter + 1);
  }
  const [state, setState] = useState({
    response: [],
  })
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/exam-resources`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    ).then((res) => {
      setState({ ...state, ['response']: res.data })
    })
  }, [counter])

  return (
    <>
      <Helmet>

        <title>Resources | Quiz App</title>
      </Helmet>
      {/* {snackopen && (<SuccessSnackBar />)} */}
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
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
              <ResourceCard incrementCounter={incrementCounter} resource={question} />
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
    </>);

}
export default SettingsView;
