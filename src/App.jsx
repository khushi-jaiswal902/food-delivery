import React, { useState } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Home from './pages/Home/Home';
import Cart from './pages/Home/Cart/Cart';
// If you have a PlaceOrder or MyOrders page, import them here
// import PlaceOrder from './pages/Order/Order';
// import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <HashRouter>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          {/* Uncomment and update these routes if you have these pages */}
          {/* <Route path='/order' element={<PlaceOrder />} /> */}
          {/* <Route path='/myOrders' element={<MyOrders />} /> */}
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  );
};

export default App;
