import React, { useEffect, useState, useRef } from "react";
import "../CartDetails/CartDetails.css";
import cart_empty_img from "../../assets/cart-empty-image-1.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const CartDetails = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [editItems, setEditItems] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [selectedAddressInfo, setSelectedAddress] = useState();

  const [addressFormData, setAddressFormData] = useState({
    id: null,
    name: "",
    contact: "",
    houseNo: "",
    area: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [addressInfo, setAddressInfo] = useState(false);

  const handleAddressModelShow = () => {
    console.log("test");
    setAddressInfo(true);
  };

  const handleAddressModelClose = () => {
    setAddressInfo(false);
  };

  const handleModelClose = () => {
    setModalShow(false);
  };
  const handleModelShow = (del) => {
    console.log(del);
    setModalShow(true);
    setDeleteItem(del);
  };

  const selectAddress = (evt) => {
    const selectedAddress = "selectedAddress";

    // Create the object with the selected address
    let obj = { ...evt, [selectedAddress]: true };

    // Store the object in localStorage as a JSON string
    localStorage.setItem("selected-address", JSON.stringify(obj));

    // Retrieve the object from localStorage and parse it back into an object
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData({ ...addressFormData, [name]: value });

    // Clear the error for the field if the input is valid
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Validate form fields
  const validate = () => {
    let formErrors = {};
    if (!addressFormData.name) formErrors.name = "Name is required";
    if (!addressFormData.contact) formErrors.contact = "Contact is required";
    if (!addressFormData.houseNo) formErrors.houseNo = "House No is required";
    if (!addressFormData.area) formErrors.area = "Area is required";
    if (!addressFormData.pinCode) formErrors.pinCode = "Pin Code is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (validate()) {
      const addresses = JSON.parse(localStorage.getItem("selecte")) || [];
      const newAddress = {
        ...addressFormData,
        id: Date.now(), // Generate unique ID
      };
      addresses.push(newAddress);
      localStorage.setItem("addresses", JSON.stringify(addresses));
      resetForm(); // Reset the form after adding
      alert("Address added successfully!"); // Optional: Provide user feedback
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (validate()) {
      const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
      const updatedAddresses = addresses.map((addr) =>
        addr.id === addressFormData.id ? { ...addr, ...addressFormData } : addr
      );
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      resetForm(); // Reset the form after editing
      alert("Address updated successfully!"); // Optional: Provide user feedback
    }
  };

  // Reset form after submit
  const resetForm = () => {
    setAddressFormData({
      id: null,
      name: "",
      contact: "",
      houseNo: "",
      area: "",
      pinCode: "",
    });
    setIsEdit(false);
    setErrors({});
  };
  const loadAddressForAdd = () => {
    console.log("welcome");
    setIsEdit(false);
    handleAddressModelShow();

    setAddressFormData({
      id: null,
      name: "",
      contact: "",
      houseNo: "",
      area: "",
      pinCode: "",
    });
  };

  // Load form data for editing
  const loadAddressForEdit = (id, isEdit) => {
   
    
    handleAddressModelShow();
    setIsEdit(isEdit);

    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const addressToEdit = addresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setAddressFormData(addressToEdit);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (etItems) => {
    setShow(true);
    setEditItems(etItems);
  };

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const ProductDelete = (item) => {
    const updatedItems = items.filter(
      (currentItem) => currentItem.id !== item.id
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setModalShow(false);
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(activeStep);
    if (activeStep === 2) {
      const selectedAddressesDetails = JSON.parse(
        localStorage.getItem("selected-address")
      );
      setSelectedAddress(selectedAddressesDetails);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();

  const placeOrder = () => {
   let orderItems= localStorage.getItem("items");
   localStorage.setItem("orderItems",orderItems)
   localStorage.removeItem("items")
    navigate("/order-items");
  };

  return (
    <>
        <div className="stepper-container">
        {items.length > 0 ? (
        <div className="stepper">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`step ${index <= activeStep ? "active" : ""}`}
            >
              <div className="step-number">{index + 1}</div>

              {index < steps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>
        ):(
          <div></div>
        )}
      </div>

      {items.length > 0 ? (


        <div className="cart-main-container">
        
          {activeStep === 0 && (
            <div className="cart-left-side-container">
              <h6 className="cart-title">Product Details</h6>
              {items.map((item) => (
                <div className="cart-container" key={item.id}>
                  <div className="cart-img-container">
                    <img
                      src={require(`../../${item.img}`)}
                      className="cart-img"
                      alt="product"
                    />
                    <div className="left-side-cart-content">
                      <div className="cart-img-title">
                        {truncateDescription(item.title, 56)}
                      </div>
                      <div className="cart-img-title">
                        {item.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </div>
                      <div className="cart-img-title">Size: {item.size}</div>
                      <div className="cart-item-delete-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="trash-icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <div
                          className="cart-img-title"
                          onClick={() => handleModelShow(item)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="edit-cart" onClick={() => handleShow(item)}>
                    Edit
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeStep === 1 && (
            <div className="cart-left-side-container">
              <div className="cart-address-title-container">
                <h6 className="cart-title">Select Delivery Address</h6>
                <div className="edit-cart " onClick={loadAddressForAdd}>
                  ADD NEW ADDRESS
                </div>
              </div>
              {JSON.parse(localStorage.getItem("addresses"))?.map((address) => {
                return (
                  <div className="cart-info-address-container">
                    <div className="cart-info-address-sub">
                      <input
                        type="radio"
                        name="address"
                        onChange={() => selectAddress(address)}
                      ></input>
                      <div className="cart-address-info">
                        <div>ADD NEW ADDRESS</div>
                        <p>5-2, building, mancherial, Telangana, 504207</p>
                        <p>8008448615</p>
                      </div>
                    </div>
                    <div
                      className="edit-cart "
                      onClick={() => loadAddressForEdit(address.id, true)}
                    >
                      Edit
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {activeStep === 2 && (
            <div className="cart-left-side-container">
              <h6 className="cart-title">Select Payment Method</h6>
              <div className="payment-cart-container">
                <div className="payment-cart-details">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="cash-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                  <div>Pay cash on delivery</div>
                </div>
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className="summery-container">
              <div className="cart-left-side-container">
                <h6 className="cart-title">Product Details</h6>
                {items.map((item) => (
                  <div className="cart-container" key={item.id}>
                    <div className="cart-img-container">
                      <img
                        src={require(`../../${item.img}`)}
                        className="cart-img"
                        alt="product"
                      />
                      <div className="left-side-cart-content">
                        <div className="cart-img-title">
                          {truncateDescription(item.description, 56)}
                        </div>
                        <div className="cart-img-title">
                          {item.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </div>
                        <div className="cart-img-title">Size: {item.size}</div>
                        <div className="cart-item-delete-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="trash-icon"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <div
                            className="cart-img-title"
                            onClick={() => handleModelShow(item)}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-address-container">
                <div className="cart-address-title-container">
                  <h6 className="cart-title">Address</h6>
                </div>

                <div className="cart-info-address-container">
                  <div className="cart-info-address-sub">
                    <input type="radio" name="address" checked={true}></input>
                    <div className="cart-address-info">
                      <div>{selectedAddressInfo.name || "ADD NEW ADDRESS"}</div>
                      <p>
                        {selectedAddressInfo.area ||
                          "5-2, building, mancherial, Telangana, 504207"}
                      </p>
                      <p>{selectedAddressInfo.phone || "8008448615"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-left-side-container">
                <h6 className="cart-title">Select Payment Method</h6>
                <div className="payment-cart-container">
                  <div className="payment-cart-details">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="cash-icon"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                      />
                    </svg>
                    <div>Pay cash on delivery</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="product-order-cart-container">
            <h6 className="cart-title">Product Items ({items.length})</h6>
            <div className="product-items-price-container">
              <div className="cart-img-title">Total Product Price</div>
              <div className="cart-img-title">
                {totalPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
            </div>
            <div className="product-items-price-container">
              <div className="order-total">Order Total</div>
              <div className="order-total">
                {totalPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
            </div>
            {activeStep == 0 || activeStep == 1 || activeStep == 2 ? (
              <button
                id="cart-btn"
                disabled={activeStep === steps.length - 1}
                onClick={handleNext}
              >
                Continue
              </button>
            ) : (
              <button id="cart-btn" onClick={placeOrder}>
                Place order
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="cart-empty-container">
          <img
            src={cart_empty_img}
            alt="cart-image"
            className="cart-empty-img"
          />
          <div className="cart-empty-title">Your cart is empty</div>
          <div className="cart-empty-sub-title">
            Just relax, let us help you find some first-class products
          </div>
          <button className="cart-empty-btn">Start Shopping</button>
        </div>
      )}

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>EDIT ITEM</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {editItems ? (
            <div className="offcanvas-cart-container">
              <div className="cart-img-container">
                <img
                  src={require(`../../${editItems.img}`)}
                  className="cart-img"
                  alt="product"
                />
                <div className="left-side-cart-content">
                  <div className="cart-img-title">
                    {truncateDescription(editItems.description, 56)}
                  </div>
                  <div className="cart-img-title">
                    {editItems.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </div>
                  <div className="cart-img-title">Size: {editItems.size}</div>
                </div>
              </div>
              <div className="product-items-price-container">
                <div className="order-total">Order Total</div>
                <div className="order-total">
                  {totalPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </div>
              </div>
              <button className="off-btn">Continue</button>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={addressInfo}
        onHide={handleAddressModelClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ADD DELIVERY ADDRESS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form>
            <div className="cart-address--info-container">
              <div className="contact-details-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="phone-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <div className="contact-details">Contact Details</div>
              </div>
              <div>
                <label>Name:</label>
                <div className="sign-in-card-container">
                  <input
                    id="sign-input"
                    type="text"
                    name="name"
                    value={addressFormData.name}
                    onChange={handleChange}
                    className={errors.name ? "error-border" : ""}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
              </div>
              <div>
                <label>Contact:</label>
                <div className="sign-in-card-container">
                  <input
                    type="number"
                    name="contact"
                    id="sign-input"
                    value={addressFormData.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <span className="error">{errors.contact}</span>
                  )}
                </div>
              </div>
              <div>
                <label>House No:</label>
                <div className="sign-in-card-container">
                  <input
                    type="text"
                    name="houseNo"
                    value={addressFormData.houseNo}
                    onChange={handleChange}
                    id="sign-input"
                  />
                  {errors.houseNo && (
                    <span className="error">{errors.houseNo}</span>
                  )}
                </div>
              </div>
              <div>
                <label>Area:</label>
                <div className="sign-in-card-container">
                  <input
                    type="text"
                    name="area"
                    value={addressFormData.area}
                    onChange={handleChange}
                    id="sign-input"
                  />
                  {errors.area && <span className="error">{errors.area}</span>}
                </div>
              </div>
              <div>
                <label>Pin Code:</label>
                <div className="sign-in-card-container">
                  <input
                    type="number"
                    name="pinCode"
                    value={addressFormData.pinCode}
                    onChange={handleChange}
                    id="sign-input"
                  />
                  {errors.pinCode && (
                    <span className="error">{errors.pinCode}</span>
                  )}
                </div>
              </div>
            </div>
            {isEdit ? (
              <button onClick={handleEdit} className="off-btn">
                Edit
              </button>
            ) : (
              <button onClick={handleAdd} className="off-btn">
                Add
              </button>
            )}
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={modalShow} size="md" centered onHide={handleModelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to remove this product from cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => ProductDelete(deleteItem)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartDetails;
