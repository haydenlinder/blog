import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import DarkModeSwitch from './DarkModeSwitch'

const Header = ({ }) => {
    return (
        <AppBar position="fixed">
            <Container>
                <Box mx={2} display='flex' alignItems='center' justifyContent='space-between'>
                    <Box display='flex' alignItems='center'>
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link href='/' passHref>
                            <Button color='inherit'>
                                <Typography>
                                    BLOG
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                    <DarkModeSwitch />
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;
