import '../styles/globals.css';
import Container from '@material-ui/core/Container';
import MenuItems from '../components/MenuItems';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState, useEffect, useMemo } from 'react';
import '../styles/vs2015.css';
import '../styles/vs.css';
import Header from '../components/Header';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { manifest } from '../manifest/manifest'
import red from '@material-ui/core/colors/red';

export default function MyApp({ Component, pageProps }) {

  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const isLargerThanTablet = useMediaQuery(
    '(min-width: 750px)', 
    { defaultMatches: true }
  );

  const theme = useMemo(() => createMuiTheme({
    palette: {
      primary: {
        main: isDark ? '#1f1f1f' : '#ffffff',
        light: isDark ? '36cdff' : '#36cdff',
        dark: isDark ? '36cdff' : '#36cdff'
      },
      secondary: {
        main: isDark ? '#ffffff' : '#1f1f1f'
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#ffffff',
      },
      default: {
        main: '#36cdff',
      }
    },
  }), [isDark]);
  
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(isLargerThanTablet);
  }, [isLargerThanTablet]);

  return (
    <ThemeProvider theme={theme}>
      <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen || isLargerThanTablet} isDark={isDark} setIsDark={setIsDark}/>
      <Container className='container'>
        <MenuItems 
          isMenuOpen={isMenuOpen || isLargerThanTablet}
          isLargerThanTablet={isLargerThanTablet}
          setIsMenuOpen={setIsMenuOpen} 
          titles={manifest} 
        />
        <Box className='page' pb={20}>
          <Component {...pageProps} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
