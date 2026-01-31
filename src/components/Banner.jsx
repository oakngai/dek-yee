import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { banners } from "../constants/banner";

const Banner = () => {
  return (
    <div className="relative mt-3">
      <div className="relative overflow-hidden">
        <Swiper
          className="overflow-visible"
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: "auto",
              centeredSlides: true,
            },
          }}
          updateOnWindowResize
        >
          {banners.map((banner) => (
            <SwiperSlide
              key={banner.id}
              className="w-full md:w-[40%]! md:mx-1.5"
            >
              <div className="relative overflow-hidden ">
                <img
                  src={banner.imageUrl}
                  alt={banner.tag}
                  className="object-cover w-full h-full"
                />
                <div
                  className={`absolute top-4 left-4 ${banner.tags.bgColor} text-white text-xs md:text-sm px-3 py-1 rounded-full`}
                >
                  {banner.tags.text}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
