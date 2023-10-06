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
    Grid, TextField, DialogTitle, Dialog, Avatar, MenuItem
} from '@material-ui/core';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';



export default function AdminDialog(props) {
    const { incrementCounter, onClose, open, resource, category } = props;
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
                <DialogTitle>Add Resources</DialogTitle>
                <Formik
                    initialValues={{
                        description: resource != null ? resource.description : '',
                        title: resource != null ? resource.title : '',
                        image: resource != null && resource.image!= null? resource.image.url : '',

                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().max(255).required('Title is required'),
                        description: Yup.string().max(255).required('Description is required')
                    })}
                    onSubmit={values => {

                        handleClickAlertOpen();
                        const description = values.description;
                        const title = values.title;
                        const formData = new FormData();


                        axios.put(`${process.env.REACT_APP_BASE_URL}/additional-resources/${resource.id}`, { title: title, description: description, category: { id: cats } }, {
                            headers: {
                                authorization: `Bearer ${getToken()}`
                            }
                        }).then((res) => {
                            incrementCounter();
                            onClose();
                            if (image.avatar !== "Image") {
                                formData.append('files', image.avatar)
                                formData.append('field', 'image');
                                formData.append('ref', 'additional-resources');
                                formData.append('refId', res.data.id);
                                axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        authorization: `Bearer ${getToken()}`
                                    }
                                }).then((res) => {
                                    console.log(res);
                                    handleAlertClose();

                                }).catch((err) => {
                                    console.log(err);
                                })
                            }else {
                                handleAlertClose();
                            }
                        }).catch((err) => {
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
                            <Card>
                                <CardHeader
                                    subheader="The information can be edited"
                                    title="Resources"
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
                                                {category.map((option) => (
                                                    <MenuItem key={option.label} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                        </Grid>




                                    </Grid>

                                    <Grid container justifyContent="center" alignItems="center">
                                        <Grid
                                            item
                                        >
                                            <Avatar
                                                src={
                                                    resource!=null? `${process.env.REACT_APP_BASE_URL}${values.image}`:
                                                    "N"} sx={{


                                                        height: 100,
                                                        width: 100
                                                    }} variant="square">
                                                Image
                                            </Avatar>
                                        </Grid>

                                    </Grid>





                                    <Grid container >

                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
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




            </Dialog>
        </Box>
    )
}


