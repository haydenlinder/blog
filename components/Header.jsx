import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import DarkModeSwitch from './DarkModeSwitch'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useState, useEffect } from 'react'

const Header = ({ setIsMenuOpen, isMenuOpen, isDark, setIsDark }) => {

    const [shouldShowMenuButton, setShouldShowMenuButton] = useState(!isMenuOpen)
    const isLargerThanTablet = useMediaQuery('(min-width: 750px)');

    useEffect(() => {
        setShouldShowMenuButton(!isLargerThanTablet)
    }, [isLargerThanTablet]);
    
    return (
        <AppBar color={isDark ?'primary': 'secondary'} position="fixed">
            <Container>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box display='flex' alignItems='center'>
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            aria-label="menu"
                            className="menu-button"
                            onClick={e => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link href='/' passHref>
                            <Button color='inherit'>
                                {/* <Typography variant='h3'> */}
                                   <h1 style={{ margin: 0, padding: 0 }}>BLOG-MD</h1> 
                                {/* </Typography> */}
                            </Button>
                        </Link>
                    </Box>
                    <DarkModeSwitch isDark={isDark} setIsDark={setIsDark}/>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;
