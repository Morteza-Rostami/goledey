import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// react-router
import { BrowserRouter as Router } from 'react-router-dom';
// import our store and redux_stuff:
import store from './STORE/store';
// redux Provider
import { Provider } from 'react-redux';
// material ui theme
import { ThemeProvider } from '@mui/material/styles';
import theme from './THEME/mutheme';

/* snackbar */
import { SnackbarProvider} from 'notistack';

/* rtl */
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';


// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

/* loading screen */
// const loader = document.querySelector('.loader');
//const loader = document.querySelector('.screen-loader');


// if you want to show the loader when React loads data again
//const showLoader = () => loader.classList.remove('loader--hide');

//const hideLoader = () => loader.classList.add('loader--hide');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
      
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <SnackbarProvider 
              autoHideDuration={7000}
              maxSnack={3}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <App 
                //hideLoader={hideLoader}
                //showLoader={showLoader}
              />
            </SnackbarProvider>
          </Router>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);

