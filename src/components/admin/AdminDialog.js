import * as React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';



import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid, TextField, DialogTitle, Dialog
} from '@material-ui/core';
import { getToken } from 'src/helper/helpers';
import axios from 'axios';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';



export default function AdminDialog(props) {


  const { incrementCounter, onClose, open, users } = props;

  const [alertopen, setAlertOpen] = React.useState(false);

  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };




  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      {alertopen && (<LoadingProgress />)}

      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <Formik
          initialValues={{

            firstname: users != null ? users.first_name : '',
            lastname: users != null ? users.last_name : '',
            username: users != null ? users.username : '',
            email: users != null ? users.email : '',
            password: '',

          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            firstname: Yup.string().max(255).required('First Name is required'),
            lastname: Yup.string().max(255).required('Last Name is required'),
            username: Yup.string().max(255).required('User Name is required'),
            password: Yup.string().max(255).required('Password is required'),
          })}
          onSubmit={values => {

            handleClickAlertOpen();
            const data = {
              username: values.username,
              first_name: values.firstname,
              last_name: values.lastname,
              email: values.email,
              password: values.password,
            }
            if (users != null) {
              axios.put(`${process.env.REACT_APP_BASE_URL}/users/${users.id}`, data, {
                headers: {
                  authorization: `Bearer ${getToken()}`
                }
              }
              )
                .then((res) => {
                  if (res.status === 200) {
                    // incrementCounter();
                    handleAlertClose();
                    onClose();
                    incrementCounter();
                    console.log(res);
                  }

                })
                .catch((err) => {
                  handleAlertClose();
                  onClose();
                  console.log(err);

                })

            } else {

              axios.post(`${process.env.REACT_APP_BASE_URL}/users`, data, {
                headers: {
                  authorization: `Bearer ${getToken()}`
                }
              }
              )
                .then((res) => {
                  handleAlertClose();
                  onClose();
                  incrementCounter();
                  console.log(res);
           

                })
                .catch((err) => {
                  handleAlertClose();
                  onClose();
                  console.log(err)

                })
            }
          }
          }

        >

          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader
                  subheader="The information can be edited"
                  title="Profile"
                />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                  >

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.firstname && errors.firstname)}
                        fullWidth
                        helperText={touched.firstname && errors.firstname}
                        label="First Name"
                        margin="normal"
                        name="firstname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.firstname}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.lastname && errors.lastname)}
                        fullWidth
                        helperText={touched.lastname && errors.lastname}
                        label="Last Name"
                        margin="normal"
                        name="lastname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.lastname}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.username && errors.username)}
                        fullWidth
                        helperText={touched.username && errors.username}
                        label="User Name"
                        margin="normal"
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.username}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Name"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                    </Grid>


                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"


                  >
                    Save
          </Button>

                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  )
}
