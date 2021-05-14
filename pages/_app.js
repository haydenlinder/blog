import '../styles/globals.css';
import Container from '@material-ui/core/Container';
import MenuItems from '../components/MenuItems';
import manifest from '../scripts/manifest';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeProvider } from '@material-ui/core/styles';
import useTheme from '../styles/theme';
import { useState, useEffect } from 'react';
import '../styles/vs2015.css';
import '../styles/vs.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {

  const { theme } = useTheme()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* See /components/DarkModeSwitch.jsx */}
      <div id="dark-root" className='dark'>
          <Header />
            <Container>
              <Box display='flex' justifyContent='baseline' py={10} px={2} width='100%'>
                <MenuItems titles={manifest} />
                <Box width='50%'>
                  <Component {...pageProps} />
                </Box>
              </Box>
            </Container>
      </div>
    </ThemeProvider>
  )
}

export default MyApp;
