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
  
  import * as React from 'react';
  import {useNavigate} from 'react-router-dom';
  
  const ResourcesListToolbar = ({incrementCounter,category, ...rest}) => {
  
  
    let navigate = useNavigate();
  
    
    return(
    <Box >
    
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={()=>{navigate('/app/questions/createresource',{state:{category:category}})}}
        >
          Add Resource
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
  
  export default ResourcesListToolbar;
  