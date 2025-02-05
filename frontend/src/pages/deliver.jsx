import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  TextField,
  Divider,
  ThemeProvider,
  Button,
} from "@mui/material";
import axios from "axios";
import { GET_PENDING_ORDERS_URL, CLOSE_TRANSACTION_URL } from "../constants";
import AppTheme from "../theme";
import { toast } from "react-toastify";

const fetchPendingOrders = async () => {
  try {
    const response = await axios.get(GET_PENDING_ORDERS_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pending orders", error);
    throw error;
  }
};

const closeTransaction = async (orderId, otp) => {
  try {
    const response = await axios.post(
      CLOSE_TRANSACTION_URL,
      { orderId, otp },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to close transaction", error);
    throw error;
  }
};

const Deliver = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [otps, setOtps] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        const data = await fetchPendingOrders();
        setPendingOrders(data);
        const initialOtps = data.reduce((acc, order) => {
            acc[order._id] = '';
            return acc;
          }, {});
        setOtps(initialOtps);
      } catch (err) {
        setError("Failed to fetch pending orders");
      } finally {
        setLoading(false);
      }
    };

    getPendingOrders();
  }, []);

  const handleOtpChange = (orderId, value) => {
    setOtps(prev => ({
        ...prev,
        [orderId]: value
      }));
  };

  const handleCloseTransaction = async (orderId) => {
    try {
      const data = await closeTransaction(orderId, otps[orderId]);
      setSuccess("Transaction closed successfully");
      setPendingOrders(pendingOrders.filter((order) => order._id !== orderId));
      setOtps(prev => {
        const { [orderId]: _, ...rest } = prev;
        return rest;
      });
    } catch (err) {
      toast.error("Incorrect OTP: Failed to close transaction");
    }
  };

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
    <ThemeProvider theme={AppTheme}>
      <Container maxWidth="lg" 
      sx={{ 
        py: 6 ,
        minHeight: "100vh",
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",

      }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Deliver Items
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            {success}
          </Alert>
        )}

        {pendingOrders.length === 0 ? (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography variant="h6">No pending orders</Typography>
          </Paper>
        ) : (
          <Box sx={{ display: "grid", gap: 3 }}>
            {pendingOrders.map((order) => (
              <Paper
                key={order._id}
                elevation={3}
                sx={{
                  p: 4,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                      <Box
                        component="img"
                        src={order.product.image}
                        alt={order.product.name}
                        sx={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 2,
                          boxShadow: 1,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                          }}
                        >
                          {order.product.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: "medium" }}
                          >
                            ₹{order.totalPrice}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            (Quantity: {order.quantity})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {/* <PersonIcon color="primary" /> */}
                        Buyer Details
                      </Typography>
                      <Box
                        sx={{
                          pl: 2,
                          borderLeft: 2,
                          borderColor: "primary.main",
                        }}
                      >
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                          <strong>Name:</strong> {order.buyer.firstName}{" "}
                          {order.buyer.lastName}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                          <strong>Email:</strong> {order.buyer.email}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Contact:</strong> {order.buyer.contactNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        height: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <TextField
                        label="Enter OTP"
                        value={otps[order._id]}
                        onChange={ (e) => handleOtpChange(order._id,e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCloseTransaction(order._id)}
                        size="large"
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: "bold",
                        }}
                      >
                        Close Transaction
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Deliver;
