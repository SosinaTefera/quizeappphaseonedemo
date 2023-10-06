import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Admin from 'src/pages/AdminList'
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import AddCustomer from 'src/components/customer/AddCustomer';
import AddResource from 'src/components/additionalresources/AddResource';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'customers/create', element: <AddCustomer /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'questions', element: <ProductList /> },
      { path: 'questions/createresource', element: <AddResource /> },
      { path: 'settings', element: <Settings /> },
      { path: 'admin', element: <Admin /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;

export const unAuthorisedroutes = [{
  path: '/',
  element: <MainLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '404', element: <NotFound /> },
    { path: '/', element: <Navigate to="/login" /> },
    { path: '*', element: <Navigate to="/login" /> }
  ]
}]
