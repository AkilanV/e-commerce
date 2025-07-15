import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/RootReducer';
import CartDrawerModal from './CartDrawerModal';
import MechanicImg from '../assets/Images/mechanic.png';
import shopNow from '../assets/Images/shopNow.jpg';

const Navbar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const cartItems = useSelector((state: RootState) => state.cartState.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    navigate('/');
  };

  const handleNav = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Electronics', path: '/dashboard?category=electronics' },
    { label: 'Clothing', path: '/dashboard?category=clothing' },
  ];

  return (
    <>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src={shopNow} alt="Logo" style={{ height: 40 }} />
          </Box>

          {isMobile || isTablet ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box display="flex" gap={2}>
              {navLinks.map((link) => (
                <Button key={link.label} color="inherit" onClick={() => navigate(link.path)}>
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton color="inherit" onClick={() => setModalOpen(true)}>
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={handleProfileClick} sx={{ color: 'blue', fontSize: 35 }}>
              <AccountCircleRoundedIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: 64 }} />

      <CartDrawerModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
          <List>
            {navLinks.map((link) => (
            <ListItem 
              key={link.label} 
              component="button" 
              onClick={() => handleNav(link.path)} 
              sx={{ textAlign: 'left' }}
            >
              <ListItemText primary={link.label} />
            </ListItem>

            ))}
          </List>
        </Box>
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: isMobile ? 250 : 300,
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
          }}
        >
          <img src={MechanicImg} alt="Profile" style={{ maxWidth: '22%' }} />
          <Divider sx={{ width: '100%', mt: 2, mb: 1 }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'error.main',
              fontWeight: 'bold',
              width: '100%',
            }}
          >
            <Typography sx={{ flex: 1, textAlign: 'left' }}>Logout</Typography>
            <LogoutIcon sx={{ fontSize: isMobile ? 18 : 20 }} />
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default Navbar;
