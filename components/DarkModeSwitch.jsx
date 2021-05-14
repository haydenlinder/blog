import Switch from '@material-ui/core/Switch';
import { useState } from 'react';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import useTheme from '../styles/theme';

export default function DarkModeSwitch() {
    const { theme, isDark, setIsDark } = useTheme();

    const toggleDarkMode = e => {
        setIsDark(e.target.checked)
        const [toBeAdded, toBeRemoved] = e.target.checked ? ['dark', 'light'] : ['light', 'dark'];
        const darkRoot = document.getElementById('dark-root');
        darkRoot.classList.remove(toBeRemoved);
        darkRoot.classList.add(toBeAdded);
    };

    return (
        <Switch
            checked={isDark}
            color={isDark ? 'secondary' : 'primary'}
            onChange={toggleDarkMode}
            name="dark-mode"
            icon={<Brightness4Icon />}
            checkedIcon={<Brightness7Icon />}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    );
};