import React from "react";

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
];

const Hero = () => {
  return (
    <main className="bg-[#eacdbd] min-h-screen" id="home">
      <section className="bg-[#eacdbd] pt-10">
        <div className="h-[90vh] max-sm:h-fit drop-shadow-2xl bg-[url('./assets/biji.jpg')] bg-cover max-sm:pb-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
            <path
              fill="#EACDBD"
              fillOpacity="1"
              d="M0,160L80,149.3C160,139,320,117,480,133.3C640,149,800,203,960,218.7C1120,235,1280,213,1360,202.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
          <div className="max-sm:pl-5 lg:pl-20">
            <h1 className="text-8xl font-bold text-white max-sm:text-4xl pb-2">
              Coffee
            </h1>
            <button className="btn font-bold bg-white rounded-2xl px-5 py-2 w-fit">
              Shop Now
            </button>
          </div>
        </div>

        <div className="flex flex-col text-center items-center justify-center mt-20">
          <div>
            <div>
              <h2 className="text-4xl font-bold py-6 max-sm:text-2xl">
                Top Category On This Week
              </h2>
              <p className="text-2xl max-sm:text-[14px]">
                Jelajahi Kopi Yang Paling Banyak dibeli Minggu Ini
              </p>
            </div>
            <div className="flex gap-5 p-10">
              <div>
                <img
                  className="w-[300px] h-[200px] rounded-4xl max-sm:h-[100px]"
                  src="https://image.cermati.com/q_70/s8tg62yd8vzk7jpokxmo.webp"
                  alt="cappuchino"
                />
              </div>
              <div>
                <img
                  className="w-[300px] h-[200px] rounded-4xl max-sm:h-[100px]"
                  src="https://image.cermati.com/q_70/mpzhsg2rkglullzetayi.webp"
                  alt="Cold Brew"
                />
              </div>
              <div>
                <img
                  className="w-[300px] h-[200px] rounded-4xl max-sm:h-[100px]"
                  src="https://image.cermati.com/q_70/rdhu7vncmu2ip8qdmlqj.webp"
                  alt="Mocha Coffe"
                />
              </div>
            </div>
          </div>

          {/* Pilihan kopi */}
          <div>
            <div>
              <h2 className="text-4xl font-bold py-6 max-sm:text-2xl">
                Pilihan Kopi Terbaik
              </h2>
              <p className="text-2xl max-sm:text-[14px]">
                Jelajahi Kopi Terbaru yang Paling Banyak Dibeli Minggu Ini
              </p>
            </div>
            {/* image */}
            <div className="flex gap-5 p-10">
              <div>
                <img
                  className="w-[300px] h-[200px] rounded-4xl max-sm:h-[100px]"
                  src="https://image.cermati.com/q_70/yrehzzpiwkjrfqdgspsp.webp"
                  alt="cappuchino"
                />
              </div>
              <div>
                <img
                  className="w-[300px] h-[200px] rounded-4xl max-sm:h-[100px]"
                  src="https://image.cermati.com/q_70/uxktrs0bcntq7xizqzon.webp"
                  alt="ice coffee"
                />
              </div>
              <div>
                <img
                  className="w-[300px] h-[200px] rounded-4xl max-sm:h-[100px]"
                  src="https://static.republika.co.id/uploads/images/inpicture_slide/seni-di-atas-kopi-alias-latte-art-_160914181605-378.jpg"
                  alt="Coffe Afogato"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about */}
      <section
        className="bg-[#eacdbd] pt-10 min-h-screen lg:flex lg:items-center"
        id="about"
      >
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap">
            <div className="lw-full self-center lg:w-1/2 lg:px-20">
              <h2 className="text-4xl font-bold py-6 max-sm:text-2xl">
                About Us
              </h2>
              <p className="text-2xl max-sm:text-[14px] font-medium">
                Kami adalah <strong>Coffee Shop</strong> yang menyajikan
                berbagai jenis kopi <b>terbaik</b> dari seluruh dunia.
                Bergabunglah dengan kami untuk menikmati{" "}
                <i>pengalaman kopi yang</i> tak terlupakan.
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-3 pl-20 lg:pl-30 gap-2 mt-5 self-end">
              <div className="col-span-1/2 relative group">
                {/* Gambar */}
                <img
                  className="w-full h-[200px] max-sm:h-[100px] max-sm:w-[250px] group-hover:scale-105 transition-all duration-300"
                  src="https://kemenparekraf.go.id/_next/image?url=https%3A%2F%2Fapi2.kemenparekraf.go.id%2Fstorage%2Fapp%2Fuploads%2Fpublic%2F622%2Feb0%2F4d4%2F622eb04d428ea608266371.jpg&w=3840&q=75"
                  alt="about us"
                />

                {/* Overlay hitam transparan */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 scale-105 transition-all duration-300 ease-in-out"></div>

                {/* Teks */}
                <span className="absolute inset-0 flex pl-5 items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Barista berpengalaman
                </span>
              </div>
              <div className="col-span-1/2 relative group">
                <img
                  className="w-full h-[200px] max-sm:h-[100px] max-sm:w-[250px] shadow-2xl group-hover:scale-105 transition-all duration-300"
                  src="https://d1r9hss9q19p18.cloudfront.net/uploads/2017/10/coffeemaker.jpg"
                  alt="about us"
                />
                {/* Overlay hitam transparan */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 scale-105 transition-all duration-300 ease-in-out"></div>

                {/* Teks */}
                <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Alat kopi modern
                </span>
              </div>
              <div className="col-span-2 relative group">
                <img
                  className="w-full h-[250px] max-sm:h-[120px] max-sm:w-full shadow-2xl group-hover:scale-105 transition-all duration-300"
                  src="https://cdn1-production-images-kly.akamaized.net/IihF7w186XpTyXF1CZwCL05m_z8=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3361932/original/090925100_1611818104-pexels-negative-space-134577.jpg"
                  alt="about us"
                />
                {/* Overlay hitam transparan */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 scale-105 transition-all duration-300 ease-in-out"></div>

                {/* Teks */}
                <span className="absolute inset-0 flex pl-5 items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Biji kopi pilihan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* blog */}
      <section id="blog" className="py-10 bg-[#eacdbd]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold py-6 text-center max-sm:text-2xl">
            Our Blog
          </h2>
          <p className="text-2xl text-center max-sm:text-[14px] mb-10">
            Artikel Terbaru Dari Kami
          </p>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={post.image}
                  alt={post.title}
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-[#c8afa2] py-10">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Coffee Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Hero;
