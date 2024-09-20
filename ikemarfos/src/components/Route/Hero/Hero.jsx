import { Link } from "react-router-dom";
import Slider from "react-slick";
import styles from "../../../styles/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../../../assets/hero/women.png";
import Image2 from "../../../assets/hero/shopping.png";
import Image3 from "../../../assets/hero/sale.png";
import Image4 from "../../../assets/logo.png";
import video1 from "../../../assets/video1.mp4";
import video2 from "../../../assets/video2.mp4";
import TopProducts from "../../TopProducts/TopProducts"

const ImageList = [
  {
    id: 1,
    img: Image4,
    title: "Capital Computers",
    description: "We Sell Quality Yet Affordable Devices.",
  },
  {
    id: 2,
    img: Image3,
    title: "Discount On All Devices",
    description: "We don't only think about quality devices, we also think about your pockets too.",
  },
  {
    id: 3,
    img: Image2,
    title: "Computer Lab For Schools.",
    description: "We Setup Computer Lab For Schools, Pay only 50% on all computers for the setup, spread the rest",
  },
  {
    id: 4,
    img: Image1,
    title: "Latest Devices.",
    description: "Count On Us For All Modern Tech Devices.",
  },
];

const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] flex justify-center items-center light:bg-gray-950 dark:text-black duration-200">
        <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-10"></div>
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {ImageList.map((data) => (
              <div key={data.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
    data-aos="fade-up"
    data-aos-duration="500"
    data-aos-once="true"
    className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-700 to-black text-transparent bg-clip-text">
                      {data.title}
                    </h1>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="100"
                      className="text-sm"
                    >
                      {data.description}
                    </p>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="300"
                    >
                      <Link to="/products" className="inline-block">
                        <div className="bg-black hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary ">
                          <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Shop Now
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 sm:order-2">
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <img
                        src={data.img}
                        alt={data.title}
                        className="w-[350px] h-[300px] max-w-[500px] max-h-[500px] sm:max-w-[450px] sm:max-h-[450px] object-contain mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider><br/><br/><TopProducts/><br/>
          <div className="flex mt-10 justify-center">
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/3 max-w-[300px] border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4 drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/3 max-w-[300px] border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4 drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]"
            >
              <source src={video2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
