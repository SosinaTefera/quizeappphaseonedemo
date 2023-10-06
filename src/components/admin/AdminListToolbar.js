import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
  } from '@material-ui/core';
  import { Search as SearchIcon } from 'react-feather';
  import AdminDialog from './AdminDialog';
  import * as React from 'react';
  
  const AdminListToolbar = ({incrementCounter, ...rest}) => {
  
    const [open, setOpen] = React.useState(false);
  
 
    const handleClose = () => {
      setOpen(false);
    };
  
    return(
    <Box {...rest}>
      <AdminDialog
        onClose={handleClose}
        open={open}
        product={null}
      />
      
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={()=>{setOpen(true)}}
        >
          Add Admin
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
  }
  
  export default AdminListToolbar;
  