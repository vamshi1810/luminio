import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.css";
import logo from "../../assets/Logo.png";
import { json, NavLink } from "react-router-dom";
import MenuList from "../Menus/MenuList";
import BasketCard from "../Basket/BasketCard";
import { useNavigate } from "react-router-dom";
import mbShowItems from "../../mobileShowItems.json";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import categoriesItems from "../../categorieItems.json";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const [showBasketComponent, setShowBasketComponent] = useState(false);
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const [modelShow, setModelShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  const handleModelClose = () => setModelShow(false);
  const handleModelShow = () => setModelShow(true);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    const username = localStorage.getItem("username");
    setUsername(username);
    console.log(username);

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const [inputValue, setInputValue] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/products?title=${event.target.value}&isManual=${true}`);
      setInputValue("");
    }
  };

  const logout = () => {
    console.log("logout");
    navigate("");
    localStorage.clear();
  };

  const navigateToCart = (evt) => {
    if (evt === "checkout") {
      navigate(`/checkout`);
    } else {
      navigate(`/order-items`);
    }
    console.log("testing.............");
  };
  const click = () => {};

  return (
    <>
      <nav className="nav-container">
        <div className="left-side-items">
          <div className="bar-icon-container">
            <div onClick={handleShowSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="bar-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            <a className="navbar-brand" onClick={click}>
              <h3>Luminae</h3>
            </a>
          </div>

          <div>
            <input
              class="form-control mr-sm-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
          </div>
        </div>

        <div className="right-side-items">
          <div className="profile-right-side-item-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="profile-image-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <div
              className="link-item"
              onClick={() => navigateToCart("checkout")}
            >
              Profile
            </div>
          </div>
          <div className="profile-right-side-item-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="profile-image-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <div className="link-item" onMouseOver={handleModelShow}>
              Profile
            </div>
          </div>
          <div className="profile-right-side-item-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="profile-image-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <div className="link-item">Profile</div>
          </div>
        </div>
      </nav>

      <Modal
        show={modelShow}
        onHide={handleModelClose}
        animation={false}
        dialogClassName="modal-custom"
      >
        <Modal.Body>
          <div className="profile-card">
            <div className="profile-user-card-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="user-card-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <div>
                <div className="user-card-profile-text">Hello User</div>
                <div>{username ? username : "test@gmail.com"}</div>
              </div>
            </div>
            <hr></hr>
            <div className="profile-user-card-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="user-card-bag-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <div>
                <div
                  className="user-card-profile-text"
                  onClick={() => navigateToCart("order")}
                >
                  My Orders
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="profile-user-card-info" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="user-card-bag-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>

              <div>
                <div className="user-card-profile-text">Logout</div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <MenuList></MenuList>
      <Sidebar showItem={showSidebar} onClose={handleCloseSidebar} />
    </>
  );
};

export default Navbar;
