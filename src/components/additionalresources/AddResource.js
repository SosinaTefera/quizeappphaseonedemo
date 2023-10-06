import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
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
    TextField, Avatar, CardActions

} from '@material-ui/core';
import { getToken } from 'src/helper/helpers';
import * as React from 'react';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';



const AddResource = (props) => {
    let navigate = useNavigate();

    let location = useLocation();

    const { resource } = props;
    const [image, setImage] = React.useState({
        avatar: 'Image'
    })
    

    const handleUploadClick = event => {
        var file = event.target.files[0];
        setImage({
            avatar: event.target.files[0]
        });
    };
    const [cats, setCategory] = React.useState('');
    const handleChanges = (event) => {
        setCategory(event.target.value);
    };
    const [alertopen, setAlertOpen] = React.useState(false);

    const handleClickAlertOpen = () => {
      setAlertOpen(true);
    };
    const handleAlertClose = () => {
      setAlertOpen(false);
    };

    return (
        <>
            <Helmet>
                <title>Additional Resources | Quiz App</title>
            </Helmet>
            {alertopen && (<LoadingProgress />)}


            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >

                <Formik
                    initialValues={{
                        description: resource != null ? resource.description : '',
                        title: resource != null ? resource.name : '',

                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().max(255).required('Title is required'),
                        description: Yup.string().max(255).required('Description is required'),
                    })}
                    onSubmit={values => {
                        const description = values.description;
                        const title = values.title;
                        const formData = new FormData();
                        handleClickAlertOpen();

                        axios.post(`${process.env.REACT_APP_BASE_URL}/additional-resources`, { title: title, description: description, category: { id: cats } }, {
                            headers: {
                                authorization: `Bearer ${getToken()}`
                            }
                        }).then((res) => {
                            console.log(res);
                       
                            if (image.avatar !== "Image") {

                                formData.append('files', image.avatar)
                                formData.append('field', 'image');
                                formData.append('ref', 'additional-resources');
                                formData.append('refId', res.data.id)
                                axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        authorization: `Bearer ${getToken()}`
                                    }
                                }).then((res) => {

                                    if (res.status === 200) {
                                        handleAlertClose();
                                        navigate(-1);
                                    }
                                    console.log(res);

                                }).catch((err) => {
                                    handleAlertClose();
                                    console.log(err);
                                })

                            } else {
                                handleAlertClose();
                                navigate(-1);
                            }


                        }).catch((err) => {
                            handleAlertClose();
                            console.log(err);
                        })




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

                            <Box
                                sx={{
                                    backgroundColor: 'background.default',
                                    minHeight: '100%',
                                    py: 3
                                }}
                            >
                                <Container maxWidth="lg">
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            lg={4}
                                            md={6}
                                            xs={12}
                                        >
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
                                                            variant="square"
                                                            src={
                                                                image.avatar!=="Image"? URL.createObjectURL(image.avatar):
                                                                "N"}
                                                            sx={{
                                                                height: 100,
                                                                width: 100
                                                            }}
                                                        />

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
                                                                onChange={handleUploadClick}

                                                            >
                                                                Upload picture
                                                </Button>


                                                        </label>


                                                    </Grid>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={8}
                                            md={6}
                                            xs={12}
                                        >
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
                                                                error={Boolean(touched.title && errors.title)}
                                                                fullWidth
                                                                helperText={touched.title && errors.title}
                                                                label="Title"
                                                                margin="normal"
                                                                name="title"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                type="text"
                                                                value={values.title}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            md={6}
                                                            xs={12}
                                                        >
                                                            <TextField
                                                                error={Boolean(touched.description && errors.description)}
                                                                fullWidth
                                                                helperText={touched.description && errors.description}
                                                                label="Description"
                                                                margin="normal"
                                                                name="description"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                multiline
                                                                rows="4"
                                                                value={values.description}
                                                                variant="outlined"
                                                            />
                                                        </Grid>


                                                        <Grid
                                                            item
                                                            md={6}
                                                            xs={12}
                                                        >
                                                            <TextField
                                                                select
                                                                label="Select Category"
                                                                value={cats}
                                                                onChange={handleChanges}
                                                                helperText="Please select Category"
                                                                required
                                                            >
                                                                {location.state.category.map((option) => (
                                                                    <MenuItem key={option.label} value={option.value}>
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
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default AddResource;
