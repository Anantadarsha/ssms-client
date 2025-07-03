import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [remember, setRemember] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const host = import.meta.env.VITE_HOST_URL;

    if (!username.trim() || !password.trim()) {
      toast("All Fileds are required");
      return false;
    }

    const reqOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    };

    const response = await fetch(`${host}/api/v1/users/login`, reqOptions);

    const r = await response.json();

    if (response.ok) {
      console.log(remember);
      login(r.token, remember);
      //user can't come back to login page onced login with replace: true
      navigate("/", { replace: true });
    } else {
      r.message.forEach((m) => toast(m));
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-100 h-fit bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5">
        <div className="py-3 px-3">
          <p className="text-3xl font-bold">Login</p>
          <p className="border-2 border-blue-500 my-2 w-20"></p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2 p-2.5">
            <label
              htmlFor="username"
              className="block mb-1 text-lg text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pt-1 px-1"
            />
          </div>

          <div className="p-2.5">
            <label
              htmlFor="password"
              className="block mb-1 text-lg text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pt-1 px-1"
            />
          </div>

          <div className="p-2.5 flex flex-row">
            <input
              type="checkbox"
              id="remember"
              className="w-3 h-3 mt-1"
              aria-checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember" className="ml-2">
              Remember me
            </label>
          </div>

          <div className="p-2.5">
            <button className="w-full bg-blue-600 outline-none text-white text-lg rounded-lg p-1 cursor-pointer hover:transition-colors hover:bg-blue-500">
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
