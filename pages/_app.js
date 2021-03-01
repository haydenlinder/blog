import '../styles/globals.css'
import 'highlight.js/styles/vs.css';
import 'highlight.js/styles/vs2015.css';
import Container from '@material-ui/core/Container'
import MenuItems from '../components/MenuItems';
import manifest from '../scripts/manifest';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = e => {
    setIsDark(e.target.checked)
  }

  console.log({isDark})

  return (
    <Container>
      <Box display='flex'>
        <MenuItems titles={manifest} />
        <Switch
          checked={isDark}
          color='primary'
          onChange={toggleDarkMode}
          name="dark-mode"
          icon={<Brightness4Icon/>}
          checkedIcon={<Brightness7Icon />}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <Container maxWidth='md'>
          <Component {...pageProps} />
        </Container>
      </Box>
    </Container>
  )
}

export default MyApp
