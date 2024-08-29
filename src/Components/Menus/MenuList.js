import React, { useState } from "react";
import "../Menus/MenuList.css";

import { useNavigate } from "react-router-dom";
import womenItems from "../../women_items.json";
import Modal from "react-bootstrap/Modal";
import menItems from "../../menItems.json";
import kidsItems from "../../kidsData.json";
import electronicsItems from "../../electronics.json";
import footwearItems from "../../bags-footer.json";
import healthItems from "../../beatyHealthData.json";
import jewelleryItems from "../../jewlleryData.json";
import homeItems from "../../homeFurnitureData.json";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const MenuList = () => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState();
  const [category, setCategory] = useState();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (items, category) => {
    console.log(items);

    setShow(true);
    setItems(items);
    setCategory(category);
  };

  const navigate = useNavigate();
  const clickEvent = (e) => {
    console.log(e)
    navigate(
      `/products?title=${e.title}&sub-title=${
        e.sub_title
      }&category=${category}&isManual=${false}`
    );
    setShow(false);
  };
  return (
    <>
      <div className="mb-lp-show">
        <div className="menu-items">
          <div
            className="menu-item"
            onMouseOver={() => handleShow(womenItems, "women")}
          >
            Women
          </div>

          <div
            className="menu-item"
            onMouseOver={() => handleShow(menItems, "men")}
          >
            Men
          </div>

    
          <div className="menu-item" onMouseOver={() => handleShow(kidsItems,"kids")}>
            Kids
          </div>

          <div className="menu-item" onMouseOver={() => handleShow(homeItems,"furniture")}>
            Home & Furniture
          </div>
          <div
            className="menu-item"
            onMouseOver={() => handleShow(jewelleryItems,"Jewellery")}
          >
            Jewellery & Accessories
          </div>

          <div
            className="menu-item"
            onMouseOver={() => handleShow(healthItems,"Makeup")}
          >
            Cosmetics
          </div>

          <div
            className="menu-item"
            onMouseOver={() => handleShow(footwearItems,"Bags-Footwear")}
          >
            Footwear & Bags
          </div>
          <div
            className="menu-item"
            onMouseOver={() => handleShow(electronicsItems,"Electronics")}
          >
            Electronics
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName="women-model"
      >
        <Modal.Body>
          <div className="items-container">
            {items?.categories.map((item, id) => {
              return (
                <div className="men-card">
                  <div className="men-card-title">{item.name}</div>
                  {item.subcategories.map((list, id) => {
                    return (
                      <div>
                        <div
                          className="men-card-sub-title"
                          onClick={() => {
                            clickEvent({
                              title: `${item.value}`,
                              category:category,
                              sub_title: `${list.value}`,
                            });
                          }}
                        >
                          {list.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuList;
