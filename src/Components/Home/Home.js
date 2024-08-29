import React, { useState } from "react";

import DealCard from "../DealCard/DealCard";
import photo_bag from "../../assets/photo bag.png";

import treading_img from "../../assets/top.png";
import AdvertisementCard from "../AdvertisementCard/AdvertisementCard";

import "../Home/Home.css";
import TreadingCard from "../TreadingCard/TreadingCard";

import TopCard from "../TopCards/TopCard";
import photo_bag_1 from "../../assets/mid.png";
import shoe_1 from "../../assets/mid-1.png";
import rice_cooker from "../../assets/rice-cooker.jpg";
import iron_box from "../../assets/iron_box.jpg";
import tv_img from "../../assets/tv.jpg";
import kitchen_pan from "../../assets/pan.jpg";
import watch from "../../assets/watch-2.jpg";
import trading_img_1 from "../../assets/xmk8d_512.jpg";
import trading_img_2 from "../../assets/treading-2.jpg";
import trading_img_3 from "../../assets/nty9c_512.jpg";

import trading_img_4 from "../../assets/jaj8f_512.jpg";
import trading_img_5 from "../../assets/d4rza_512.jpg";

import top_1_img from "../../assets/0xnuz_512.jpg";

import top_2_img from "../../assets/o09ny_512.jpg";
import top_3_img from "../../assets/egbvq_512.jpg";
import top_4_img from "../../assets/jdvjs_512.jpg";
import top_5_img from "../../assets/y9g6k_512.jpg";
import top_6_img from "../../assets/9hcx0_512.jpg";

import top_8_img from "../../assets/x38yf_512.jpg";
import hero_img from "../../assets/hero.png"
import top_7_img from "../../assets/rwvqv_512.jpg";
let flashSalesData = [
  {
    day: "Deal of the Day",
    time: "12:43:12",
    id: 1,
    title: "Tonny Black.",
    sub_title: "Shoulder bag-White-Plain",
    items: 54,
    dollar: "$64.5",
    price: "$98.65",
    percentage: "4%",
    img: photo_bag,
  },
  {
    day: "Deal of the Day",
    time: "02:45:32",
    id: 2,
    title: "Asian men's synthetic.",
    sub_title: "Sports,Running,Casual Loafer",
    items: 34,
    dollar: "$122.5",
    price: "$625.55",
    percentage: "- 38%",
    img: shoe_1,
  },
  {
    day: "Deal of the Day",
    time: "12:43:12",
    id: 3,
    title: "Tonny Black.",
    sub_title: "Shoulder bag-White-Plain",
    items: 54,
    dollar: "$64.5",
    price: "$98.65",
    percentage: "4%",
    img: photo_bag_1,
  },
  {
    day: "Deal of the Day",
    time: "05:45:22",
    id: 4,
    title: "Holic 1.8 L Electric Cooker pot .",
    sub_title: "Stainless Steel Steamer",
    items: 58,
    dollar: "$6,189",
    price: "$5,189",
    percentage: "-48%",
    img: rice_cooker,
  },
  {
    day: "Deal of the Day",
    time: "02:40:12",
    id: 5,
    title: "BajajLight Weight Dry Iron (Grey).",
    sub_title: "Non-stick coated sole plate",
    items: 54,
    dollar: "$788.5",
    price: "$254.65",
    percentage: "47%",
    img: iron_box,
  },
  {
    day: "Deal of the Day",
    time: "02:45:32",
    id: 6,
    title: "Noise Pulse Go Buzz Smart.",
    sub_title: "Watch with Advanced Bluetooth Calling, 1.69",
    items: 34,
    dollar: "$4099.5",
    price: "$1000.55",
    percentage: "- 80%",
    img: watch,
  },
  {
    day: "Deal of the Day",
    time: "08:45:32",
    id: 7,
    title: "Sony Bravia 139 cm (55 inches) 4K.",
    sub_title: "Ultra HD Smart LED Google TV ",
    items: 34,
    dollar: "$1.92.500",
    price: "$1.39.55",
    percentage: "-39%",
    img: tv_img,
  },
  {
    day: "Deal of the Day",
    time: "02:45:32",
    id: 8,
    title: "SOLIMO - NON STICK KADAI",
    sub_title: "INDUCTION AND GAS STOVE COMPATIBLE)",
    items: 34,
    dollar: "$999.5",
    price: "$499.55",
    percentage: "- 58%",
    img: kitchen_pan,
  },
];

let treadingSalesData = [
  {
    title: "Cool & Sexy Calvin Klein",
    sub_title: "Dotted dress-Casual",
    price: 89,
    img: treading_img,
  },
  {
    title: " western dress for girls",
    sub_title: "women frocks cotton maxi",
    price: 589,
    img: trading_img_1,
  },
  {
    title: "Classy Elegant Designer ",
    sub_title: "Three-Quarter Sleeves",
    price: 289,
    img: trading_img_2,
  },
  {
    title: "Yagnik Fashion  Dresses",
    sub_title: "Sleeve Length : Short Sleeves",
    price: 239,
    img: trading_img_3,
  },
  {
    title: "Women Sleeveless Black",
    sub_title: "Western Summer Cotton",
    price: 489,
    img: trading_img_4,
  },
  {
    title: "Kremiza Women's",
    sub_title: "Multicolor Color",
    price: 339,
    img: trading_img_5,
  },
];

