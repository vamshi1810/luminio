import React, { useEffect, useState } from 'react'

import "../Basket/BasketCard.css"

const BasketCard = () => {
  const [items, setItems] = useState([]);




  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  console.log(items.length)



  useEffect(() => {
  
    const savedItems = localStorage.getItem('items');
    console.log(savedItems.length)
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);
  return (
    <>
    <div className='basket'>
      {
         items.map((item,index)=>{
          return(
            <div>
              <div className='basket-card-item'>
                <div>
                  <img  src={require(`../../${item.img}`)} className='basket-card-img'></img>
                </div>
                <div>
                  <div className='basket-card-title'>{item.title}</div>
                  <div className='basket-card-price'>{item?.price.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</div>
                </div>

              </div>
              <hr></hr>
              
            </div>
          )
          

         })
      }
      <div className='total-price'>
        <div>Total Price</div>
        <div>{totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</div>
        </div>

     <div className='basket-card-btn-group'>
                <button className='basket-view-btn'>View Bag</button>
                <button className='basket-checkout-btn'>Checkout</button>
              </div>

    </div>
    
    
    
    </>
      
  
  );
}

export default BasketCard
