import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResCard from "./ResCard";
import { CDN_URL } from "../utils/constants";

const TopBrands = ({ data, dataT }) => {
  console.log(data, dataT);


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#F97316" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: "block", background: "#F97316"  }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
 
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1, // Adjust to scroll one slide at a time
    responsive: [
      {
        breakpoint: 1024, // For large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1, // Scroll one slide at a time
          dots: false,
        },
      },
      {
        breakpoint: 800, // For medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1, // Scroll one slide at a time
          dots: false,
        },
      },
      {
        breakpoint: 480, // For small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, // Scroll one slide at a time
          dots: false,
        },
      },
      {
        breakpoint: 280, // For extra small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, // Scroll one slide at a time
          rows: 2, // Display items in two rows if needed
          dots: false,
        },
      },
    ],
  };

  return (
    <>
    <h1 className="text-lg sm:text-2xl font-extrabold py-6">
        {dataT.cards[1].card.card.header.title}
      </h1>
    <div className="slider-container border-gray-100 border-b-2  pb-3 lg:pb-10 mx-4 sm:mx-1  ">
      
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item?.info?.id} >
            <Link to={"/restaurant/" + item?.info?.id}>
              <div className="sm:mx-8">
              <ResCard resData={item} />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
};

export default TopBrands;

