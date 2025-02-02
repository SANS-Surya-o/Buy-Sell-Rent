import React, { useState, useEffect } from 'react';
import {
    Container, Typography, CircularProgress, Alert, Box,
    Grid2, Button, Paper, Tooltip, Divider, Chip, ThemeProvider,
    CardMedia
} from '@mui/material';
import { ShoppingCart, Info } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppTheme from '../theme';
import { GET_PRODUCT_DETAILS_URL } from '../constants';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${GET_PRODUCT_DETAILS_URL}/${id}`, { withCredentials: true });
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress />
        </Box>
    );

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <ThemeProvider theme={AppTheme}>
            <Container
                maxWidth="lg"
                sx={{
                    height: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    py: 2
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Grid2
                        container
                        spacing={4}
                        sx={{ height: '100%' }}
                    >
                        {/* <Grid2
                            container
                            spacing={4}
                            sx={{ height: '100%' }}
                        >
                            <Grid2
                                item
                                xs={12}
                                md={6}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '600px',  // Fixed width
                                        height: '400px', // Fixed height
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: 2,
                                            boxShadow: 3,
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.02)'
                                            }
                                        }}
                                    />
                                </Box>
                            </Grid2>
                        </Grid2> */}
                        <CardMedia 
                         component="img"
                         sx={{ width: 600, height: 600 , objectFit: 'cover' }}
                         image={product.image}
                        //  alt={item.name}
                         >
                        </CardMedia>

                        <Divider

                            orientation="vertical"
                            height="100%"
                            flexItem
                            sx={{ display: { xs: 'none', md: 'block' } }} 
                        />
                        {/* Right Column - Product Info */}
                        <Grid2 item xs={12} md={6} sx={{ height: '100%' }}>
                            <Box sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <Box>
                                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                                        {product.name}
                                    </Typography>

                                    <Chip
                                        label={product.category}
                                        sx={{ mb: 2 }}
                                    />

                                    <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                                        ₹{product.price}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            maxHeight: '150px',
                                            overflow: 'auto'
                                        }}
                                    >
                                        {product.description}
                                    </Typography>
                                </Box>


                                <Box sx={{ mt: 'auto' }}>
                                    <Tooltip
                                        title={
                                            <Box sx={{ p: 1 }}>
                                                <Typography variant="body2">Seller: {product.seller.firstName} {product.seller.lastName}</Typography>
                                                <Typography variant="body2">Contact: {product.seller.email}</Typography>
                                            </Box>
                                        }
                                        arrow
                                        placement="top"
                                    >
                                        <Button
                                            startIcon={<Info />}
                                            variant="outlined"
                                            sx={{ mr: 2 }}
                                        >
                                            Seller Info
                                        </Button>
                                    </Tooltip>

                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCart />}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                            transition: 'all 0.3s ease-in-out'
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default ProductDetails;