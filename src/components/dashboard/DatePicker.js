import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Switch, styled,FormGroup,FormControlLabel
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import * as React from 'react';
import CalendarToday from '@mui/icons-material/CalendarToday';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';
import moment from 'moment';


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));



const DatePicker = (props) => {
    const [checked,setChecked]=React.useState(false);
    const handleChecked = (event)=>{
        setChecked(event.target.checked);
        
        axios.put(`${process.env.REACT_APP_BASE_URL}/exam-dates/1`,
                { startExam: !checked },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        //console.log(res)
                        console.log(res)
                    }
                })

    }
   
    const [value, setValue] = React.useState(new Date(moment().format("DD-MM-YYYY hh:mm:ss")));
    const [alertopen, setAlertOpen] = React.useState(false);

    const handleClickAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    const handleClick = () => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/exam-dates/1`,
            { exactTimeAndDate: value },
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }).then((res) => {
                if (res.status == 200) {
                    handleClickAlertOpen();
                    //console.log(res)
                }
                console.log(res)
            })
        console.log(value)
    }
    return (
        <Card {...props}>
            <Dialog
                open={alertopen}
                keepMounted
                onClose={handleAlertClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Date Updated Successfully.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose}>Okay</Button>
                </DialogActions>
            </Dialog>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            Exam Date
                    </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: red[600],
                                height: 40,
                                width: 40
                            }}
                        >
                            <CalendarToday />

                        </Avatar>
                    </Grid>



                    <Grid item>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDateTimePicker
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                label="Pick Date"
                                onError={console.log}
                                minDate={new Date('2018-01-01T00:00')}
                                inputFormat="yyyy/MM/dd hh:mm a"
                                mask="___/__/__ __:__ _M"
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        {/* <Android12Switch defaultChecked /> */}
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch checked={checked} onChange={handleChecked} />}
                                label="Start Exam"
                            />
                        </FormGroup>

                    </Grid>
                    <Grid item  >
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                pt: 2
                            }}
                        >


                            <Button
                                color="textSecondary"
                                sx={{
                                    color: red[900],
                                    mr: 1
                                }}
                                variant="caption"
                                onClick={handleClick}
                            >
                                Set Date
                            <ArrowUpwardIcon sx={{ color: red[900] }} />

                            </Button>

                        </Box>

                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}

export default DatePicker;
