import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/feaures/cart/cartDetailsSlice';
import type { RootState } from '../store/RootReducer';
import { useSnackbar } from 'notistack';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawerModal: React.FC<CartModalProps> = ({ open, onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cartState.items);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handlePay = () => {
    onClose();
    enqueueSnackbar('Payment successful!', { variant: 'success' });
    dispatch(clearCart());
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        🛒 Your Cart
        <IconButton onClick={onClose} size="small" sx={{ ml: 2 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          cartItems.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
              borderBottom="1px solid #eee"
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: 'contain',
                  borderRadius: 1,
                  backgroundColor: '#f5f5f5',
                }}
              />

              <Box flex={1}>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  color="text.primary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ${item.price} × {item.quantity}
                </Typography>
              </Box>

              <IconButton size="small" color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))
        )}
      </DialogContent>

      {cartItems.length > 0 && (
        <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
          <Box>
            <Typography fontWeight="bold">Total Items: {totalItems}</Typography>
            <Typography fontWeight="bold">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handlePay}>
            Pay Now
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CartDrawerModal;
