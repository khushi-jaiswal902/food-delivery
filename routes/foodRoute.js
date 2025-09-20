// routes/foodRoute.js
import express from 'express';
import multer from 'multer';

import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Ensure the 'uploads' folder exists
import fs from 'fs';
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Image Storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // ensure 'uploads' folder exists
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// ✅ Route with image upload
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);



export default foodRouter;
