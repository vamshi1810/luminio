import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Product-Items/ProductItems.css";
import filter_colors_data from "../../filter-colors.json";
import products_sizes_data from "../../product-sizes.json";
import products from "../../products.json";
import Offcanvas from "react-bootstrap/Offcanvas";
import prices_data from "../../prices.json";
import ratings_data from "../../ratings.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import oop_img from "../../assets/ooop.jpg"

const ProductItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState("");
  const [selectedRange, setSelectedRange] = useState(null);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [selectedRating, setSelectedRating] = useState("");
  const [sortShow, setSortShow] = useState(false);
  const handleSortCanvasClose = () => setSortShow(false);
  const handleSortCanvasShow = () => setSortShow(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const titleParam = queryParams.get("title");
  const subTitleParam = queryParams.get("sub-title");
  const categoryParam = queryParams.get("category");
  const isManual = queryParams.get("isManual") === "true";
  const [priceSortOrder, setPriceSortOrder] = useState("");
  const [materialTypes, setMaterialTypes] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setSelectedStyles([]);
    setSelectedRange();
  }, [location]);
  const formattedProducts = products.categories
    .map((category) => {
      return category.subcategories.map((subcategory) => {
        return {
          category: category.category,
          main_title: subcategory.main_title,
          sub_title: subcategory.sub_title,
          material_types: subcategory.material_types,
          main_description: subcategory.title,
          products: subcategory.products.map((product) => ({
            ...product,
            details: {
              ...product.details,
            },
          })),
        };
      });
    })
    .flat();
   useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let relevantProducts = formattedProducts;

    if (isManual) {
      const searchTerms = titleParam
        ? titleParam
            .toLowerCase()
            .split(" ")
            .filter((term) => term.length > 0)
        : [];

      relevantProducts = formattedProducts.filter((product) => {
        const mainTitle = product.main_title.toLowerCase();
        const subTitle = product.sub_title.toLowerCase();
        const category = product.category.toLowerCase();

        return searchTerms.every(
          (term) =>
            matchesField(category, term) ||
            matchesField(mainTitle, term) ||
            matchesField(subTitle, term)
        );
      });
    } else {
      relevantProducts = formattedProducts.filter((product) => {
        const mainTitle = product.main_title.toLowerCase();
        const subTitle = product.sub_title.toLowerCase();
        const category = product.category.toLowerCase();

        const matchesTitle = titleParam
          ? mainTitle.includes(titleParam.toLowerCase())
          : true;
        const matchesSubTitle = subTitleParam
          ? subTitle.includes(subTitleParam.toLowerCase())
          : true;
        const matchesCategory = categoryParam
          ? category.includes(categoryParam.toLowerCase())
          : true;

        return matchesTitle && matchesSubTitle && matchesCategory;
      });
    }
    setNoResultsFound(relevantProducts.length === 0);

    const allMaterialTypes = relevantProducts.flatMap(
      (product) => product.material_types
    );

    const uniqueMaterialTypes = Array.from(
      new Set(allMaterialTypes.map((item) => item.value))
    ).map((value) => allMaterialTypes.find((item) => item.value === value));

    if (!areEqual(materialTypes, uniqueMaterialTypes)) {
      setMaterialTypes(uniqueMaterialTypes);
    }
  }, [formattedProducts, titleParam, subTitleParam, categoryParam, isManual]);

  function areEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item, index) => item.value === arr2[index].value);
  }

  const matchesField = (field, term) => {
    return field.toLowerCase().includes(term.toLowerCase());
  };

  const productMatchesSearchTerms = (product, searchTerms) => {
    const mainTitle = product.main_title.toLowerCase();
    const subTitle = product.sub_title.toLowerCase();
    const category = product.category.toLowerCase();
     return searchTerms.every((term) => {
      const termMatchesCategory = matchesField(category, term);
      const termMatchesMainTitle = matchesField(mainTitle, term);
      const termMatchesSubTitle = matchesField(subTitle, term);

      return termMatchesCategory || termMatchesMainTitle || termMatchesSubTitle;
    });
  };

  const filteredProducts = formattedProducts.filter((product) => {
    const searchTerms = titleParam
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    if (isManual === true) {
      const matchesAllTerms = productMatchesSearchTerms(product, searchTerms);

      const categoryMatches = searchTerms.some((term) =>
        matchesField(product.category.toLowerCase(), term)
      );

      return matchesAllTerms && categoryMatches;
    } else {
      const titleCheck =
        !titleParam ||
        matchesField(
          product.main_title.toLowerCase(),
          titleParam.toLowerCase()
        );
      const subTitleCheck =
        !subTitleParam ||
        matchesField(
          product.sub_title.toLowerCase(),
          subTitleParam.toLowerCase()
        );
      const categoryCheck =
        !categoryParam ||
        matchesField(
          product.category.toLowerCase(),
          categoryParam.toLowerCase()
        );

      return titleCheck && subTitleCheck && categoryCheck;
    }
  
  });

  const navigate = useNavigate();
  const handleClick = (productInfo) => {
    console.log("************", productInfo);
    navigate("/product-info", { state: productInfo });
  };

  const clearFilter = () => {
    setSelectedStyles([]);
  };

  const onSelectSize = (size) => {
    setSelectedSizes(size);
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedColors([...selectedColors, value]);
    } else {
      setSelectedColors(selectedColors.filter((color) => color !== value));
    }
  };

  const handleStyleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedStyles((prevSelectedStyles) => [...prevSelectedStyles, value]);
      console.log("selected styles is.........", selectedStyles);
    } else {
      setSelectedStyles((prevSelectedStyles) =>
        prevSelectedStyles.filter((style) => style !== value)
      );
    }
  };

  const handlePriceChange = (event) => {
    const range = JSON.parse(event.target.value);
    setSelectedRange(range);
  };
  const handleRatingChange = (event) => {
    const rating = JSON.parse(event.target.value);
    setSelectedRating(rating);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const [isVisible, setIsVisible] = useState(false);

 
  const searchFilteredProducts = filteredProducts
    .filter((productGroup) => {
      return (
        productGroup.products.filter((product) => {
          const styleMatch =
            selectedStyles.length === 0 ||
            selectedStyles.includes(product.material_type);
          const sizeMatch =
            selectedSizes === "" ||
            product.details.sizes.includes(selectedSizes);
          const ratingMatch =
            selectedRating === "" || product.details.rating >= selectedRating;
          const { min, max } = selectedRange || {};
          const priceMatch =
            !selectedRange ||
            (product.details.price >= min &&
              (max === null || product.details.price <= max));

          return styleMatch && sizeMatch && priceMatch && ratingMatch;
        }).length > 0
      );
    })
    .map((productGroup) => ({
      ...productGroup,
      products: productGroup.products
        .filter((product) => {
          const colorMatch =
            selectedColors.length === 0 ||
            selectedColors.some((color) =>
              product.details.colors.includes(color)
            );
          const queryMatch =
            searchQuery === "" ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase());
          const styleMatch =
            selectedStyles.length === 0 ||
            selectedStyles.includes(product.material_type);
          const sizeMatch =
            selectedSizes === "" ||
            product.details.sizes.includes(selectedSizes);
          const ratingMatch =
            selectedRating === "" || product.details.rating >= selectedRating;
          const { min, max } = selectedRange || {};
          const priceMatch =
            !selectedRange ||
            (product.details.price >= min &&
              (max === null || product.details.price <= max));

          return (
            colorMatch &&
            queryMatch &&
            styleMatch &&
            sizeMatch &&
            priceMatch &&
            ratingMatch
          );
        })
        .sort((a, b) => {
          if (priceSortOrder === "asc") {
            return a.details.price - b.details.price;
          } else if (priceSortOrder === "desc") {
            return b.details.price - a.details.price; 
          }
          return 0; 
        }),
    }));
  const onShowItems = () => {
    console.log("show items");
  };
 

  const categories = ["Category", "Price", "Rating", "Color", "Size"];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
    {
      noResultsFound?(
<div className="oop-container">
  <img src={oop_img} alt="oop_img" className="oop-img"></img>
  <div className="oop-title">Oops! No results found</div>
  <div className="oop-sub-title">Don’t worry, try searching for something else</div>
</div>
      ):(
        <div>
        <div className="filter-categories-mb-show">
        <div className="filter-items-container" onClick={handleShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="filter-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
          <div>Filter</div>
        </div>

        <div className="filter-items-container" onClick={handleSortCanvasShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="filter-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <div>Sort</div>
        </div>
      </div>

      <div className="categories-items">
        <div className={`product-items-filter ${isVisible ? "show" : ""}`}>
          <div className="filter-categories">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="categories-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            <div className="all-categories">All Categories</div>
          </div>
          <div className="brand-categories">
            <div className="brand-text">Brand</div>
            <div className="product-categories-input">
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="search-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>

          <div className="style-categories">
            <div class="divider-text">
              <span>Category</span>
            </div>
            <div className="material-container">
              {materialTypes.map((item, index) => (
                <div className="style-items" key={index}>
                  <label class="custom-checkbox">
                    <input
                      className="input-checkbox"
                      type="checkbox"
                      value={item.value}
                      checked={selectedStyles.includes(item.value)}
                      onChange={(event) => {
                        handleStyleChange(event);
                      }}
                    ></input>
                    <span class="checkmark">{item.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="style-categories">
            <div class="divider-text">
              <span>Price</span>
            </div>
            <div className="material-container">
              {prices_data.price_ranges.map((item, index) => (
                <div className="style-items" key={index}>
                  <label class="custom-radio">
                    <input
                      type="radio"
                      name="radio"
                      value={JSON.stringify(item.range)}
                      checked={
                        selectedRange &&
                        JSON.stringify(selectedRange) ===
                          JSON.stringify(item.range)
                      }
                      onClick={(event) => {
                        handlePriceChange(event);
                      }}
                    ></input>
                    <span class="radiomark">{item.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="style-categories">
            <div class="divider-text">
              <span>Rating</span>
            </div>
            <div className="material-container">
              {ratings_data.ratingFilters.map((item, index) => (
                <div className="style-items" key={index}>
                  <label class="custom-radio">
                    <input
                      type="radio"
                      name="radio"
                      value={JSON.stringify(item.value)}
                      onClick={(event) => {
                        handleRatingChange(event);
                      }}
                    ></input>
                    <span class="radiomark">{item.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product-items">
          {searchFilteredProducts.map((item) => (
            <div key={item.id} className="product-container">
              {item.products.map((product, key) => {
                return (
                  <div key={key}>
                    {isLoading ? (
                      <Skeleton
                        className="product-skeleton"
                        width={230}
                        height={350}
                      />
                    ) : (
                      <div
                        className="product-card"
                        onClick={() => handleClick(product)}
                      >
                        <img
                          className="product-img"
                          src={require(`../../${product.image}`)}
                          alt={product.title}
                        />

                        <div className="product-item-info">
                          <div className="currency-price">
                            {product.details?.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </div>
                          <div className="footer-title">{product.title}</div>
                          <div className="product-rating-section">
                            <div className="product-rating-value">
                              {product.details.rating}
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="white"
                              className="product-star-icon"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{ height: "700px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />

        <Offcanvas.Body>
          <div className="categories-container">
            <div className="categories-left">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`mb-show-filter-item ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div>{category}</div>
                </div>
              ))}
            </div>

            <div className="filter-categories-right">
              {activeCategory === "Category" && (
                <div className="filter-style-categories">
                  <div className="material-container">
                    {materialTypes.map((item, index) => (
                      <div className="style-items" key={index}>
                        <label className="custom-checkbox">
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value={item.value}
                            checked={selectedStyles.includes(item.value)}
                            onChange={(event) => {
                              handleStyleChange(event);
                            }}
                          />
                          <span className="checkmark">{item.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === "Price" && (
                <div className="filter-style-categories">
                  <div className="material-container">
                    {prices_data.price_ranges.map((item, index) => (
                      <div className="style-items" key={index}>
                        <label class="custom-radio">
                          <input
                            type="radio"
                            name="radio"
                            value={JSON.stringify(item.range)}
                            checked={
                              selectedRange &&
                              JSON.stringify(selectedRange) ===
                                JSON.stringify(item.range)
                            }
                            onClick={(event) => {
                              handlePriceChange(event);
                            }}
                          ></input>
                          <span class="radiomark">{item.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === "Rating" && (
                <div className="filter-style-categories">
                  <div className="material-container">
                    {ratings_data.ratingFilters.map((item, index) => (
                      <div className="style-items" key={index}>
                        <label class="custom-radio">
                          <input
                            type="radio"
                            name="radio"
                            value={JSON.stringify(item.value)}
                            onClick={(event) => {
                              handleRatingChange(event);
                            }}
                          ></input>
                          <span class="radiomark">{item.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === "Color" && (
                <div className="filter-style-categories">
                  <div className="material-container">
                    {filter_colors_data.map((item, index) => (
                      <div className="style-items" key={index}>
                        <label class="custom-radio">
                          <input
                            type="radio"
                            name="radio"
                            value={JSON.stringify(item.value)}
                            onClick={(event) => {
                              handleRatingChange(event);
                            }}
                          ></input>
                          <span class="radiomark">{item.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === "Size" && (
                <div className="filter-style-categories">
                  <div className="material-container">
                    {products_sizes_data.map((item, index) => (
                      <div className="style-items" key={index}>
                        <label class="custom-radio">
                          <input
                            type="radio"
                            name="radio"
                            value={JSON.stringify(item.value)}
                            onClick={(event) => {
                              handleRatingChange(event);
                            }}
                          ></input>
                          <span class="radiomark">{item.title}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={sortShow} onHide={handleSortCanvasClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sort</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sort-container">
            <div className="sort-container-item">
              <div className="brand-text">new arrivals</div>
              <div>
                <input type="radio" name="arrival"></input>
              </div>
            </div>
            <div className="sort-container-item">
              <div className="brand-text">Price (High to Low)</div>
              <div>
                <input
                  type="radio"
                  name="dsc"
                  value="dsc"
                  checked={priceSortOrder === "dsc"}
                  onChange={() => setPriceSortOrder("dsc")}
                ></input>
              </div>
            </div>
            <div className="sort-container-item">
              <div className="brand-text">Price (Low to High)</div>
              <div>
                <input
                  type="radio"
                  name="asc"
                  value="asc"
                  checked={priceSortOrder === "asc"}
                  onChange={() => setPriceSortOrder("asc")}
                ></input>
              </div>
            </div>
            <div className="sort-container-item">
              <div className="brand-text">Ratings</div>
              <div>
                <input type="radio" name="arrival"></input>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
      )

    }
     
    </>
  );
};

export default ProductItems;
