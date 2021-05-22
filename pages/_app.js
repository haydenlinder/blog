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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { manifest } from '../manifest/manifest'

export default function MyApp({ Component, pageProps }) {

  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const isLargerThanTablet = useMediaQuery('(min-width: 750px)');

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(isLargerThanTablet);
  }, [isLargerThanTablet])

  return (
    <ThemeProvider theme={theme}>
      <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <Container className='container'>
        <MenuItems 
          isMenuOpen={isMenuOpen || isLargerThanTablet}
          setIsMenuOpen={setIsMenuOpen} 
          titles={manifest} 
        />
        <Box className='page' pb={20}>
          <Component {...pageProps} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
