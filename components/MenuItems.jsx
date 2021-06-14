import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Link from 'next/link';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMemo } from 'react';

const Drawer = dynamic(
    () => import('@material-ui/core/SwipeableDrawer'),
    { loading: () => <CircularProgress className="loading"/> }
);


export default function MenuItems({titles, isMenuOpen, setIsMenuOpen, isLargerThanTablet, isDark}) {
    
    const useStyles = makeStyles(theme => ({
        root: {
            maxWidth: 150,
            width: 150,
        },
        paper: {
            background: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            padding: 20
        }
    }));
    
    const classes = useStyles()

    function MenuWrapper ({ children }) {
        return isLargerThanTablet ?
        <Box pr={5} className='menu'>{children}</Box>
        :
        <Drawer
            classes={classes}
            PaperProps={{ className: classes.paper }}
            anchor='left'
            open={isMenuOpen}
            onClose={e => setIsMenuOpen(false)}
            onOpen={e => setIsMenuOpen(true)}
        >{children}</Drawer>;
    }

    return isMenuOpen ?
        <MenuWrapper>
            <h1>
                Posts
            </h1>
            <List className='hljs menu-list'>
                {titles.map(title => 
                    <div onClick={e => setIsMenuOpen(false)} key={title} className='list-item'>
                        <Link href={`/posts/${title}`} passHref>
                            <ListItem button>
                                <Typography>
                                    <a>{title}</a>
                                </Typography>
                            </ListItem>
                        </Link>
                    </div>
                )}
            </List>
        </MenuWrapper>
    : null;
};