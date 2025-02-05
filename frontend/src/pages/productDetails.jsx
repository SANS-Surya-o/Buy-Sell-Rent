import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid2,
  Button,
  Paper,
  Tooltip,
  Stack,
  Divider,
  Chip,
  ThemeProvider,
  CardMedia,
} from "@mui/material";
import { ShoppingCart, Info } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppTheme from "../theme";
import { GET_PRODUCT_DETAILS_URL } from "../constants";
import addToCart from "../utils/addToCart";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${GET_PRODUCT_DETAILS_URL}/${id}`, {
          withCredentials: true,
        });
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    // <ThemeProvider theme={AppTheme}>
    //   <Container
    //     maxWidth="lg"
    //     sx={{
    //       height: "85vh",
    //       display: "flex",
    //       alignItems: "center",
    //       py: 2,
    //     }}
    //   >
    //     <Paper
    //       elevation={3}
    //       sx={{
    //         p: 4,
    //         borderRadius: 2,
    //         height: "100%",
    //         width: "100%",
    //         overflow: "hidden",
    //       }}
    //     >
    //       <Grid2 container spacing={4} sx={{ height: "100%" }}>
    //         <CardMedia
    //           component="img"
    //           sx={{ width: 600, height: 600, objectFit: "cover" }}
    //           image={product.image}
    //           //  alt={item.name}
    //         ></CardMedia>

    //         <Divider
    //           orientation="vertical"
    //           height="100%"
    //           flexItem
    //           sx={{ display: { xs: "none", md: "block" } }}
    //         />
    //         {/* Right Column - Product Info */}
    //         <Grid2 item xs={12} md={6} sx={{ height: "100%" }}>
    //           <Box
    //             sx={{
    //               height: "100%",
    //               display: "flex",
    //               flexDirection: "column",
    //               justifyContent: "space-between",
    //             }}
    //           >
    //             <Box>
    //               <Typography
    //                 variant="h4"
    //                 component="h1"
    //                 gutterBottom
    //                 fontWeight="bold"
    //               >
    //                 {product.name}
    //               </Typography>

    //               <Chip label={product.category} sx={{ mb: 2 }} />

    //               <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
    //                 ₹{product.price}
    //               </Typography>

    //               <Divider sx={{ my: 2 }} />

    //               <Typography
    //                 variant="body1"
    //                 sx={{
    //                   mb: 2,
    //                   maxHeight: "150px",
    //                   overflow: "auto",
    //                 }}
    //               >
    //                 {product.description}
    //               </Typography>

    //               <Typography variant="body1">
    //                 <strong>Name:</strong> {product.seller.firstName}{" "}
    //                 {product.seller.lastName}
    //               </Typography>
    //               <Typography variant="body1">
    //                 <strong>Contact:</strong> {product.seller.email}
    //               </Typography>
    //             </Box>

    //             <Box sx={{ mt: "auto" }}>
    //               <Button
    //                 variant="contained"
    //                 startIcon={<ShoppingCart />}
    //                 sx={{
    //                   bgcolor: "primary.main",
    //                   "&:hover": {
    //                     bgcolor: "primary.dark",
    //                   },
    //                   transition: "all 0.3s ease-in-out",
    //                 }}
    //                 onClick={(e) => {
    //                   e.stopPropagation();
    //                   e.preventDefault();
    //                   addToCart(product._id, 1);
    //                 }}
    //               >
    //                 Add to Cart
    //               </Button>
    //             </Box>
    //           </Box>
    //         </Grid2>
    //       </Grid2>
    //     </Paper>
    //   </Container>
    // </ThemeProvider>
    <ThemeProvider theme={AppTheme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          }}
        >
          <Grid2 container spacing={4}>
            {/* Left side - Image */}
            <Grid2 xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: 600,
                  height: 600,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid2>

            {/* Right side - Details */}
            <Grid2 xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 3,
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "primary.main",
                    fontWeight: 500,
                  }}
                >
                  ₹{product.price}
                </Typography>

                <Divider />

                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    Description
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                    }}
                  >
                    {product.description}
                  </Typography>
                </Box>

                <Divider />

                <Box
                  sx={{
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    Seller Information
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body1">
                      <strong>Name:</strong> {product.seller.firstName}{" "}
                      {product.seller.lastName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Contact:</strong> {product.seller.email}
                    </Typography>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCart />}
                    sx={{
                      flex: 1,
                      py: 1.5,
                      bgcolor: "primary.main",
                      color: "white",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      addToCart(product._id, 1);
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
