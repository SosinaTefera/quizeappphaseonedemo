import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import {isAuthenticated} from 'src/helper/helpers';
import {unAuthorisedroutes} from 'src/routes';



const App = () => {
  const routing = useRoutes(routes);
  const unauthrouting = useRoutes(unAuthorisedroutes);
 

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {isAuthenticated()? routing : unauthrouting}

    </ThemeProvider>
  );
};

export default App;
