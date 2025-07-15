import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Slider,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  type CartItem,
} from '../../store/feaures/cart/cartDetailsSlice';
import type { RootState } from '../../store/RootReducer';
import ProductCard from '../../components/ProductCard';
import CartModal from '../../components/CartModal';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartState.items);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/products');
      setProducts(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    if (category !== 'all') {
      if (category === 'clothing') {
        filtered = filtered.filter(
          (p) =>
            p.category?.toLowerCase() === "men's clothing" ||
            p.category?.toLowerCase() === "women's clothing"
        );
      } else if (category === 'home') {
        filtered = [...products];
      } else {
        filtered = filtered.filter((p) => p.category?.toLowerCase() === category);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, category, sortOrder, priceRange]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <Box
      display="flex"
      width="100%"
      maxWidth="1440px"
      mx="auto"
      px={2}
      gap={2}
      boxSizing="border-box"
    >
      {/* Filters Sidebar */}
      <Box
        sx={{
          width: 250,
          border: '1px solid #ccc',
          borderRadius: 2,
          bgcolor: '#fafafa',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          p: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" gutterBottom>Filters</Typography>

        <TextField
          label="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => {
              setCategory(e.target.value);
              navigate('/dashboard');
            }}
          >
            {['all', ...new Set(products.map((p) => p.category || ''))].map((cat, idx) => (
              <MenuItem key={idx} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Sort by Price</InputLabel>
          <Select
            value={sortOrder}
            label="Sort by Price"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>

        {/* Price Slider */}
        <Box mt={3}>
          <Typography variant="body2" gutterBottom>Price Range</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">${priceRange[0]}</Typography>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={2000}
              step={10}
              sx={{ flex: 1 }}
            />
            <Typography variant="body2">${priceRange[1]}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Product Grid */}
      <Box
        flex={1}
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={3}
        py={3}
        alignSelf="flex-start"
      >

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={(p) => {
                setSelectedProduct(p);
                setModalOpen(true);
              }}
            />
          ))
        ) : (
          Array.from({ length: 4 }).map((_, idx) => (
            <Paper
              key={idx}
              elevation={2}
              sx={{
                p: 4,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 280,
              }}
            >
              <Typography>No products found</Typography>
            </Paper>
          ))
        )}
      </Box>

      {/* Cart Sidebar */}
      <Box
        sx={{
          width: 250,
          border: '1px solid #ccc',
          borderRadius: 2,
          bgcolor: '#fff',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          p: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" gutterBottom>🛒 Cart</Typography>

        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">Total Items: {totalItems}</Typography>
          <Typography variant="body1" fontWeight="bold">Total Price: ${totalPrice.toFixed(2)}</Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Your cart is empty.</Typography>
        ) : (
          cartItems.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              gap={1}
              p={1}
              borderBottom="1px solid #eee"
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 1 }}
              />
              <Box flex={1}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.primary"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    fontSize: '13px',
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
      </Box>

      <CartModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </Box>
  );
};

export default ProductList;
