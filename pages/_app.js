import '../styles/globals.css';
import Container from '@material-ui/core/Container';
import MenuItems from '../components/MenuItems';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import useTheme from '../styles/theme';
import { useState, useEffect } from 'react';
import '../styles/vs2015.css';
import '../styles/vs.css';
import Header from '../components/Header';
import { useMediaQuery } from '@material-ui/core';

export default function MyApp({ Component, pageProps }) {

  const { theme } = useTheme()
  const [showMenu, setShowMenu] = useState(true)

  const isLargerThanTablet = useMediaQuery('(min-width: 750px)');

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    setShowMenu(isLargerThanTablet);
  },[isLargerThanTablet])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className='container'>
        <Box display='flex' pt={8} px={2} width='100%'>
          {showMenu && <MenuItems titles={pageProps.titles} />}
          <Box minWidth='60%' className='page' pb={20}>
            <Component {...pageProps} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
