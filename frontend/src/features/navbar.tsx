import React from 'react';
import { useState } from "react";
import {
    Stack,
    Link,
    Toolbar,
    Typography,
    Container,
    AppBar,
    Button,
    Drawer,
    ThemeProvider,
  } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
import NavbarTheme from "@features/theme";
import '@styles/navbar.scss';
import MenuIcon from "@mui/icons-material/Menu";
import Logoutform from "@features/logoutform";

const textColor = NavbarTheme.palette.text.primary;
// How do I modify the navbar based on user is logged in or not? 
const links = [
    {
        "id": 1,
        "title": "Dashboard",
        "url": "/"
    },
    {
        "id":2,
        "title": "Products",
        "url": "/products"
    },
    {
        "id":3,
        "title": "Order History",
        "url": "/order-history"
    },
    {
        "id":2,
        "title": "Deliver Items",
        "url": "/deliver-items"
    },
    {
        "id":2,
        "title": "Cart",
        "url": "/cart"
    },
    {
        "id":2,
        "title": "Profile",
        "url": "/profile"
    }

];

const NavList = ({ ...props }) => {
    return (
      <Stack
        overflow="auto"
        direction={{ xs: "column", sm: "row" }}
        gap={5}
        ml={{ xs: 3, sm: 0 }}
        mt={{ xs: 3, sm: 0 }}
        width={{ xs: "150px", sm: "initial" }}
        {...props}
      >
        {links.map(page => (
          <Link
            key={page.id}
            sx={{
              color: { xs: "primary", sm: textColor },
            }}
            href={page.url}
            className="nav-link"
          >
            {page.title}
          </Link>
        ))}
      </Stack>
    );
  };

  
  const Nav = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = newOpen => () => {
      setOpen(newOpen);
    };
    return (
      <>
        <Button
          variant="text"
          onClick={toggleDrawer(true)}
          sx={{ color: "white", display: { xs: "flex", sm: "none" } }}
        >
          <MenuIcon />
        </Button>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          sx={{
            display: { xs: "inherit", sm: "none" },
          }}
        >
          <NavList />
        </Drawer>

        <NavList
          sx={{
            display: { xs: "none", sm: "inherit" },
          }}
        />
      </>
    );
  };



const Header = () => {
    return (
    <ThemeProvider theme={NavbarTheme}>
        <AppBar>
            <Container>
            <Toolbar>
                <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                >
                <Typography variant="h6" style={{"fontWeight": "bolder"}}>150 Rupiya</Typography>
                <Stack
                    direction="row" 
                    justifyContent="space-between"
                    gap={5}
                    // absolutrely poisition it to the right of the parent div
                    sx={{ position: "absolute", right: 0 }}
                >
                  <Nav />
                  <Logoutform />
                </Stack>
               
                </Stack>
            </Toolbar>
            </Container>
        </AppBar>
      </ThemeProvider>
    );
  };
  export default Header;
  