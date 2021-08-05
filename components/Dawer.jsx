import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

export default function Drawer({children, ...props}) {
    return <SwipeableDrawer {...props} >{children}</SwipeableDrawer>;
}