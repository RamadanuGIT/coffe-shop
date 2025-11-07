import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Categories = () => {
  const images = [
    "https://image.cermati.com/q_70/s8tg62yd8vzk7jpokxmo.webp",
    "https://image.cermati.com/q_70/mpzhsg2rkglullzetayi.webp",
    "https://image.cermati.com/q_70/rdhu7vncmu2ip8qdmlqj.webp",
    "https://images.unsplash.com/photo-1523942839745-7848d4fa2b00?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <section
      id="categories"
      className="relative min-h-[60vh] flex flex-col justify-center bg-[#f5e8df]"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold font-serif mb-4 text-[#3a2a1a]">
          Top Sales This Week
        </h2>
        <p className="text-lg opacity-70">
          Kopi paling banyak dibeli minggu ini
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`Category ${i}`}
                className="w-full h-[220px] rounded-3xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
