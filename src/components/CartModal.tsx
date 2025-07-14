import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
}

interface CartModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const CartModal: React.FC<CartModalProps> = ({ open, product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {product.title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{ width: 200, height: 200, objectFit: 'contain', backgroundColor: '#f5f5f5', borderRadius: 2 }}
          />

          <Box flex={1}>
            <Typography variant="h6" gutterBottom>${product.price.toFixed(2)}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {product.description || 'No description available.'}
            </Typography>

            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>Available Sizes:</Typography>
              <Box display="flex" gap={1}>
                <Button variant="outlined" size="small">S</Button>
                <Button variant="outlined" size="small">M</Button>
                <Button variant="outlined" size="small">L</Button>
              </Box>
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>Colors:</Typography>
              <Box display="flex" gap={1}>
                <Box width={20} height={20} bgcolor="red" borderRadius="50%" />
                <Box width={20} height={20} bgcolor="blue" borderRadius="50%" />
                <Box width={20} height={20} bgcolor="green" borderRadius="50%" />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">Close</Button>
        <Button
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
          variant="contained"
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;
