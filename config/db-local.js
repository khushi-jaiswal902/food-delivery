// Local MongoDB configuration as fallback
import mongoose from "mongoose";

export const connectDBLocal = async () => {
  try {
    // Local MongoDB connection (if you have MongoDB installed locally)
    const localMongoURI = 'mongodb://localhost:27017/food-del';
    
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    console.log('Connecting to Local MongoDB...');
    
    await mongoose.connect(localMongoURI, options);
    
    console.log('✅ Local MongoDB Connected Successfully!');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('Local MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Local MongoDB disconnected');
    });
    
    return true;
    
  } catch (error) {
    console.error('❌ Local MongoDB connection failed:', error.message);
    console.log('💡 To use local MongoDB:');
    console.log('1. Install MongoDB Community Server');
    console.log('2. Start MongoDB service');
    console.log('3. Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest');
    return false;
  }
};

// Test local connection
export const testLocalConnection = async () => {
  try {
    await connectDBLocal();
    return true;
  } catch (error) {
    return false;
  }
};
