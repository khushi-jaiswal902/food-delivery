// controllers/foodController.js
import foodModel from '../models/foodModel.js';
import fs from 'fs';
import mongoose from 'mongoose';

const addFood = async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                message: 'Database not connected. Please try again in a few moments.',
            });
        }

        console.log('=== Add Food Request ===');
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        console.log('Request headers:', req.headers);

        // Check if file exists
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({
                success: false,
                message: 'Image file is required',
            });
        }

        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            console.log('Missing required fields:', { name: !!name, description: !!description, price: !!price, category: !!category });
            return res.status(400).json({
                success: false,
                message: 'All fields (name, description, price, category) are required.',
            });
        }

        // Validate field values
        if (name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Name cannot be empty.',
            });
        }

        if (description.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Description cannot be empty.',
            });
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a valid positive number.',
            });
        }

        if (category.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Category cannot be empty.',
            });
        }

        const image_filename = req.file.filename;
        console.log('Image filename:', image_filename);

        const food = new foodModel({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category: category.trim(),
            image: image_filename,
        });

        console.log('Saving food item:', food);

        await food.save();
        console.log('Food item saved successfully:', food._id);

        return res.status(201).json({
            success: true,
            message: 'Food added successfully',
            data: food
        });
    } catch (error) {
        console.error('Error adding food:', error);
        
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', '),
            });
        }
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A food item with this name already exists.',
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error occurred while adding food item',
        });
    }
};

const listFood = async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                message: 'Database not connected. Please try again in a few moments.',
            });
        }

    console.log('Fetching food list...');
    const foods = await foodModel.find({}).sort({ createdAt: -1 });
    console.log(`Found ${foods.length} food items`);
    console.log('Food items:', foods);
    res.json({ success: true, data: foods });
    } catch (error) {
        console.error('Error fetching food list:', error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};

const removeFood = async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                message: 'Database not connected. Please try again in a few moments.',
            });
        }

        console.log('Removing food item with ID:', req.body.id);
        
        if (!req.body.id) {
            return res.status(400).json({
                success: false,
                message: 'Food ID is required'
            });
        }

        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }

        // Remove image file if it exists
        if (food.image) {
            const imagePath = `uploads/${food.image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('Image file removed:', imagePath);
            }
        }

        await foodModel.findByIdAndDelete(req.body.id);
        console.log('Food item removed successfully');
        
        res.json({ success: true, message: "Food Removed Successfully" });
    } catch (error) {
        console.error('Error removing food item:', error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removeFood };
