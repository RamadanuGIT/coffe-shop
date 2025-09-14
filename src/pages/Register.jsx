export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eacdbd] px-4">
      <div className="flex flex-col bg-[#ded5c3] rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-center pb-8">Sign Up</h2>

        {/* Username Field */}
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-1 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="border-2 rounded-2xl p-2 focus:outline-none"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="username"
            placeholder="Email"
            className="border-2 rounded-2xl p-2 focus:outline-none"
          />
        </div>

        {/* Number field */}
        <div className="flex flex-col mb-6">
          <label htmlFor="number" className="mb-1 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="number"
            placeholder="Phone Number"
            className="border-2 rounded-2xl p-2 focus:outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col mb-6">
          <label htmlFor="password" className="mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border-2 rounded-2xl p-2 focus:outline-none"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-[#eacdbd] border text-black rounded-2xl py-2 font-semibold hover:bg-[#c8b0a3] transition duration-200">
          Sign Up
        </button>
        <p>
          Do you have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
