import axios from 'axios';
import { ADD_TO_CART_URL } from '../constants';
import { toast } from 'react-toastify';



const addToCart = (async (product, quantity) => {

    try {
        const response = await axios.post(ADD_TO_CART_URL, {
            productId : product,
            quantity: quantity
        },
            { withCredentials: true }
        );

        if (response.status === 200) {
            toast.success('Product added to cart successfully!');
        }

    } catch (error) {
        console.error('Error adding to cart:', error);
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400) {
                if (data.message === 'own product') {
                    toast.error('You cannot add your own product to cart');
                }
                else{
                    toast.error(data.message);
                }
            } 
        }
        
    }
});

export default addToCart;