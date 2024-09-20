import Slider from "react-slick";


const TestimonialData = [
  {
    id: 1,
    name: "Victor Afriyie",
    text: "What Amazes Me Is How Peter(The Boss) Have Time To Guide You During Your Purchase",
    img: "https://media.licdn.com/dms/image/C4E03AQFclH8SiauYRg/profile-displayphoto-shrink_800_800/0/1619999086581?e=2147483647&v=beta&t=ssKjJymSBcvvnvHeYDSRq0o0ExHLxACEU5WY0ePc_2k",
  },
  {
    id: 2,
    name: "Ama Sika",
    text: "I Love Their Discounts. Very Affordable Products",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfj9UC59mlz_OPvCMHmjqfDlx31TykMON3A&s",
  },
  {
    id: 3,
    name: "Daniel Adjei",
    text: "Capital Computers Helped Me Setup My Schools Computer Lab With Ease.",
    img: "https://media.licdn.com/dms/image/D4D03AQEMQx3EJmw4Kg/profile-displayphoto-shrink_800_800/0/1692581215570?e=2147483647&v=beta&t=hcqc2Wvtn9A5sqYkFxU-MxzXRXVgyDs1vQljJ4ma3XE",
  },
  {
    id: 5,
    name: "Samuel Appiah",
    text: "This Is Where I Repair All My Machines. They Provide Quality Repairs.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKn2fdUiJY8OnQozZbvrihrmBCK8N5O8-8Q&s",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10 ">
      <div className="container ">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-black">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Testimonials
          </h1>
          <p data-aos="fade-up" className="text-xs text-black-400">
            We Do Our Best To Make You Smile Always
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">  {/* Moved the key prop here */}
                <div className="drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl light:bg-gray-800 bg-primary/10 relative ">
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-black-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-dark">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0 drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
