import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Link from 'next/link'
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function MenuItems({titles, isMenuOpen, setIsMenuOpen}) {

    const classes = useStyles();
    
    return isMenuOpen ?
    // <SwipeableDrawer
    //     classes={classes}
    //     anchor='left'
    //     open={isMenuOpen}
    //     onClose={e => setIsMenuOpen(false)}
    //     onOpen={e => setIsMenuOpen(true)}
    // >
        <Box pr={5} className='menu'>
            <h1>
                Posts
            </h1>
            <List className='hljs'>
                {titles.map(title => 
                    <div key={title} className='list-item'>
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
        </Box>
    // </SwipeableDrawer>
    : null;
};