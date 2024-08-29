import React, { useContext } from "react";

import "../DealCard/DealCard.css";

import { myContext } from '../Home/Home';

const DealCard = () => {
  const flashSalesData = useContext(myContext);

  return (
    <>
      <div className="deal-card-container">
        {
flashSalesData.map((sale,index)=>{
  return(
    <div className="deal-card" key={index}>
    <div className="deal-card-header">
  <div className="deal-card-title">{sale.day}</div>
  <div className="timer-info">
  <div className="time">{sale.time}</div>
  <div className="timer">
    <div>hour:</div>
    <div>mins:</div>
    <div>sec</div>
  </div>
  </div>
  </div>
  <div>
  <img src={sale.img} alt="photo-bag" className="card-img"></img>
  </div>
 
  <div className="deal-card-info">
  <div className="deal-card-sub-title">{sale.title}</div>
  <div className="deal-card-info">{sale.sub_title}</div>
  </div>
  <div className="deal-card-footer">

  <div class="stars-container">
    <div class="star">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#FFC000"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#FFC000"
        class="size-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    </div>
    <div class="star">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#FFC000"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#FFC000"
        class="size-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    </div>
    <div class="star">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#FFC000"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#FFC000"
        class="size-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    </div>
    <div class="star">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#FFC000"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#FFC000"
        class="size-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
    </div>
    <div className="star-price">{sale.items}</div>
  </div>

  <div className="deal-card-price-info">
    <div className="price-info">{sale.dollar}</div>
    <div className="price-info price-info-1">{sale.price}</div>
    <div className="btn">{sale.percentage}</div>
  </div>
</div>
</div>
  )
})
        }
       
      

        
       
      </div>
    </>
  );
};

export default DealCard;
