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
  Grid, TextField, DialogTitle, Dialog, MenuItem
} from '@material-ui/core';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';



export default function CustomersDialog(props) {
  const Services = [
    {
      value: 1,
      label: 'Silver',
    },
    {
      value: 2,
      label: 'Golden',
    },
  ];


  const { country, category, incrementCounter, onClose, open, product } = props;
  const [alertopen, setAlertOpen] = React.useState(false);

  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const [service, setService] = React.useState("");

  const handleChanges = (event) => {
    setService(event.target.value);
  };
  const [cats, setCategory] = React.useState('');
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }
  const [location, setLocation] = React.useState('');
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }
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
        <DialogTitle>Update Customer Profile</DialogTitle>
        <Formik
          initialValues={{
            email: product != null ? product.email : '',
            firstname: product != null ? product.firstName : '',
            lastname: product != null ? product.lastName : '',
            voucher: product != null ? product.voucher : '',
            id: product != null ? product.id : '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            firstname: Yup.string().max(255).required('First Name is required'),
            lastname: Yup.string().max(255).required('Last Name is required'),
          })}
          onSubmit={values => {
            console.log("testttttt");

            handleClickAlertOpen();
            const firstname = values.firstname;
            const lastname = values.lastname;
            const email = values.email;
            const voucher = values.voucher


            console.log("testttttt");

            if (product != null) {
              //console.log("testttttt");


              axios.put(`${process.env.REACT_APP_BASE_URL}/customers/${product.id}`, {
                firstName: firstname,
                lastName: lastname,
                email: email,
                voucher: voucher,
                service: { id: service }
              }, {
                headers: {
                  authorization: `Bearer ${getToken()}`
                }
              }).then((res) => {
                handleAlertClose()
                onClose();
                incrementCounter();
                console.log(res);
              }).catch((err) => {
                console.log(err);
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
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
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
                        error={Boolean(touched.voucher && errors.voucher)}
                        fullWidth
                        helperText={touched.voucher && errors.voucher}
                        label="Voucher"
                        margin="normal"
                        name="voucher"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.voucher}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        id="outlined-select-service"
                        select
                        label="Country"
                        name='country'
                        value={location}
                        onChange={handleLocationChange}
                        helperText="Please select Your Location"
                        required
                      >
                        {country.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>


                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField

                        id="outlined-select-category"
                        select
                        label="Service"
                        value={service}
                        onChange={handleChanges}
                        helperText="Please select Service"
                        required
                      >
                        {Services.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        id="outlined-select-category"
                        select
                        label="Category"
                        value={cats}
                        onChange={handleCategoryChange}
                        helperText="Please select Category"
                        required
                      >
                        {category.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

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
                    Update
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