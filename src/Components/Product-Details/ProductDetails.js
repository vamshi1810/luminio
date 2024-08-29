import React, { useState } from "react";
import "../Product-Details/ProductDetails.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const ProductDetails = () => {
  const [sizeValue, setSizeValue] = useState();
  const [showSizeWarning, setShowSizeWarning] = useState(false); // New state for showing the warning

  const handleClick = (obj) => {
    if (!sizeValue) { // Check if size is not selected
      setShowSizeWarning(true); // Show warning message
      return;
      
    }
    else {
      toast.success('Product is added to cart!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
       
        });
    }

  
    const generateRandomNumber = (prefix) => {
      // Current timestamp in milliseconds
      const randomNumber = Math.floor(Math.random() * 10000000000); // Random 4-digit number
      return `${prefix}-${randomNumber}`;
    };
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = date.getSeconds();
  
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };
    function generateRandomHSN() {
      const min = 10000000; // Minimum 8-digit number
      const max = 99999999; // Maximum 8-digit number
      const hsnNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
      return hsnNumber.toString();
    }
    function calculateDiscount(originalPrice, discountPercentage) {
      const discountAmount = (originalPrice * discountPercentage) / 100;
      const finalPrice = originalPrice - discountAmount;
      return { discountAmount, finalPrice };
    }
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const generateInvoiceNumber = () => generateRandomNumber("INV");
    const generateOrderNumber = () => generateRandomNumber("ORD");
   
    const invoiceNumber = generateInvoiceNumber();
    const orderNumber = generateOrderNumber();
    const randomHSN = generateRandomHSN();
    const { discountAmount, finalPrice } = calculateDiscount(obj.details.price, obj.details.discount?obj.details.discount:0);
    const otherCharges = obj.details.otherCharges?obj.details.otherCharges:0;
    const totalPrice =  finalPrice+otherCharges

    const newObject = {
      id: obj.id,
      img: obj.image,
      price: obj.details.price,
      title: obj.title,
      description: obj.details.description,
      size: sizeValue,
      orderNumber:orderNumber,
      randomHSN:randomHSN,
      invoiceNumber:invoiceNumber,
      formattedDate:formattedDate,
      discountAmount:obj.details.discount,
      finalPrice:finalPrice,
      otherCharges: obj.details.otherCharges,
      totalPrice:totalPrice

      
      
      


    };

    console.log(newObject);

    const savedItems = localStorage.getItem("items");
    const items = savedItems ? JSON.parse(savedItems) : [];
    items.push(newObject);
    localStorage.setItem("items", JSON.stringify(items));
    setShowSizeWarning(false); // Reset warning message if size is selected
  };

  const location = useLocation();
  let product_info_details = location.state;

  const [productItemCount, setItemCount] = useState(1);
  const [hoverImg, setHoverImg] = useState(product_info_details.image);
  const [totalPrice, setTotalPrice] = useState(product_info_details.details.price);
  const defaultPrice = product_info_details.details.price;

  const countIncrement = () => {
    const newCount = productItemCount + 1;
    setItemCount(newCount);
    setTotalPrice(newCount * defaultPrice);
  };

  const countDecrement = () => {
    if (productItemCount > 0) {
      const newCount = productItemCount - 1;
      setItemCount(newCount);
      setTotalPrice(newCount * defaultPrice);
    }
  };

  const onImageChange = (img) => {
    setHoverImg(img);
  };

  const handleMouseLeave = () => {
    setHoverImg(product_info_details.image);
  };

  const handleSizeChange = (event) => {
    console.log(event.target.value);
    setSizeValue(event.target.value);
    setShowSizeWarning(false); // Reset warning message when size is selected
  };


  return (
    <>
      <div className="product-details-container">
        <div className="product-details-card">
          <div className="product-details-left-container">
            <div className="photo-cards">
              <div className="photo-sub-cards">
                {product_info_details.images.map((img, id) => {
                  return (
                    <div key={id}>
                      <img
                        className="sub-img"
                        src={require(`../../${img}`)}
                        alt="img"
                        onMouseOver={() => onImageChange(img)}
                        onMouseLeave={handleMouseLeave}
                      ></img>
                    </div>
                  );
                })}
              </div>
              <div className="main-pic-container">
                <img
                  src={require(`../../${hoverImg}`)}
                  alt="main-photo"
                  className="main-photo"
                ></img>
              </div>
            </div>
            <div className="cart-btn-group">
              <button className="shop-btn">Shop Now</button>
              <button
                className="basket-btn"
                onClick={() => handleClick(product_info_details)}
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="count-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg> */}
                Add to basket
              </button>
             
            </div>
          </div>
          <div className="product-info-container">
            <div className="product-info-1">
              <div className="product-info-title">
                {product_info_details.details?.description}
              </div>
              <div className="product-info-price">
                {product_info_details.details.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
              <div className="product-rating-section">
                <div className="product-rating-value">
                  {product_info_details.details.rating}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  className="product-star-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
            </div>
            <div className="product-info-1">
              <div className="product-info-title">Product Details</div>
              <div className="product-info-sub-title">
                Name: {product_info_details.details.description}
              </div>
              <div className="product-info-sub-title">
                Material : {product_info_details.material_type}
              </div>
            </div>
            <div className={`warning-border ${showSizeWarning ? 'warning-border' : 'product-info-1'}`}>

  <div className="product-info-title">Sizes</div>
  <div className="sizes-container">
    {product_info_details.details.sizes.map((size, id) => (
      <div key={id}>
         <label class="custom-radio">
  <input type="radio" name="radio"     value={size}
  onChange={handleSizeChange}
  ></input>
  <span class="radiomark">{size}</span>
 
</label>
       
      </div>
    ))}
  </div>

  <div className="quantity-section">
    <div className="text-name">Quantity</div>
    <div className="quantity-count">
      <svg
        onClick={countDecrement}
        style={{ cursor: "pointer" }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="count-icon"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
      <div>{productItemCount}</div>
      <svg
        style={{ cursor: "pointer" }}
        onClick={countIncrement}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="count-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5v14m7-7H5"
        />
      </svg>
    </div>
  </div>
  {showSizeWarning && (
    <div className="warning-message">Please select a size.</div>
  )}
</div>

            <div className="product-info-1">
              <div className="product-info-title">Customer reviews</div>
              <div className="product-info-sub-title">
                5 star reviews
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  className="product-star-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
            </div>
            <div className="product-info-1">
              <div className="product-info-title">Country of origin</div>
              <div className="product-info-sub-title">
                {product_info_details.details.country_of_origin}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductDetails;
