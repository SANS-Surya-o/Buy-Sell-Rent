import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { ADD_PRODUCT_URL, categories } from "../constants";
import { useNavigate } from "react-router-dom";
import AppTheme from "../theme";
import { motion } from "framer-motion";

const Sell = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    maxQuantity: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(ADD_PRODUCT_URL, formData, { withCredentials: true });
      navigate("/products"); // Redirect to products page after successful addition
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={AppTheme}>
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "100vh",
            py: 8,
            background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 6,
                fontWeight: "bold",
                textAlign: "center",
                color: "#1a1a1a",
              }}
            >
              List Your Item
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              {error && (
                <Alert severity="error" sx={{ mb: 4 }}>
                  {error}
                </Alert>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TextField
                  fullWidth
                  label="Item Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "1px",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "text.secondary",
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "1px",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "1px",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "1px",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <TextField
                  fullWidth
                  label="Quantity Available"
                  name="maxQuantity"
                  type="number"
                  value={formData.maxQuantity}
                  onChange={handleChange}
                  sx={{
                    mb: 6,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "1px",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 2,
                    // background:
                    //   "linear-gradient(45deg, #2a5298 30%, #1e3c72 90%)",
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    boxShadow: "0 3px 10px rgba(42, 82, 152, 0.3)",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "List Item for Sale"
                  )}
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Sell;
