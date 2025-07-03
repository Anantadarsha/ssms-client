import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/authContext";

const EditStudent = () => {
    const { token } = useAuth();

  useEffect(()=>{
    document.title = "Update Student Details | SMMS | Anantadarsha Sanskrit Ved Vidyalaya";
  },[])
  const navigate = useNavigate();
  const location = useLocation();
  const { details } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const emis = document.getElementById("emis").value;
    const clss = document.getElementById("clss").value;
    const roll = document.getElementById("roll").value;
    const year = document.getElementById("year").value;

    if (!name.trim() || !emis.trim() || !roll.trim()) {
      toast("All fields are required!");
      return false;
    }

    const host = import.meta.env.VITE_HOST_URL;
    const reqOptions = {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
                Authorization: `Bearer ${token}`

      },
      body: JSON.stringify({
        stuId: `${details._id}`,
        name: `${name}`,
        emis: `${emis}`,
        clss: `${clss}`,
        roll: `${roll}`,
        year: `${year}`,
      }),
    };

    try {
      const response = await fetch(`${host}/api/v1/students/`, reqOptions);
      const data = await response.json();
      const message = data.message[0];
      if (response.ok) {
        navigate("/students/viewAll", { state: message });
      }
      message.forEach((m) => toast(m));
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className="py-2 w-full flex justify-center">
      <ToastContainer />

      <form
        className="w-180 h-fit bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 mt-5 rounded-xl"
        id="stuForm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <div className="px-3 py-3">
            <header className="text-3xl font-bold mb-2">Edit Student</header>
            <p className="border-2 border-blue-500 w-20"></p>
          </div>
        </div>
        <div className="px-3 py-3">
          <label htmlFor="name" className="text-lg text-gray-900">
            Student Name <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            id="name"
            defaultValue={details.name}
            className="w-full bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 pl-3"
          />
        </div>

        <div className="px-3 py-3">
          <label htmlFor="emis" className="text-lg text-gray-900">
            EMIS Number <sup className="text-red-500">*</sup>
          </label>
          <input
            type="number"
            id="emis"
            defaultValue={details.emis}
            className="w-full bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 pl-3"
          />
        </div>

        <div className="px-3 py-3">
          <label htmlFor="clss" className="text-lg text-gray-900">
            Class <sup className="text-red-500">*</sup>
          </label>
          <select
            id="clss"
            defaultValue={details.clss}
            className="w-full bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 mt-3 p-1"
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="px-3 py-3">
          <label htmlFor="roll" className="text-lg text-gray-900">
            Roll Number <sup className="text-red-500">*</sup>
          </label>
          <input
            type="number"
            id="roll"
            defaultValue={details.roll}
            className="w-full bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 pl-3"
          />
        </div>

        <div className="px-3 py-3">
          <label htmlFor="year" className="text-lg text-gray-900">
            Year <sup className="text-red-500">*</sup>
          </label>{" "}
          &nbsp;
          <select
            id="year"
            defaultValue={details.year}
            className="w-50 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 mt-3"
          >
            <option value={2082}>2082</option>
            <option value={2083}>2083</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-60 h-10 float-end rounded-lg ml-5 text-white bg-blue-600 cursor-pointer hover:bg-blue-500 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
