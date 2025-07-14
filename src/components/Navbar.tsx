import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/RootReducer';
import CartDrawerModal from './CartDrawerModal';

const Navbar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cartState.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            onClick={() => navigate('/dashboard')}
            sx={{ cursor: 'pointer' }}
          >
            ShopNow
          </Typography>
          <Box display="flex" gap={2}>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/dashboard?category=electronics')}
            >
              Electronics
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/dashboard?category=clothing')}
            >
              Clothing
            </Button>
          </Box>
          <IconButton color="inherit" onClick={() => setModalOpen(true)}>
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 64 }} />

      {/* Center Modal */}
      <CartDrawerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
