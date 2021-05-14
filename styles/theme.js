import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { useEffect, useState } from 'react';

function getTheme(isDark) {
    return createMuiTheme({
        palette: {
            primary: {
                main: isDark ? '#1f1f1f' : '#ffffff',
            },
            secondary: {
                main: '#ffffff',
            },
            error: {
                main: red.A400,
            },
            background: {
                default: '#fff',
            },
        },
    })
}

export default function useTheme() {
    const [isDark, setIsDark] = useState(true);
    const [theme, setTheme] = useState(getTheme(isDark))

    useEffect(() => {
        setTheme(getTheme(isDark))
    }, [isDark])

    return { theme, isDark, setIsDark };
};