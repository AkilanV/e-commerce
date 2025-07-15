import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

const ProductCard: React.FC<Props> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 360,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 0,
        border: "1px solid",
        borderColor: "#e0e0e0",
        bgcolor: "#fff",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 2,
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: 200,
          objectFit: "contain",
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #eee",
        }}
      />

      <CardContent sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            height: 48,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </Typography>
        <Typography variant="h6" color="primary" mt={1}>
          ${product.price}
        </Typography>
      </CardContent>

      <Box px={2} pb={2} mt="auto">
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => onViewDetails(product)}
          >
            View
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="small"
            startIcon={<ShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default ProductCard;
