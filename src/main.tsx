import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import { store } from './store/store';
import { createAppTheme } from './theme/theme';
import './styles/index.css';

const Root = () => {
  const mode = store.getState().theme.mode;
  const [theme, setTheme] = React.useState(createAppTheme(mode));

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newMode = store.getState().theme.mode;
      setTheme(createAppTheme(newMode));
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);