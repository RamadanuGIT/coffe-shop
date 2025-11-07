import React from "react";
import Categories from "../components/Categories";
import Blogs from "../components/Blogs";
import { FaChevronDown } from "react-icons/fa6";

const Hero = () => {
  return (
    <main
      className="bg-[#f5e8df] text-[#3a2a1a] min-h-screen font-sans"
      id="home"
    >
      {/* HERO SECTION */}

      <section className="relative">
        <div
          className="min-h-[90vh]
           max-sm:h-fit flex items-center bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center text-white"
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-2xl px-10">
            <h1 className="text-7xl font-bold mb-4 max-sm:text-4xl font-serif drop-shadow-lg">
              Coffee That Inspires
            </h1>
            <p className="text-lg mb-6 max-sm:text-sm opacity-90">
              Nikmati secangkir kebahagiaan di setiap tegukan.
            </p>
            <button className="bg-white text-[#3a2a1a] px-6 py-3 font-semibold rounded-2xl shadow hover:scale-105 hover:shadow-lg transition">
              Shop Now
            </button>
            <div className="flex justify-center mt-10 animate-bounce">
              <FaChevronDown className="text-white text-2xl opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <div>
        <Categories />
      </div>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="bg-[#ead3c4] py-20 min-h-screen flex justify-center items-center"
      >
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-8 gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold font-serif">About Us</h2>
            <p className="text-lg leading-relaxed">
              Kami adalah <b>Coffee Shop</b> yang menyajikan berbagai jenis kopi{" "}
              <b>terbaik</b> dari seluruh dunia. Bergabunglah dengan kami dan
              rasakan <i>pengalaman kopi</i> yang tak terlupakan.
            </p>
            <button className="bg-[#3a2a1a] text-white px-5 py-3 rounded-xl hover:bg-[#5a3b22] transition">
              Learn More
            </button>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {[
              {
                src: "https://kemenparekraf.go.id/_next/image?url=https%3A%2F%2Fapi2.kemenparekraf.go.id%2Fstorage%2Fapp%2Fuploads%2Fpublic%2F622%2Feb0%2F4d4%2F622eb04d428ea608266371.jpg&w=3840&q=75",
                text: "Barista berpengalaman",
              },
              {
                src: "https://d1r9hss9q19p18.cloudfront.net/uploads/2017/10/coffeemaker.jpg",
                text: "Alat kopi modern",
              },
              {
                src: "https://cdn1-production-images-kly.akamaized.net/IihF7w186XpTyXF1CZwCL05m_z8=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3361932/original/090925100_1611818104-pexels-negative-space-134577.jpg",
                text: "Biji kopi pilihan",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative group col-span-1 overflow-hidden rounded-2xl"
              >
                <img
                  src={item.src}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <p className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <Blogs />
    </main>
  );
};

export default Hero;
