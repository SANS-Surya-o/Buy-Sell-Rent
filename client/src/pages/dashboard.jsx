import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { ShoppingCart, Store, LocalOffer } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppTheme from "../theme";
import BackgroundContainer from "../components/background";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={AppTheme}>
      <BackgroundContainer>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f8f9fa",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
          <Grid container alignItems="center">
            {/* Left Column */}
            <Grid item xs={12} md={7}>
              <Box sx={{ pr: { md: 6 } }}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "4rem", md: "6rem", lg: "7rem" },
                      fontWeight: 900,
                      color: "#1a1a1a",
                      lineHeight: 1,
                      mb: 3,
                      position: "relative",
                      textTransform: "uppercase",
                      letterSpacing: "-2px",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: -10,
                        width: "120px",
                        height: "8px",
                        background: "linear-gradient(90deg, #2a5298, #1e3c72)",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    150 Rupiya
                  </Typography>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: "2.5rem", md: "3rem" },
                        fontWeight: 700,
                        background: "linear-gradient(45deg, #2a5298, #1e3c72)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        mb: 4,
                      }}
                    >
                      Buy. Sell. Rent.
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: "#666",
                        mb: 6,
                        maxWidth: "600px",
                        lineHeight: 1.8,
                        fontSize: "1.2rem",
                      }}
                    >
                      Your premier marketplace for hassle-free transactions.
                      Join our growing community of buyers and sellers.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 3, mb: 8 }}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<ShoppingCart />}
                          onClick={() => navigate("/products")}
                          sx={{
                            background:
                              "linear-gradient(45deg, #2a5298, #1e3c72)",
                            px: 6,
                            py: 2.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            boxShadow: "0 4px 14px 0 rgba(42, 82, 152, 0.39)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #1e3c72, #2a5298)",
                            },
                          }}
                        >
                          Start Shopping
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<Store />}
                          onClick={() => navigate("/sell")}
                          sx={{
                            borderColor: "#1e3c72",
                            borderWidth: "2px",
                            color: "#1e3c72",
                            px: 6,
                            py: 2.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            background: "white",
                            "&:hover": {
                              borderColor: "#2a5298",
                              backgroundColor: "rgba(42, 82, 152, 0.04)",
                              borderWidth: "2px",
                            },
                          }}
                        >
                          Sell Items
                        </Button>
                      </motion.div>
                    </Box>

                    <Grid container spacing={4}>
                      {[
                        {
                          title: "Secure",
                          desc: "Safe and secure transactions",
                        },
                        { title: "Fast", desc: "Quick and easy process" },
                        { title: "Reliable", desc: "Trusted by thousands" },
                      ].map((feature, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.2 }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: "#1e3c72",
                                mb: 1,
                              }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#666",
                                fontSize: "1rem",
                              }}
                            >
                              {feature.desc}
                            </Typography>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </motion.div>
                </motion.div>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      // background: 'linear-gradient(90deg, transparent 0%, #f8f9fa 100%)',
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXhyemltZzg2YmJ0MW5sdDQzYWEyYzUwYXE1ejV2N3UwbGIwdHNjYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9KwqNmQ6ax3BMZAtZi/giphy.gif"
                    alt="Hero"
                    sx={{
                      width: "1000px",
                      height: "700px",
                      // maxHeight: '700px',
                      objectFit: "cover",
                      borderRadius: 4,
                      opacity: 0.7,
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      </BackgroundContainer>
    </ThemeProvider>
  );
};

export default Dashboard;
