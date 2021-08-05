import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Modal } from '@material-ui/core';
import dynamic from 'next/dynamic';

const Drawer = dynamic(() => import("./Dawer"), {
    loading: () =>
    <Modal open={true}>
        <CircularProgress style={{ position: 'absolute', margin: 'auto', top: 0, right: 0, left: 0, bottom: 0 }} />
    </Modal>
});

function MenuWrapper({ children, isMenuOpen, setIsMenuOpen, isLargerThanTablet, ...others }) {
    
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
    const classes = useStyles();

    return (
        <>
            <Box pr={5} className='menu' {...others}>{children}</Box>
            {!isLargerThanTablet && isMenuOpen &&
                <Drawer
                    classes={classes}
                    PaperProps={{ className: classes.paper }}
                    anchor='left'
                    open={isMenuOpen}
                    onClose={e => setIsMenuOpen(false)}
                    onOpen={e => setIsMenuOpen(true)}
                >{children}</Drawer>
            }
        </>
    );
}

export default function MenuItems({titles, isMenuOpen, setIsMenuOpen, isLargerThanTablet, isDark}) {
    return (
        <MenuWrapper {...{isMenuOpen, setIsMenuOpen, isLargerThanTablet}}>
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
    );
};