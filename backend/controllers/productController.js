import Product from "../models/productModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import User from "../models/userModel.js";

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ createdAt: -1 });  // newest first

        if (!products?.length) {
            res.status(404);
            throw new Error('No products found');
        }

        res.status(200).json(products);
        
    } catch (error) {
        res.status(500);
        throw new Error('Failed to fetch products');
    }
});

const AddProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, imageUrl } = req.body;
    const seller = req.user._id;

    // Validate required fields
    if (!name || !price || !description || !category || !imageUrl) {
        res.status(400);
        throw new Error('All fields are required');
    }

    try {
        const product = await Product.create({
            name,
            price,
            description,
            category,
            image: imageUrl,
            seller
        });

        if (product) {
            res.status(201).json({
                _id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                seller: product.seller
            });
        } else {
            res.status(400);
            throw new Error('Invalid product data');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Error creating product: ' + error.message);
    }
});

const getProductDetails = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


const addToCart = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const { productId, quantity } = req.body;
    // console.log(productId, quantity);

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Find user and update cart
    const user = await User.findById(userId);
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    // if (product.seller.toString() === userId.toString()) {
    //     res.status(400);
    //     throw new Error('own product');
    // }
    const cartItem = user.cart.find(item => item.product.toString() === productId);
    if (cartItem) {
        // Update quantity if product already in cart
        cartItem.quantity += quantity;
    } else {
        // Add new product to cart
        user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
});

const getCartItems = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('cart.product', 'name price image');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user.cart);
});


export { getProducts, AddProduct, getProductDetails, addToCart, getCartItems };