let topItemsData = [
  {
    title: "Fabric V Neck Top",
    sub_title: "Sleeve Length : Long Sleeves",
    img: top_1_img,
    actual_Price: "458",
    price: "337",
    discount: "10%",
  },
  {
    title: "Women Dress, frock,Kurti",
    sub_title: "Three-Quarter Sleeves",
    img: top_2_img,
    actual_Price: "229",
    price: "139",
    discount: "50%",
  },
  {
    title: "womens Crepe Printed top daily use",
    sub_title: "Sleeve Length : Short Sleeves",
    img: top_3_img,
    actual_Price: "205",
    price: "195",
    discount: "9%",
  },
  {
    title: "Trendy Black Top For Women",
    sub_title: "Sleeve Length : Short Sleeves",
    img: top_4_img,
    actual_Price: "236",
    price: "200",
    discount: "5%",
  },
  {
    title: "Pretty Designer Women Tops & Tunics",
    sub_title: "Sleeve Length : Three-Quarter Sleeves",
    img: top_5_img,
    actual_Price: "295",
    price: "200",
    discount: "10%",
  },
  {
    title: "Women Dress, frock,Kurti",
    sub_title: "Three-Quarter Sleeves",
    img: top_6_img,
    actual_Price: "229",
    price: "139",
    discount: "50%",
  },
  {
    title: "Fancy Elegant Women Tops",
    sub_title: "Length : Three-Quarter Sleeves",
    img: top_7_img,
    actual_Price: "232",
    price: "159",
    discount: "10%",
  },
  {
    title: "cotton purple tunic top for womens ",
    sub_title: "Sleeve Length : Three-Quarter Sleeves",
    img: top_8_img,
    actual_Price: "281",
    price: "209",
    discount: "20%",
  },
];

let heroInfo = {
  img:hero_img
}
export const myContext = React.createContext();

export const trendingContext = React.createContext();
export const topSalesContext = React.createContext();
const Home = () => {
  



  const [itemCounts, setItemCounts] = useState({
    flashSales: 4,
    trending: 3,
    topSales: 4,
  });
  

  const [displayedFlashSalesItems, setDisplayedFlashSalesItems] = useState(
    flashSalesData.slice(0, itemCounts.flashSales)
  );

  const [displayedTrendingItems, setDisplayedTrendingItems] = useState(
    treadingSalesData.slice(0, itemCounts.trending)
  );
  const [displayedSalesItems, setDisplayedSalesItems] = useState(
    topItemsData.slice(0, itemCounts.topSales)
  );

  const viewHandle = (type) => {
    if (type === "flashSales") {
      const nextIndex = itemCounts.flashSales + 4;
      setDisplayedFlashSalesItems(flashSalesData.slice(0, nextIndex));
      setItemCounts((prevCounts) => ({ ...prevCounts, flashSales: nextIndex }));
    } else if (type === "trending") {
      const nextIndex = itemCounts.trending + 3;
      setDisplayedTrendingItems(treadingSalesData.slice(0, nextIndex));
      setItemCounts((prevCounts) => ({ ...prevCounts, trending: nextIndex }));
    } else if (type === "topSales") {
      const nextIndex = itemCounts.topSales + 4;
      setDisplayedSalesItems(topItemsData.slice(0, nextIndex));
      setItemCounts((prevCounts) => ({ ...prevCounts, trending: nextIndex }));
    }
  };

  const [treadingCurrentIndex, setTreadingCurrentIndex] = useState(3);

  return (
    <>
      <div className="summer-essentials-card">
         
        <div className="summer-essentials-card-title">Summer Essentials</div>
        <div className="summer-essentials-card-percentage">20%</div>
        <div className="summer-card-date">19 Jul-30 Jul</div>
      </div>
      <div className="hero">
      <img src={heroInfo.img} alt="hero-image" className="hero-img" />
        <div className="hero-section-content">
          <div className="hero-title">Kimonos, Caftans & Pareos</div>
          <div className="hero-sub-title">
            Poolside glam included From $4.99
          </div>
          <div>
            <button className="hero-btn">Shop now</button>
          </div>
        </div>
      </div>

      <div className="home-deal-card-section">
        <div className="home-deal-card">
          <div className="home-deal-card-title"> Flash Sales</div>
          <div
            className="home-deal-card-view"
            style={{ cursor: "pointer" }}
            onClick={() => viewHandle("flashSales")}
          >
            <div className="view-all-text">View All</div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="left-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        <myContext.Provider value={displayedFlashSalesItems}>
          <DealCard></DealCard>
        </myContext.Provider>
      </div>

      <div className="home-deal-card-section">
        <div className="home-deal-card">
          <div className="home-deal-card-title">Trending must-haves</div>
          <div
            className="home-deal-card-view"
            style={{ cursor: "pointer" }}
            onClick={() => viewHandle("trending")}
          >
            <div className="view-all-text">View All</div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="left-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>

        <trendingContext.Provider value={displayedTrendingItems}>
          <TreadingCard></TreadingCard>
        </trendingContext.Provider>
      </div>
      <AdvertisementCard></AdvertisementCard>
      <div className="home-deal-card-section">
        <div className="home-deal-card">
          <div className="home-deal-card-title">Top100</div>
          <div
            className="home-deal-card-view"
            style={{ cursor: "pointer" }}
            onClick={() => viewHandle("topSales")}
          >
            <div className="view-all-text">View All</div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="left-arrow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>

        <topSalesContext.Provider value={displayedSalesItems}>
          <TopCard></TopCard>
        </topSalesContext.Provider>
      </div>

     
    </>
  );
};

export default Home;
