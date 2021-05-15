import { Box, Divider, List, ListItem, Typography } from '@material-ui/core'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.primary.main,
    },
}));
export default function MenuItems({ titles }) {
    const classes = useStyles()
    return (
        <Box pr={5}>
            <h1>
                Posts
            </h1>
            <List className='hljs'>
                {titles.map(title => 
                    <div key={title} className='list-item'>
                    <Link  href={`/${title}`}  passHref>
                        <ListItem button>
                            <Typography>
                                    <a href={`/${title}`}>{title}</a>
                            </Typography>
                        </ListItem>
                    </Link>
                </div>
                )}
            </List>
        </Box>
    )
}