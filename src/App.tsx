import React, { createContext, useMemo, useState } from 'react';
import './App.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import theme from './theme';
// eslint-disable-next-line import/no-cycle
import RootRouter from './common/RootRouter';
import 'react-toastify/dist/ReactToastify.css';

interface AuthContextType {
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(
    (window?.innerWidth || 0) > 899,
  );

  const value = useMemo(
    () => ({ isDrawerOpen, setDrawerOpen }),
    [isDrawerOpen, setDrawerOpen],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={value}>
        <RootRouter />
      </AuthContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
