import React, { useContext } from "react";
import treading_img from "../../assets/top.png";
import "./TreadingCard.css";
import { trendingContext } from '../Home/Home';

const TreadingCard = () => {
  const treadingSalesData = useContext(trendingContext);
  return (
    <div className="treading-card-container">
      {
        treadingSalesData.map((item,index)=>{
return(
  <div className="treading-card">
  <div className="img-container">
    <div className="container">
      <img src={item.img} className="treading-img" alt="Treading" /></div>
    
    <div className="new-arrival">
      <div className="star">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#FFFFFF"
          className="size-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
          />
        </svg>
      </div>
      <div className="new-arrival-text">New Arrivals</div>
    </div>
  </div>
  <div className="treading-card-footer">
    <div className="treading-card-info">
      <div className="treading-card-title">
      {item.title}
      </div>
      <div className="treading-card-sub-title">
     {item.sub_title}
      </div>
    </div>
    <button className="treading-shop-btn">${item.price} Shop Now</button>
  </div>
</div>
)
        })
      }
     
 
     
    </div>
  );
};

export default TreadingCard;
