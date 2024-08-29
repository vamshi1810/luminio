import React, { useEffect, useState } from "react";
import "../Categories/Categories.css";

import men_cosmetic from "../../assets/Men cosmetic.png";
import BasketCard from "../Basket/BasketCard";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [showBasketComponent, setShowBasketComponent] = useState(false);
  const [items, setItems] = useState([]);





  



  useEffect(() => {
  const savedItems = localStorage.getItem('items');

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);
  


  const navigate = useNavigate();
 
  const onclick=(()=>{
    navigate(
      `/checkout`
      
    );
  })

  
  return (
    <>
      {/* <div className="navbar-categories">
        <div className="categories-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FFFF"
            class="categories-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
            />
          </svg>
          <div className="categories-title">Categories</div>
          <div className="lang">USD</div>
          <div className="lang">English</div>
        </div>

        <div className="categories-info-middle">
          <img src={men_cosmetic} alt="cosmetic-img"></img>
          <div>
            <p className="cosmetic-info-title">
              Weekly Men's Toiletries Coupons.
            </p>
            <p className="cosmetic-info">
              We extend exclusive discounts to our male clientele
            </p>
          </div>
        </div>
        <div className="categories-link-group">
          <div className="categories-links">
          
        
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#FFFF"
              class="user-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <div className="categories-link-text">Sign in</div>
          </div>
          <div className="categories-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#FFFF"
              class="user-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            <div className="categories-link-text">Favorites</div>
          </div>
          <div className="categories-links"
            onMouseOver={() => setShowBasketComponent(true)}
            onMouseLeave={() => setShowBasketComponent(false)}
            onClick={()=>onclick()}
          >
            
            {showBasketComponent && (
              <div className="hover-card-wrapper">
                <BasketCard />
              </div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#FFFF"
              class="user-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <div className="categories-link-text">Card</div>
            <div className="item-round">{items?.length>0?`${items.length}`:0}</div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Categories;
