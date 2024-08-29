

import React from 'react'

import '../AdvertisementCard/AdvertisementCard.css'
import treading_img from "../../assets/top.png"

const AdvertisementCard = () => {
  return (
   <>
   <div className='advertisement-card-container'>

        
        <div className='advertisement-card'>
    <div className='advertisement-left-card'>
        <div className='advertisement-card-title'> Never-Ending Summer</div>
        <div className='advertisement-card-sub-title'>
        Throwback Shirts & <br></br> all-day dressed
        </div>
        <div>
            <a href='#'>Exlopre all category</a>
        </div>
   
    </div>
    <div className='advertisement-right-card'>

        <img src={treading_img}></img>
        </div>
        </div>
        <div className='advertisement-card'>
    <div className='advertisement-left-card-1'>
        <div className='advertisement-card-title'> Never-Ending Summer</div>
        <div className='advertisement-card-sub-title'>
        Throwback Shirts & <br></br> all-day dressed
        </div>
        <div>
            <a href='#'>Exlopre all category</a>
        </div>
   
    </div>
    <div className='advertisement-right-card'>

        <img src={treading_img}></img>
        </div>
        </div>
   </div>
   </>
  )
}

export default AdvertisementCard
