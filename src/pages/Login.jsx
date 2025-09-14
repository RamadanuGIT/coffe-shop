export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eacdbd] px-4">
      <div className="flex flex-col bg-[#ded5c3] rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-center pb-8">Sign In</h2>

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
          Sign In
        </button>
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
