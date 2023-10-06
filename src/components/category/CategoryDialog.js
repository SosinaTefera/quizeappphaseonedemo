import * as React from 'react';

import {Formik } from 'formik';
import * as Yup from 'yup';

import { Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid, TextField,  DialogTitle, Dialog } from '@material-ui/core';
import AddAlert from 'src/components/alertdialog/AddAlert';
export default function CustomersDialog(props) {

    const {incrementCounter,handleSnackOpen, onClose, open } = props;
    const [data,setData] = React.useState(); 
    const [add,setAdd] = React.useState(false);

    return (
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {add &&(<AddAlert handleSnackOpen={handleSnackOpen} data={data} parentClose={onClose} incrementCounter={incrementCounter} setAdd={()=>setAdd(false)}/>)}
      <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Category</DialogTitle>
      <Formik
            initialValues={{
             
              name: '',
             
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Password is required')
            })}
            onSubmit={values => {
              const name = values.name;
              const data = {
                name: values.name
              }
              setData(data);
              setAdd(true);
            //   axios.post(`${process.env.REACT_APP_BASE_URL}/categories`,{name: values.name},
            //   {
            //     headers: {
            //         authorization: `Bearer ${getToken()}`
            //     }
            // }).then((res)=>{
            //     incrementCounter();
            //     onClose();

            //   }).catch((err)=>{
            //     console.log(err)
            //   })          
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
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
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


