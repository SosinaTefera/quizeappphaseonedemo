import React from 'react';
import { getToken } from 'src/helper/helpers';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container, Grid, Divider, CardHeader, MenuItem
} from '@material-ui/core';

import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoadingProgress from 'src/components/alertdialog/LoadingProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialoog = (props) => {

  const { incrementCounter, handleClose, open, product, category } = props;



  let field = [];
  let i = 0;
  if (product != null) {

    var f = product.choice.split('\\n');

    for (i; i < f.length; i++) {
      field.push({ choice: f[i] })
    }
  }

  const [inputField, setInputeField] = React.useState(
    product != null ? field : [
      { choice: '' },
      { choice: '' },
      { choice: '' },
      { choice: '' }
    ]);


  const addfield = () => {
    setInputeField([...inputField, { choice: '' }])
  }
  const [cats, setCategory] = React.useState('');
  const handleChanges = (event) => {
    setCategory(event.target.value)
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    setInputeField(values);

  }

  const [alertopen, setAlertOpen] = React.useState(false);

  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };



  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
    {alertopen && (<LoadingProgress />)}




      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

          </Typography>
          <Button autoFocus color="inherit">
            save
            </Button>
        </Toolbar>
      </AppBar>

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
            question: product != null ? product.question : '',
            answer: product != null ? product.answerIndex : '',
            // inputfield: fixfield(),





          }}
          validationSchema={Yup.object().shape({
            question: Yup.string().max(255).required('Question is required'),
            answer: Yup.string().max(255).required('Answer index is required')
          })}
          onSubmit={values => {

            handleClickAlertOpen();


            let i = 0;
            let q = '';
            const n = "\\n";
            for (i = 0; i <= inputField.length - 1; i++) {
              i === 0 ? q += inputField[i].choice : q += n + inputField[i].choice;

            }

            const data = {
              question: values.question,
              choice: q,
              answerIndex: values.answer,
              category: { id: cats }

            }

            if (product!=null){
              axios.put(`${process.env.REACT_APP_BASE_URL}/exams/${product.id}`,
              data,
              {
                headers: {
                  authorization: `Bearer ${getToken()}`
                }
              }).then((res) => {
                handleAlertClose();
                incrementCounter();
                handleClose();
                console.log(res)
              })


            }else{
              axios.post(`${process.env.REACT_APP_BASE_URL}/exams`,
              data,
              {
                headers: {
                  authorization: `Bearer ${getToken()}`
                }
              }).then((res) => {
                handleAlertClose();
                incrementCounter();
                handleClose();
                console.log(res)
              })

            }



          }
          }

        >
          {({
            setFieldValue,
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

                  <Card>
                    <CardHeader

                      title="Question"
                    />
                    <CardContent style={{ maxHeight: 300, overflow: 'auto' }}>
                                          <Divider />


                      <TextField
                        error={Boolean(touched.question && errors.question)}
                        fullWidth
                        helperText={touched.question && errors.question}
                        label="Question"
                        multiline
                        rows={6}
                        margin="normal"
                        name="question"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.question}
                        variant="standard"
                      />
                                      
                      </CardContent>
                  </Card>
                    
                <Box sx={{ pt: 3 }}>

                  <Card>
                    <CardHeader

                      title="Choice"
                    />
                    <Divider />
                    <Grid
                      container
                      spacing={5}

                    >

                      <Grid
                        item
                        md={8}
                        xs={12}
                      >
                        <CardContent style={{ maxHeight: 200, overflow: 'auto' }}>

                          <Grid
                            container
                            spacing={5}

                          >


                            {inputField.map((field, index) => (

                              <Grid
                                item
                                md={6}
                                xs={12}
                              >
                                <div key={index}>



                                  <TextField
                                    name='choice'
                                    label='choice'
                                    value={inputField[index].choice}
                                    style={{ width: '80%' }}
                                    onChange={event => handleChangeInput(index, event)}
                                    variant="outlined"
                                    required
                                  >
                                  </TextField>

                                </div></Grid>

                            ))};

                            </Grid>
                            <Divider orientation="vertical" flexItem />


                        </CardContent>
                      </Grid>
                      

                      <Grid
                        item
                        md={4}
                        xs={12}
                      >
                        <TextField
                          error={Boolean(touched.answer && errors.answer)}
                          helperText={touched.answer && errors.answer}
                          label="Answer"
                          margin="normal"
                          name="answer"
                          rows={4}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.answer}
                          variant="outlined"
                        />
                        <Box sx={{pr:2}}>
                        <Grid
                        item
                        md={4}
                        xs={12}
                      >
                        <TextField
                          select
                          fullwidth
                          label="Select Category"
                          value={cats}
                          onChange={handleChanges}
                          variant="outlined"
                          required
                          helperText="Please select Category"
                        >
                          {category.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                      }}
                    >

                      <Grid
                        container
                        xs={12}
                      >

                        <Grid item xs={6}>
                          <Button variant="contained" startIcon={<AddIcon />}
                            onClick={addfield}
                          >
                            Add Choice
                        </Button>

                        </Grid>

                      </Grid>




                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Box>
                  </Card>

                </Box>
                </Container>
              </Box>

            </form>

          )}
        </Formik>


      </Box>



    </Dialog >
  );
}

export default Dialoog;
