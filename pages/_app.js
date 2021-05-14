import '../styles/globals.css'
import Container from '@material-ui/core/Container'
import MenuItems from '../components/MenuItems';
import manifest from '../scripts/manifest';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';import { useState } from 'react';
import '../styles/vs2015.css';
import '../styles/vs.css';
import Header from '../components/Header';
import DarkModeSwitch from '../components/DarkModeSwitch';

function MyApp({ Component, pageProps }) {
  return (
    // See /components/DarkModeSwitch.jsx
    <div id="dark-root" className='dark' >
      <Container>
        <Box display='flex'>
          <Header />
          <MenuItems titles={manifest} />
          <Container maxWidth='md'>
            <Component {...pageProps} />
          </Container>
        </Box>
      </Container>
    </div>
  )
}

export default MyApp
