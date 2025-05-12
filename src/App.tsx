import LunchPicker from './LunchPicker';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect } from 'react';
import i18n from 'i18next';

export default function App() {
  useEffect(() => {
    const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.body.dir = dir;
  }, [i18n.language]);

  const theme = createTheme({
    direction: i18n.language === 'he' ? 'rtl' : 'ltr',
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9800',
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LunchPicker />
    </ThemeProvider>
  );
}
