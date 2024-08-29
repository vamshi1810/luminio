

import React from 'react'

import "../About/About.css"
import team from '../../assets/team.png'
import service_category from '../../assets/services_category.png'
import service_customer from '../../assets/services-customer.png'
import service_shop from '../../assets/013-shop.png'

const About = () => {
  return (
    <>
    <div className='about-section'>
      <div className='about-section-header-card'>
        <div className='about-section-header-card-right-side-content'>
            <div className='right-side-text'>
            Let's get to know Luminae
            </div>
            <div className='right-side-title'>
            Providing the best experience to make  your <span className='online'>Online Shopping </span> 
            </div>
            <p className='para'>
            At Luminae, we are more than just an online store – we are your ultimate destination for an unparalleled ,shopping experience. Our journey began with a simple yet powerful idea: to create a platform that not only  offers a wide array of products but also fosters a sense of community and connection among our customers.
            </p>
            <div className='shopping-count'>
                <div>
                <div className='count'>20+</div>
                <div className='shopping-name'>Shopping category</div>
                
                </div>
                <div>
                <div className='count'>10+</div>
                <div className='shopping-name'>Different Territory</div>
                
                </div>
                <div>
                <div className='count'>4M+</div>
                <div className='shopping-name'>Happy Client</div>
                
                </div>
               

            </div>
       
        </div>
        <div className='comment-card'>
        We have made many  people satisfied with our  Platform
        </div>

      </div>
      <div className='services-card-section'>
        <div className='services-card-content'>
            <div className='right-side-text'>Know our service</div>
            <div className='right-side-title'>
            We offer the best service that will <span className='online'>make it easier</span>  
            </div>
            <p className='para'>
            Discover unparalleled convenience with our top-tier service, designed to make your shopping experience smoother than ever.Experience shopping made effortless through our exceptional service that puts your needs at the forefront.
            Elevate your shopping journey with our unmatched service, redefining convenience and satisfaction.
            </p>
            <div className='services-card'>
                <div className='service-card'>
                    <img src={service_category}  className='service-card-category' alt='service-category'></img>
                    <p className='service-card-title'>Full category shop</p>
                    <p className='service-card-para'>Explore our comprehensive online store where you'll find a diverse range of products across multiple categories, all curated to cater to your various needs and</p>
                     <button className='read-more-btn'>
                        Read More
                     </button>
                </div>
                <div className='service-card'>
                <img src={service_customer} className='service-card-category'  alt='service-customer'></img>
                    <p className='service-card-title'>Extraordinary discount</p>
                    <p className='service-card-para'> Experience unparalleled savings on a wide selection of premium products that enhance your lifestyle without compromising on quality</p>
                     <button className='read-more-btn'>
                        Read More
                     </button>
                </div>
                <div className='service-card'>
                <img src={service_shop} className='service-card-category'  alt='service-shop'></img>
                    <p className='service-card-title'>Free Cargo</p>
                    <p className='service-card-para'>Enjoy the convenience of free cargo services, ensuring your purchases are delivered right to your doorstep without any additional cost. Experience seamless...</p>
                     <button className='read-more-btn'>
                        Read More
                     </button>
                </div>
                <div className='service-card'>
                <img src={service_customer} className='service-card-category'  alt='service-customer'></img>
                    <p className='service-card-title'>24-hour customer service</p>
                    <p className='service-card-para'>Our commitment to exceptional customer care means our 24-hour customer service team is always available to assist you, ensuring your inquiries and concerns...</p>
                     <button className='read-more-btn'>
                        Read More
                     </button>
                </div>

            </div>

        </div>
        <div>
        <img src={team} alt='team' className='team-img'></img>
        </div>
       
          
       

      </div>
    </div>
    </>
    
  )
}

export default About
