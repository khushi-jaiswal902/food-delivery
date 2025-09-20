import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../../context/StoreContext';
import { assets } from '../../../assets/assets';
import axios from 'axios'; // ⬅️ Make sure axios is imported!

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userOrders", {}, {
                headers: { token }
            });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <p>{order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
