import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    required: [true, 'Description is required'],
    validate: {
      validator: function (v) {
        return v && v.trim().length > 0;
      },
      message: 'Description cannot be empty'
    }
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});

// Ensure model is not re-registered on hot reload
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
