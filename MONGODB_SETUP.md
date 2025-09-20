# 🔧 MongoDB Atlas Setup Guide

## ❌ Current Issue
Your MongoDB Atlas cluster is rejecting connections because your IP address is not whitelisted.

## ✅ Solution: Whitelist Your IP Address

### Step 1: Access MongoDB Atlas Dashboard
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in with your credentials
3. Select your project/cluster

### Step 2: Navigate to Network Access
1. In the left sidebar, click **"Network Access"**
2. You'll see a list of allowed IP addresses

### Step 3: Add Your IP Address
1. Click **"Add IP Address"** button
2. You have two options:

#### Option A: Allow Access from Anywhere (Recommended for Development)
- Click **"Allow Access from Anywhere"**
- This adds `0.0.0.0/0` to your whitelist
- **Note**: This allows any IP to connect (use only for development)

#### Option B: Add Your Specific IP
- Click **"Add IP Address"**
- Enter your current IP address
- Click **"Confirm"**

### Step 4: Verify Changes
1. Your new IP address should appear in the list
2. Status should show as "Active"

## 🌐 Find Your Current IP Address
You can find your current IP address by:
1. Going to [whatismyipaddress.com](https://whatismyipaddress.com/)
2. Or using the command: `curl ifconfig.me` (in terminal)

## 🔄 After Whitelisting
1. Wait 1-2 minutes for changes to take effect
2. Restart your backend server
3. The connection should work automatically

## 🚨 Security Note
- **For Development**: Using "Allow Access from Anywhere" is fine
- **For Production**: Only whitelist specific IP addresses
- **Regular Updates**: Update your whitelist when your IP changes

## 📱 Alternative Solutions
If you continue having issues:
1. Check if your MongoDB Atlas cluster is running
2. Verify your username/password in the connection string
3. Try connecting from a different network (mobile hotspot)
4. Contact MongoDB Atlas support

## 🎯 Quick Fix Commands
After whitelisting your IP, restart the backend:
```bash
cd backend
npm run server
```

The server should now connect successfully to MongoDB Atlas!
