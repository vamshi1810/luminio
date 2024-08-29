import { useState } from "react";
import "./App.css";
import FooterCard from "./Components/FooterCard/FooterCard";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import CartDetails from "./Components/CartDetails/CartDetails";

import ProductDetails from "./Components/Product-Details/ProductDetails";
import ProductItems from "./Components/Product-Items/ProductItems";

import { Route, HashRouter  as Router, Routes, Navigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import MobileFooter from "./Components/MobileFooter/MobileFooter";

import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Router>
        {isAuthenticated && <Navbar className="header-navbar-container" />}
        <div className="body-content">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/about-us"
              element={isAuthenticated ? <About /> : <Navigate to="/" />}
            />
            <Route
              path="/products"
              element={isAuthenticated ? <ProductItems /> : <Navigate to="/" />}
            />
            <Route
              path="/product-info"
              element={isAuthenticated ? <ProductDetails /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/help-support"
              element={isAuthenticated ? <Product /> : <Navigate to="/" />}
            /> */}
            <Route
              path="/checkout"
              element={isAuthenticated ? <CartDetails /> : <Navigate to="/" />}
            />
             <Route
              path="/order-items"
              element={isAuthenticated ? <Order /> : <Navigate to="/" />}
            />
          </Routes>
          <div>
          {isAuthenticated && (
          <>
            <FooterCard />
           
          </>
        )}  
          </div>
        </div>
        <div className=" body-content-footer">
        {isAuthenticated && (
          <>
            <MobileFooter />
           
          </>
        )}
        </div>
       
      </Router>
    </>
  );
}

export default App;
