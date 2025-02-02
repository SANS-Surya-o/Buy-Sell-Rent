import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    IconButton,
    Button,
    Divider,
    Grid,
    Card,
    CardMedia,
    CardContent,
    ThemeProvider,
    Alert,
    CircularProgress,
    // CardOverflow,
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AppTheme from '../theme';
import { GET_CART_ITEMS_URL } from '../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(GET_CART_ITEMS_URL, { withCredentials: true });
          setCartItems(response.data);
        } catch (err) {
        console.log('Error fetching cart items:', err);
          setError('Failed to fetch cart items');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCartItems();
    }, []);
  
    const updateQuantity = (id, change) => {
      setCartItems(items =>
        items.map(item =>
          item.product._id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        )
      );
    };
  
    const removeItem = (id) => {
      setCartItems(items => items.filter(item => item.product._id !== id));
    };
  
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
    if (loading) return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  
    if (error) return <Alert severity="error">{error}</Alert>;
  
    if (cartItems.length === 0) {
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box textAlign="center">
            <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      );
    }
  
    return (
        <ThemeProvider theme={AppTheme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Shopping Cart
        </Typography>
  
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
            <Link to={`/product/${item.product._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={item.product._id}>
              <Card key={item.product._id} sx={{ mb: 2, display: 'flex', border: 'none' }}>
                {/* <CardOverflow> */}
                <CardMedia
                  component="img"
                  sx={{ width: 140, objectFit: 'cover' }}
                  image={item.product.image}
                  alt={item.product.name}
                />
                <CardContent 
                  sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    position: 'relative',
                    pr: 6 // Add padding to accommodate delete button
                  }}
                >
                  <Box>
                    <Typography variant="h6">{item.product.name}</Typography>
                   
                    <Typography variant="subtitle1" color="primary">
                      ₹{item.product.price * item.quantity}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        updateQuantity(item.product._id, -1)}}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        updateQuantity(item.product._id, 1)}}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
  
                  <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        removeItem(item.product._id)
                    }}
                    sx={{ 
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
                {/* </CardOverflow> */}
              </Card>
            </Link>
            ))}
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal</Typography>
                <Typography>₹{totalPrice}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹{totalPrice}</Typography>
              </Box>
  
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      </ThemeProvider>  
    );
  };
  

export default Cart;