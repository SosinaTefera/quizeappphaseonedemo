import { useEffect,useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import {

  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,

  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import SupervisorAccount from '@mui/icons-material/SupervisorAccountOutlined';
import { getUsername, getRole, logout } from 'src/helper/helpers';
import { blue } from '@material-ui/core/colors';
import {useNavigate} from 'react-router-dom';



const user = {
  avatar: '/static/images/avatars/',
  jobTitle: 'Super Admin',
  name: 'Micky'
};



const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/admin',
    icon: SupervisorAccount,
    title: 'Admin Users'
  },
  {
    href: '/app/questions',
    icon: ShoppingBagIcon,
    title: 'Exams'
  },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Resources'
  },

  
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);

  const handleOpen=()=>{
    setOpen(true);
  }

  const handleClose=()=>{
    setOpen(false);
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Warning"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    
                    Are You Sure You Want To Logout?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={()=>{logout(()=>{
                navigate('/login', { replace: true });
              })}}>Yes</Button>
            </DialogActions>
        </Dialog>

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            backgroundColor: blue[900],
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {getUsername()}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {getRole()}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <ListItem
            disableGutters
            sx={{
              display: 'flex',
              py: 0
            }}

          >
            <Button

              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',

                '& svg': {
                  mr: 1
                }
              }}

              onClick={handleOpen}
            >
              <AlertCircleIcon size="20" />
        LogOut
      </Button>

          </ListItem>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >

        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
