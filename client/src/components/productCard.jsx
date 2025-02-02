import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  IconButton,
  ThemeProvider,
  createTheme,
  Box,
  Divider
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import AppTheme from '../theme';
import addToCart from '../utils/addToCart';


const ProductCard = ({ id, image, name, price }) => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={AppTheme}>
      <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={id}>
      
      <Card className="relative max-w-sm hover:shadow-lg transition-shadow duration-300"
      to={`/product/${id}`}
      >
      
     
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          className="h-48 object-cover"
        />
        <Divider 
        sx={{
            borderBottomWidth: 5,
            borderStyle: 'double',
            borderColor: 'black',
        }} />

        <CardContent className="p-4">
          <Typography variant="h6" component="h2" className="font-semibold mb-2">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary" className="mb-4">
            ₹{price}
          </Typography>
          <Box className="flex justify-between items-center">
            <Link 
              to={`/product/${id}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Details
            </Link>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToCart(id, 1, navigate)
                // redirect to car
                
              }}

              color="primary"
              className="hover:bg-gray-100"
            >
              <ShoppingCart />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      </Link>
    </ThemeProvider>
  );
};

export default ProductCard;
