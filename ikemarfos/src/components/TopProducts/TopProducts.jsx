import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import Img4 from "../../assets/shirt/shirt4.png";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: Img4,
    title: "We Build Machines",
    description: "Bring Your Computer Specifications Then We Build For You.",
  },
  {
    id: 2,
    img: Img2,
    title: "Mobile Phones",
    description: "We Have All Your Favourite Brand Mobile Phones Available",
  },
  {
    id: 3,
    img: Img3,
    title: "Computer Repairs",
    description:
      "We Have Experts Who Repairs All Hardwares Within A Short Moment",
  },
];

const TopProducts = ({ handleOrderPopup }) => {
  return (
    <div className="container">
      {/* Header section */}
      <div className="text-center mb-24">
        <p data-aos="fade-up" className="text-sm text-black">
          Explore our range of products and services
        </p>
        <h1 data-aos="fade-up" className="bg-gradient-to-r from-orange-700 to-black text-transparent bg-clip-text text-3xl font-bold">
          Best Products For You
        </h1>
        <p data-aos="fade-up" className="text-xs text-black-400">
          We Offer Affordable Yet Quality Devices...
        </p>
      </div>
      {/* Body section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]">
        {ProductsData.map((data) => (
          <Link to="/products" key={data.id} className="max-w-[300px]">
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white light:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt={data.title}
                  className="max-w-[200px] block mx-auto transform -translate-y-10 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="bg-black hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={handleOrderPopup}
                >
                  Call Us Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Add PropTypes validation
TopProducts.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired,
};

export default TopProducts;
