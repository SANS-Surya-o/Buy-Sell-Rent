import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: {type: String, required: true},
        image: { type: String, required: true },
        seller : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        maxQuantity: { type: Number, required: true , default: 1},
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema);
export default Product;