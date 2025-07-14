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
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, category, sortOrder]);

  const uniqueCategories = ['all', ...new Set(products.map((p) => p.category || ''))];
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
    <Box display="flex" p={2} sx={{ maxWidth: '1440px', mx: 'auto', gap: 2 }}>
      {/* Filters Sidebar */}
      <Box
        minWidth={250}
        maxWidth={250}
        p={2}
        border="1px solid #ccc"
        borderRadius={2}
        bgcolor="#fafafa"
        flexShrink={0}
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
            {uniqueCategories.map((cat, idx) => (
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
          <Typography variant="body1" textAlign="center" gridColumn="1 / -1">
            No products found.
          </Typography>
        )}
      </Box>

      {/* Cart Sidebar */}
      <Box
        sx={{
          minWidth: 250,
          maxWidth: 300,
          width: 280,
          p: 2,
          bgcolor: '#ffffff',
          border: '1px solid #ccc',
          borderRadius: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" gutterBottom>🛒 Cart</Typography>

        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Total Items: {totalItems}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          cartItems.map((item) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              borderBottom="1px solid #eee"
              sx={{
                '&:hover': {
                  bgcolor: '#f9f9f9',
                },
              }}
            >
              <Box flex={1} mr={1}>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  color="text.primary"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ${item.price} × {item.quantity}
                </Typography>
              </Box>
              <IconButton
                size="small"
                color="error"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
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
