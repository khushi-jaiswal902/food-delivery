import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FoodContext = createContext();

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};

export const FoodProvider = ({ children, url }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchFoodList = async () => {
    setLoading(true);
    try {
      console.log('Fetching food list from:', `${url}/api/food/list`);
      const response = await axios.get(`${url}/api/food/list`);
      console.log('Food list response:', response.data);
      if (response.data.success) {
        setFoodList(response.data.data);
        // Also save to localStorage for persistence
        localStorage.setItem('foodList', JSON.stringify(response.data.data));
        toast.success(`Fetched ${response.data.data.length} food items`);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      console.error('Error fetching food list:', error);
      toast.error("An error occurred while fetching the list");
    } finally {
      setLoading(false);
    }
  };

  const addFoodItem = async (formData) => {
    try {
      console.log('Adding food item to:', `${url}/api/food/add`);
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Add food response:', response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);
        // Automatically refresh the list after adding
        await fetchFoodList();
        return true;
      } else {
        toast.error(response.data.message || 'Failed to add food item');
        return false;
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error("No response from server. Please check if backend is running.");
      } else {
        console.error('Error setting up request:', error.message);
        toast.error("An error occurred while setting up the request");
      }
      return false;
    }
  };

  const removeFoodItem = async (foodId) => {
    try {
      console.log('Removing food item:', foodId);
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      console.log('Remove food response:', response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        // Automatically refresh the list after removing
        await fetchFoodList();
      } else {
        toast.error("Failed to remove food item");
      }
    } catch (error) {
      toast.error("An error occurred while removing the item");
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

      // Load from localStorage on mount and then fetch from API
    useEffect(() => {
      const savedList = localStorage.getItem('foodList');
      if (savedList) {
        try {
          const parsed = JSON.parse(savedList);
          setFoodList(parsed);
        } catch (error) {
          console.error('Error parsing localStorage:', error);
        }
      }
      
      // Fetch fresh data from API
      fetchFoodList();
    }, []);

  const value = {
    foodList,
    loading,
    fetchFoodList,
    addFoodItem,
    removeFoodItem,
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  );
};
