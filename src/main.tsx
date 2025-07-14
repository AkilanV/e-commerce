import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Router';
import { Provider } from 'react-redux';
import store from './store/store';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './context/CardContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
      >
         <CartProvider>
        <App />
        </CartProvider>
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
