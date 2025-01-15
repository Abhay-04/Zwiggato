import React, { useEffect } from "react";
import ResCard from "./ResCard";
import { useState } from "react";
import { RESTAURANT_LIST_API } from "../utils/constants";
import WhatsOnYourMind from "./WhatsOnYourMind";

import ShimmerofResCard from "./ShimmerofResCard";
import { Link, useNavigate, Navigate } from "react-router-dom";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";

import Offline from "./Offline";
import TopBrands from "./TopBrands";
import ItemNotFound from "./ItemNotFound";

const RestaurantList = () => {
  const [listofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allData, setAllData] = useState([]);
  const [topBrands, setTopBrands] = useState([]);

  const [womData, setWomData] = useState([]);

  const [isFirstBtnActive, setIsFirstBtnActive] = useState(false);
  const [isSecondBtnActive, setIsSecondBtnActive] = useState(false);
  const [isThirdBtnActive, setIsThirdBtnActive] = useState(false);
  const [activeLocation, setActiveLocation] = useState("");

  const [lat, setLat] = useState(28.7041);
  const [lng, setLng] = useState(77.1025);

  const geolocationAPI = navigator.geolocation;
  const getUserCoordinates = () => {
    if (!geolocationAPI) {
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          setLat(coords.latitude);
          setLng(coords.longitude);
          listofRestaurants.length = 0;
        },
        (error) => {}
      );
    }
  };

  const handleLocationClick = (location, lat, lng) => {
    listofRestaurants.length = 0;
    setActiveLocation(location); // Set the active location
    setLat(lat); // Assuming setLat and setLng are defined in the component
    setLng(lng);
  };
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const raw = await fetch(
        `https://my-backend-server-delta.vercel.app/api/restaurants?lat=${lat}&lng=${lng}`
      );

      const data = await raw.json();

      if (
        data?.data?.cards[0]?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.seo.widgets.v1.SwiggyNotPresent"
      ) {
        navigate("/locationUnservicable"); // Redirect to the error route
        return null; // Prevent further execution
      }

      setListofRestaurants(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      setFilteredRestaurants(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      setAllData(data?.data);

      setWomData(
        data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
      );

      setTopBrands(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  useEffect(() => {
    const filteredList = listofRestaurants.filter(
      (res) =>
        res.info.name
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        res.info.cuisines
          .join("")
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
    );

    setFilteredRestaurants(filteredList);
  }, [searchText]);

  const status = useOnlineStatus();

  if (status === false) return <Offline />;

  return listofRestaurants.length === 0 ? (
    <ShimmerofResCard />
  ) : (
    <div className="main-container   sm:px-8 m-auto xl:w-[90vw] 2xl:w-[80vw] p-4 overflow-hidden">
      <div className="location-container ">
        <div className="location flex flex-wrap gap-2 sm:gap-2 mb-6 mt-3 md:my-3 items-center justify-start">
          <button
            className={`sm:px-4 sm:py-2  p-2 border-2 rounded-md ${
              activeLocation === "Your Location" ? "bg-[#b6b6b6]" : "bg-white"
            } hover:bg-gray-400 hover:text-white`}
            onClick={() =>
              getUserCoordinates() || setActiveLocation("Your Location")
            }
          >
            <i class="ri-map-pin-line mr-1"></i>Your Location
          </button>

          <button
            className={`sm:px-4 sm:py-2 p-2 border-2 ${
              activeLocation === "Mumbai" ? "bg-[#b6b6b6]" : "bg-white"
            } rounded-md hover:bg-gray-400 hover:text-white`}
            onClick={() => handleLocationClick("Mumbai", 19.076, 72.8777)}
          >
            Mumbai
          </button>
          <button
            className={`sm:px-4 sm:py-2 p-2 border-2 ${
              activeLocation === "Bangalore" ? "bg-[#b6b6b6]" : "bg-white"
            } rounded-md hover:bg-gray-400 hover:text-white`}
            onClick={() =>
              handleLocationClick("Bangalore", 12.9715987, 77.5945627)
            }
          >
            Bangalore
          </button>
          <button
            className={`sm:px-4 sm:py-2 p-2 border-2 ${
              activeLocation === "Gurgaon" ? "bg-[#b6b6b6]" : "bg-white"
            }  rounded-md hover:bg-gray-400 hover:text-white`}
            onClick={() => handleLocationClick("Gurgaon", 28.4595, 77.0266)}
          >
            Gurgaon
          </button>
        </div>
      </div>

      <div className="whatsMind-container ">
        <WhatsOnYourMind data={womData} />
      </div>

      <div className="topBrand-conatiner ">
        <TopBrands data={topBrands} dataT={allData} />
      </div>

      <div className=" restaurantList-container   ">
        <div className="heading ">
          <h3 className=" text-2xl mt-10  font-extrabold  ">
            {allData?.cards[2]?.card?.card?.title}
          </h3>
        </div>

        <div className="filterIcons flex flex-wrap gap-2 lg:gap-3 mt-5 mb-10 items-center  ">
          <div className="searchBar w-screen md:w-auto">
            <input
              placeholder="Restaurants/ Cuisines"
              className="p-3 md:p-5 mr-2 font-bold text-xs md:text-[14px] text-[#02060c] opacity-[70%] w-full md:w-auto h-[40px] items-center border border-black rounded-lg"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
          </div>

          <button
            className={` ${
              isFirstBtnActive ? "bg-[#b6b6b6]" : "bg-white"
            } p-2 hover:bg-[#b6b6b6] font-bold text-[14px] text-[#02060c] opacity-[70%] w-[50px] md:w-[80px] h-[40px] items-center border border-black rounded-lg`}
            onClick={() => {
              setFilteredRestaurants(listofRestaurants);
              setIsFirstBtnActive(!isFirstBtnActive);
            }}
          >
            All
          </button>

          <button
            className={` ${
              isSecondBtnActive ? "bg-[#b6b6b6] " : "bg-white"
            } p-2 hover:bg-[#b6b6b6]  font-bold text-[14px] text-[#02060c] opacity-[70%] w-[110px] lg:w-[130px] h-[40px] items-center border border-black rounded-lg`}
            onClick={() => {
              const aboveFourPointFiveList = listofRestaurants.filter(
                (restaurants) => restaurants.info.avgRating >= 4.5
              );

              setIsSecondBtnActive(!isSecondBtnActive);
              setIsThirdBtnActive(false);

              setFilteredRestaurants(aboveFourPointFiveList);
            }}
          >
            Rating 4.5+
          </button>

          <button
            className={` p-2 ${
              isThirdBtnActive ? "bg-[#b6b6b6]" : "bg-white"
            } font-bold text-[14px] hover:bg-[#b6b6b6] text-[#02060c] opacity-[70%] w-[130px] h-[40px] items-center border border-black rounded-lg`}
            onClick={() => {
              const aboveFourList = listofRestaurants.filter(
                (restaurants) => restaurants.info.avgRating > 4.0
              );
              // setIsThirdBtnActive(!isThirdBtnActive);
              // setIsSecondBtnActive(false);

              setFilteredRestaurants(aboveFourList);
            }}
          >
            Rating 4.0+
          </button>
        </div>

        <div className="resList grid  grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredRestaurants.length === 0 ? (
            <ItemNotFound />
          ) : (
            filteredRestaurants.map((restaurants, index) => {
              return (
                <Link
                  key={restaurants?.info?.id}
                  to={"/restaurant/" + restaurants?.info?.id}
                >
                  <ResCard resData={restaurants} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
