import React from "react";

const Profil = () => {
  return (
    <main className="bg-[#eacdbd] min-h-screen flex flex-col items-center justify-center pt-10">
      <h1 className="text-4xl font-bold py-5">Perbarui profil kamu</h1>
      <div className="bg-[#ded5c3] rounded-2xl w-fit">
        <div className="flex flex-col p-10 gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="p-2 bg-white rounded-2xl w-fit"
          />
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            placeholder="@mail.com"
            className="p-2 bg-white rounded-2xl w-fit"
          />
          <label htmlFor="handphone">No.hp</label>
          <input
            type="text"
            placeholder="+62"
            className="p-2 bg-white rounded-2xl w-fit"
          />
          <label htmlFor="Alamat">Alamat</label>
          <textarea
            type="text"
            cols={23}
            placeholder="Alamat"
            className="p-2 bg-white rounded-2xl w-fit"
          />
          <button className="bg-[#ceb5a7] p-3 rounded-2xl mt-3 cursor-pointer hover:text-white font-bold">
            Simpan perubahan
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profil;
