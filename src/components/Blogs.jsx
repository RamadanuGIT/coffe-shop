import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Cara Membuat Kopi yang Sempurna di Rumah",
      image:
        "https://cdn0-production-images-kly.akamaized.net/3nYHjv1yX1eXo9e6fXW7mX1l0mE=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3361934/original/090925100_1611818113-pexels-negative-space-134579.jpg",
      excerpt:
        "Pelajari tips dan trik membuat kopi nikmat ala barista profesional dari kenyamanan rumahmu.",
    },
    {
      id: 2,
      title: "Manfaat Kopi untuk Kesehatan",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
      excerpt:
        "Kopi tidak hanya nikmat tapi juga punya banyak manfaat kesehatan jika dikonsumsi dengan benar.",
    },
    {
      id: 3,
      title: "Jenis-jenis Kopi yang Harus Kamu Coba",
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=80",
      excerpt:
        "Temukan berbagai jenis kopi dari seluruh dunia yang wajib kamu coba untuk pengalaman rasa berbeda.",
    },
    {
      id: 4,
      title: "Nikmati kopi dimana saja kapan saja",
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=80",
      excerpt:
        "Temukan berbagai jenis kopi dari seluruh dunia yang wajib kamu coba untuk pengalaman rasa berbeda.",
    },
    {
      id: 5,
      title: "Jenis-jenis Alat kopi yang ramah untuk pemula",
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=80",
      excerpt:
        "Temukan berbagai jenis kopi dari seluruh dunia yang wajib kamu coba untuk pengalaman rasa berbeda.",
    },
  ];
  return (
    <>
      <div className="min-h-screen flex justify-center items-center" id="blog">
        <div className="px-8 max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-all">
                  <img
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    src={post.image}
                    alt={post.title}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-700 text-sm">{post.excerpt}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Blogs;
