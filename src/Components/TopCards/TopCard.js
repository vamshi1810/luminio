import React, { useContext } from "react";
import "../TopCards/TopCard.css";

import top_photo from "../../assets/photo.png";
import { topSalesContext } from "../Home/Home"

const TopCard = () => {
  const topSalesData = useContext(topSalesContext);

  return (
    <>
      <div className="top-card-container">
        {
          topSalesData.map((sale,index)=>{
            return(
              <div className="top-card" key={index}>
              <div className="img-container">
                <img src={sale.img} alt="top_photo" className="top-card-img"></img>
              </div>
              <div className="top-card-footer">
                <div className="footer-info">
                  <div>
                    <div className="footer-title">{sale.title}</div>
                    <div className="footer-sub-title">
                    {sale.sub_title}
                    </div>
                  </div>
                  <div className="top-card-star">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="footer-review">
                  <div class="top-card-star">
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
                  <div class="top-card-star">
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
                  <div class="top-card-star">
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
                  <div class="top-card-star">
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
                  <div className="footer-view">({sale.actual_Price})</div>
                </div>
    
                <div className="top-card-footer-price">
                  <div className="dollar-rupees">${sale.actual_Price}</div>
                  <div className="dollar-rupees-1">${sale.price}</div>
                  <div className="percentage">${sale.discount}%</div>
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

export default TopCard;
