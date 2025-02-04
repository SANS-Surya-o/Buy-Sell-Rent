import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Paper, CircularProgress, Alert, ThemeProvider, Grid,Divider } from '@mui/material';
import axios from 'axios';
import { GET_ORDERS_URL } from '../constants';
import  AppTheme  from '../theme';
// import link from 'react-router-dom';


const fetchOrders = async () => {
    try {
      const response = await axios.get(GET_ORDERS_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch orders', error);
      toast.error('Failed to fetch orders');
      throw error;
    }
  };

// Make this a react component
const CardComponent = ({ orders, otp }) => {
  return (
    <Grid container spacing={3}>
    {orders.length === 0 ? (
      <Grid item xs={12}>
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: '#f5f5f5'
          }}
        >
          {/* <LocalShippingIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} /> */}
          <Typography variant="h6">Nothing So far</Typography>
        </Paper>
      </Grid>
    ) : (
      orders.map(order => (
        <Grid item xs={12} key={order._id}>
          <Paper 
            sx={{
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6
              },
              border: 'none'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} >
                <Box
                  component="img"
                  src={order.product.image}
                  alt={order.product.name}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                    // border: 'none'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {order.product.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Quantity: {order.quantity}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  ₹{order.totalPrice}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {
                  otp && (
                    <Typography variant="h5" color="text.secondary">
                      OTP: {order.plainOtp}
                    </Typography>
                  )
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))
    )}
  </Grid>
  );
};


  const Orders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
  
    useEffect(() => {
      const getOrders = async () => {
        try {
          const data = await fetchOrders();
          console.log(data);
          setPendingOrders(data.pendingOrders);
          setBoughtItems(data.boughtItems);
          setSoldItems(data.soldItems);
        } catch (err) {
          setError('Failed to fetch orders');
        } finally {
          setLoading(false);
        }
      };
  
      getOrders();
    }, []);
  
    const handleTabChange = (event, newValue) => {
      setTabIndex(newValue);
    };
  
    if (loading) return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  
    if (error) return <Alert severity="error">{error}</Alert>;
  
    return (
      <ThemeProvider theme={AppTheme}>
      <Container maxWidth="lg" 
      sx={{ py: 6 ,
        minHeight: "100vh",
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
      }}
      >
        <Box sx={{ 
          mb: 6, textAlign: 'center'
          }
          }>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            My Orders
          </Typography>
        </Box>
  
        <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Tabs 
          value={tabIndex} 
          onChange={handleTabChange} 
          indicatorColor="primary" 
          textColor="primary" 
          centered
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              fontSize: '1rem',
              fontWeight: 'medium',
              textTransform: 'none'
            }
          }}
        >
          <Tab 
            // icon={<LocalShippingIcon />} 
            label="Pending Orders" 
            iconPosition="start"
          />
          <Tab 
            // icon={<FontAwesomeIcon icon={faShoppingBag} />} 
            
            label="Bought Items" 
            iconPosition="start"
          />
          <Tab 
            // icon={<SellIcon />} 
            label="Sold Items" 
            iconPosition="start"
          />
        </Tabs>
        </Paper>
        <Box sx={{ mt: 4 }}>
          {tabIndex === 0 && (
            <CardComponent orders={pendingOrders} otp={true} />
          )}
          {tabIndex === 1 && (
            <CardComponent orders={boughtItems} otp={false}/>
          )}
          {tabIndex === 2 && (
            <CardComponent orders={soldItems} otp={false}/>
          )}
        </Box>
      </Container>
      </ThemeProvider>
    );
  };

export default Orders;