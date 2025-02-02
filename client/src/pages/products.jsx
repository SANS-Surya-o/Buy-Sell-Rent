import React, { useState, useEffect } from 'react';
import { 
  Container, Box, TextField, FormControl, 
  InputLabel, Select, MenuItem, Typography,
  InputAdornment,CircularProgress,Alert,
  Stack, List ,   ListItem, ListItemIcon, ListItemText, Checkbox, Drawer, IconButton, Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import ProductCard from '../components/productCard';
import { styled, ThemeProvider} from '@mui/material/styles';
import AppTheme from '../theme';
import { GET_PRODUCTS_URL } from '../constants';

import axios from 'axios';
import { categories } from '../constants';





const Page = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    // backgroundColor: 'red'
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(110, 100%, 97%), hsl(0, 100%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const getProductData = async () => {
  try {
    const response = await axios.get(GET_PRODUCTS_URL, { withCredentials: true });
    
    if (!response.data) {
      throw new Error('No products found');
    }

    return response.data;

  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array if fetch fails
    return [];
  }
};

const Products = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductData();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

  const CategorySidebar = (
    <Box sx={{ width: 240, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category}
            dense
            button
            onClick={() => handleCategoryToggle(category)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedCategories.includes(category)}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ display: 'flex'}}>
      
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              top: '100px',
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {CategorySidebar}
        </Drawer>
      

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          
          <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center'}}>
            
            <TextField
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard id={product._id} image={product.image} name={product.name} price={product.price} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};


export default Products;
