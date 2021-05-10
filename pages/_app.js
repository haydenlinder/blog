import '../styles/globals.css';
import Container from '@material-ui/core/Container';
import MenuItems from '../components/MenuItems';
import manifest from '../scripts/manifest';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import { useState, useEffect } from 'react';
import '../styles/vs2015.css';
import '../styles/vs.css';

function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(true);

  const toggleDarkMode = (e) => {
    setIsDark(e.target.checked);
  };

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={isDark ? 'dark' : 'light'}>
        <Container>
          <Box display='flex'>
            <MenuItems titles={manifest} />
            <Switch
              checked={isDark}
              color='primary'
              onChange={toggleDarkMode}
              name='dark-mode'
              icon={<Brightness4Icon />}
              checkedIcon={<Brightness7Icon />}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <Container maxWidth='md'>
              <Component {...pageProps} />
            </Container>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
