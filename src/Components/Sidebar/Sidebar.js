import React, { useState, useEffect } from 'react';
import "../Sidebar/Sidebar.css";
import mbShowItems from "../../mobileShowItems.json";
import Offcanvas from "react-bootstrap/Offcanvas";
import categoriesItems from "../../categorieItems.json";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ showItem, onClose }) => {
  const [show, setShow] = useState(showItem);
  const [selectedCategory, setSelectedCategory] = useState(categoriesItems?.categories[0]?.category || '');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose(); // Call the parent close handler if provided
  };

  const clickEvent = (e) => {
    navigate(
      `/products?title=${e.title}&sub-title=${e.sub_title}&category=${e.category}&isManual=${false}`
    );
    handleClose();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProductId(product.id);
    clickEvent({
      title: product.product_title,
      category: product.product_category,
      sub_title: product.title,
    });
  };

  useEffect(() => {
    // Set default active product when category changes
    const firstProduct = mbShowItems.categories
      .filter(category => category.category === selectedCategory)
      .flatMap(category => category.subcategories)
      .flatMap(subcategory => subcategory.products)[0];

    if (firstProduct) {
      setSelectedProductId(firstProduct.id);
    }
  }, [selectedCategory]);

  // Filter categories based on selectedCategory
  const filteredCategories = mbShowItems.categories.filter(category => category.category === selectedCategory);

  return (
    <>
      <Offcanvas
        show={showItem}
        onHide={handleClose}
        scroll={true}
        className="offcanvas-fullwidth"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <div className="categories-container">
           
            <div className="categories-left">
              {categoriesItems?.categories.map((categoryItem, categoryId) => (
                <div
                  key={categoryId}
                  className={`mb-show-item ${selectedCategory === categoryItem.category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(categoryItem.category)}
                >
                  <img
                    className="mb-show-main-image"
                    src={require(`../../${categoryItem.img}`)}
                    alt={categoryItem.category}
                  />
                  <div>{categoryItem.category}</div>
                </div>
              ))}
            </div>

            {/* Right Side: Subcategories and Products */}
            <div className="categories-right">
              {filteredCategories.map((filteredCategory, filteredCategoryId) => (
                <div key={filteredCategoryId}>
                  {filteredCategory.subcategories.map((subcategory, subcategoryId) => (
                    <div key={subcategoryId} className="style-categories">
                      {subcategory.products.map((product) => (
                        <div
                          key={product.id}
                          className={`material-container ${selectedProductId === product.id ? 'active' : ''}`}
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="mb-show-item">
                            <img
                              className="mb-show-main-image"
                              src={require(`../../${product.image}`)}
                              alt={product.title}
                            />
                            <div>{product.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
