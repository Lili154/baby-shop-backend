import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      default:0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
   
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Product', ProductSchema);