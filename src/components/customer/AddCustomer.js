import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';
import {
    Box,
    Button,
    Container,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Grid,
    MenuItem,
    TextField,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel
} from '@material-ui/core';
import { getToken } from 'src/helper/helpers';
import * as React from 'react';
import Voucher from 'voucher-code-generator';
import { LocationCity } from '@mui/icons-material';


const AddCustomer = () => {

    const [radio, setRadio] = React.useState('');
    const handleRadioChange = (event) => {
        setRadio(event.target.value);


    };

    const navigate = useNavigate();
    const [alertopen, setAlertOpen] = React.useState(false);
    const handleClickAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    const Services = [
        {
            value: 1,
            label: 'Silver',
        },
        {
            value: 2,
            label: 'Gold',

        },
        {
            value: 3,
            label: 'Platinum',

        },
    ];
    const [service, setService] = React.useState('');

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
    console.log(location.state);

    const [examcat, setexamcat] = React.useState({
        response: [],
    
      })
      const [country, setCountry] = React.useState({
        response: [],
    
      })


    React.useEffect(() => {
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


        })

    }, []);
    console.log(examcat.response);
    return (
        <>
            <Helmet>
                <title>Customers | Quiz App</title>
            </Helmet>


            {alertopen && (<LoadingProgress />)}
            {/* {snackopen && (<SuccessSnackBar />)} */}





            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >

                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            email: '',
                            firstname: '',
                            lastname: '',
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            firstname: Yup.string().max(255).required('First Name is required'),
                            lastname: Yup.string().max(255).required('Last Name is required'),

                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            const firstname = values.firstname;
                            const lastname = values.lastname;
                            const email = values.email;
                            const voucher = Voucher.generate({
                                length: 8,
                            })[0];

                            const data = {
                                firstName: firstname,
                                lastName: lastname,
                                email: email,
                                voucher: voucher,
                                service: { id: service },
                                category: { id: cats },
                                location: {id: location},
                                gender: radio,
                            }

                            handleClickAlertOpen();




                            axios.post(`${process.env.REACT_APP_BASE_URL}/customers`, data,
                                {
                                    headers: {
                                        authorization: `Bearer ${getToken()}`
                                    }
                                }).then((res) => {
                                    navigate('/app/customers', { replace: true, state: { snack: true } });
                                    //handleSnackOpen();
                                    handleAlertClose();
                                    //setSnackOpen(true);
                                }).catch((err) => {
                                })

                        }}

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

                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Gender</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-label="gender"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                        value={radio}
                                                        onChange={handleRadioChange}


                                                    >
                                                        <FormControlLabel value="Female" control={<Radio required={true} />} label="Female" />
                                                        <FormControlLabel value="Male" control={<Radio required={true} />} label="Male" />
                                                    </RadioGroup>
                                                </FormControl>
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
                                                    id="outlined-select-service"
                                                    select
                                                    label="Country"
                                                    name='country'
                                                    value={location}
                                                    onChange={handleLocationChange}
                                                    helperText="Please select Your Location"
                                                    required
                                                >
                                                    {country.response.map((option) => (
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
                                                    id="outlined-select-service"
                                                    select
                                                    label="Category"
                                                    name='category'
                                                    value={cats}
                                                    onChange={handleCategoryChange}
                                                    helperText="Please select Category"
                                                    required
                                                >
                                                    {examcat.response.map((option) => (
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
                                            Save details
          </Button>

                                    </Box>
                                </Card>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
};

export default AddCustomer;
