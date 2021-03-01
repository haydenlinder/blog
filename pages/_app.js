import '../styles/globals.css'
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/vs2015.css';
import Container from '@material-ui/core/Container'
import MenuItems from '../components/MenuItems';
import manifest from '../scripts/manifest';
import Box from '@material-ui/core/Box';

function MyApp({ Component, pageProps }) {
  
  return (
    <Container>
      <Box display='flex'>
        <MenuItems titles={manifest} />
        <Container maxWidth='md'>
          <Component {...pageProps} />
        </Container>
      </Box>
    </Container>
  )
}

export default MyApp
