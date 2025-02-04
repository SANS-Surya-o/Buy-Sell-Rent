import Product from "../models/productModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import User from "../models/userModel.js";
import Order from '../models/orderModel.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';


const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({ maxQuantity: { $gt: 0 } })
            .sort({ createdAt: -1 });  

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
    const { name, price, description, category, imageUrl, maxQuantity } = req.body;
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
            seller,
            maxQuantity
        });

        if (product) {
            res.status(201).json({
                _id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                seller: product.seller,
                maxQuantity: product.maxQuantity
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
    if (product.seller.toString() === userId.toString()) {
        res.status(400);
        throw new Error('own product');
    }
    const cartItem = user.cart.find(item => item.product.toString() === productId);
    if (cartItem && cartItem.quantity + quantity > product.maxQuantity) {
        res.status(400);
        throw new Error('Quantity exceeds stock limit');
    }
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
    const user = await User.findById(userId).populate('cart.product', 'name price image maxQuantity');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user.cart);
});

const buyFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Find user and populate cart items
    const user = await User.findById(userId).populate('cart.product');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Generate OTP
    const generateOTP = () => {
        return crypto.randomBytes(3).toString('hex'); // 6-digit OTP
    };

    // Create orders for each product
    const orderPromises = user.cart.map(async item => {
        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);
        const orderData = {
            buyer: userId,
            seller: item.product.seller,
            product: item.product._id,
            quantity: item.quantity,
            totalPrice: item.product.price * item.quantity,
            otp: hashedOtp,
            status: 'Pending'
        };
        const order = new Order(orderData);
        await order.save();

        // Update buyer's order history
        user.orders.push(order._id);

        // Update seller's pending orders
        const seller = await User.findById(order.seller);
        seller.orders.push(order._id);
        await seller.save();

        // Decrease product quantity
        const product = await Product.findById(item.product._id);
        product.maxQuantity -= item.quantity;
        await product.save();

        return { ...order.toObject(), plainOtp: otp };
    });

    const ordersWithOtp = await Promise.all(orderPromises);
    await user.save();

    // Clear user's cart
    user.cart = [];
    await user.save();

    res.status(200).json({ message: 'Order placed successfully', orders: ordersWithOtp });
});



const updateCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { cartItems } = req.body;
    // Validate request data
    if (!cartItems || !Array.isArray(cartItems)) {
        res.status(400);
        throw new Error('Invalid cart items data');
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Update cart items
    user.cart = cartItems.map(item => ({
        product: item.product._id,
        quantity: Math.max(1, Math.min(item.quantity, item.product.maxQuantity))
    }));

    await user.save();

    res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
});

const getOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Find orders where the user is either the buyer or the seller
    const orders = await Order.find({
        $or: [{ buyer: userId }, { seller: userId }]
    }).populate('product', 'name price image').populate('seller', 'firstName lastName email').populate('buyer', 'firstName lastName email');
    if (!orders) {
        res.status(404);
        throw new Error('Orders not found');
    }

    const generateOTP = () => {
        return crypto.randomBytes(3).toString('hex'); // 6-digit OTP
    };

    const pendingOrders = await Promise.all(orders.filter(order => order.status === 'Pending' && order.buyer.equals(userId)).map(async order => {
        const newOtp = generateOTP();
        const hashedOtp = await bcrypt.hash(newOtp, 10);
        order.otp = hashedOtp;
        await order.save();
        return { ...order.toObject(), plainOtp: newOtp };
    }));
   
    const boughtItems = orders.filter(order => order.status === 'Completed' && order.buyer.equals(userId));
    const soldItems = orders.filter(order => order.status === 'Completed' && order.seller.equals(userId));

    res.status(200).json({ pendingOrders, boughtItems, soldItems });
});

const getPendingOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const orders = await Order.find({ seller: userId, status: 'Pending' }).populate('product', 'name price image')
                                                                          .populate('buyer', 'firstName lastName email');   
    if (!orders) {
        res.status(404);
        throw new Error('Orders not found');
    }

    res.status(200).json(orders);
});

const closeTransaction = asyncHandler(async (req, res) => {
    const { orderId , otp } = req.body;
    const userId = req.user._id;
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    if (order.seller.toString() !== userId.toString()) {
        res.status(403);
        throw new Error('not your product');
    }
    const isMatch = await bcrypt.compare(otp, order.otp);
    if (!isMatch) {
        res.status(400);
        throw new Error('Incorrect OTP');
    }
    order.status = 'Completed';
    await order.save();
    res.status(200).json({ message: 'Transaction closed successfully' });
});




export { getProducts, AddProduct, getProductDetails, addToCart, getCartItems, buyFromCart, updateCart , getOrders, getPendingOrders, closeTransaction };