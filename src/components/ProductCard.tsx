import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart, onViewDetails }) => {
  return (
<Card
  sx={{
    width: 300, 
    height: 320,       
    margin: 'auto',
    position: 'relative',
    transition: '0.3s',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover .hover-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }}
>
  <CardMedia
    component="img"
    image={product.image}
    alt={product.title}
    sx={{
      height: 200,
      objectFit: 'contain',
      backgroundColor: '#f9f9f9',
    }}
  />

  <CardContent sx={{ flexGrow: 1 }}>
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      gutterBottom
      sx={{
        minHeight: 48,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {product.title}
    </Typography>
    <Typography variant="h6" color="primary">
      ${product.price}
    </Typography>
  </CardContent>

  <Box
    className="hover-actions"
    sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.95)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      py: 1,
      opacity: 0,
      transform: 'translateY(100%)',
      transition: 'all 0.3s ease-in-out',
    }}
  >
    <Button size="small" onClick={() => onViewDetails(product)}>
      View
    </Button>
    <Button size="small" variant="contained" onClick={() => onAddToCart(product)}>
      Add to Cart
    </Button>
  </Box>
</Card>

  );
};

export default ProductCard;
