import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/authContext";

const EditMarks = () => {
  const { token } = useAuth();

  useEffect(() => {
    document.title =
      "Update Marks | SMMS | Anantadarsha Sanskrit Ved Vidyalaya ";
  }, []);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { details } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const examYear = document.getElementById("examYear").value;
    const examTerm = document.getElementById("examTerm").value;
    const marksId = details._id;

    const npth = document.getElementById("nep_th").value;
    const nppr = document.getElementById("nep_pr").value;
    const enth = document.getElementById("eng_th").value;
    const enpr = document.getElementById("eng_pr").value;
    const mtth = document.getElementById("mt_th").value;
    const mtpr = document.getElementById("mt_pr").value;
    const snth = document.getElementById("sn_th").value;
    const snpr = document.getElementById("sn_pr").value;
    const vdth = document.getElementById("vd_th").value;
    const vdpr = document.getElementById("vd_pr").value;
    const vyth = document.getElementById("vy_th").value;
    const vypr = document.getElementById("vy_pr").value;
    var kkth = document.getElementById("kk_th").value;
    var kkpr = document.getElementById("kk_pr").value;
    var soth = document.getElementById("so_th").value;
    var sopr = document.getElementById("so_pr").value;

    // if optional subject does not have marks then put them as 0

    if (!kkth || !kkth.trim()) {
      kkth = 0;
    }

    if (!kkpr || !kkpr.trim()) {
      kkpr = 0;
    }

    if (!soth || !soth.trim()) {
      soth = 0;
    }

    if (!sopr || !sopr.trim()) {
      sopr = 0;
    }

    const host = import.meta.env.VITE_HOST_URL;

    const reqOptions = {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stuId: `${details.student._id}`,
        marksId: `${marksId}`,
        examYear: `${examYear}`,
        examTerm: `${examTerm}`,
        npth: `${npth}`,
        nppr: `${nppr}`,
        enth: `${enth}`,
        enpr: `${enpr}`,
        mtth: `${mtth}`,
        mtpr: `${mtpr}`,
        snth: `${snth}`,
        snpr: `${snpr}`,
        vdth: `${vdth}`,
        vdpr: `${vdpr}`,
        vyth: `${vyth}`,
        vypr: `${vypr}`,
        kkth: `${kkth}`,
        kkpr: `${kkpr}`,
        soth: `${soth}`,
        sopr: `${sopr}`,
      }),
    };

    const response = await fetch(`${host}/api/v1/marks/`, reqOptions);
    const data = await response.json();
    const message = data.message[0];
    if (response.ok) {
      navigate("/ledger", { state: message });
    }
    setLoading(false);
    toast(m);
  };

  return (
    <div className="py-2 w-full flex flex-col justify-center items-center">
      {loading && (
        <p className="w-fit p-3 absolute top-15 right-10 bg-green-200 border-2 border-green-500 text-black rounded-2xl text-xm mt-5 flex items-center">
          <span className="loader"></span> &nbsp; Loading, please wait...
        </p>
      )}
      <ToastContainer />
      <form
        className="w-fit bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 mt-5 rounded-xl"
        onSubmit={handleSubmit}
        id="marksForm"
      >
        <div className="flex flex-row justify-between">
          <div className="px-3 py-3">
            <header className="text-3xl font-bold mb-2">
              Update Student Marks
            </header>
            <p className="border-2 border-blue-500 w-20"></p>
          </div>

          {/* for load data  */}
          <div className="flex flex-row gap-5">
            <div>
              <label htmlFor="year" className="text-lg text-gray-900 mt-3">
                Year&nbsp;
              </label>
              <select
                id="year"
                defaultValue={details.examYear}
                className="w-20 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 mt-3"
                disabled={true}
              >
                <option value={2082} defaultValue>
                  2082
                </option>
                <option value={2083}>2083</option>
              </select>
            </div>
            <div>
              <label htmlFor="clss" className="text-lg text-gray-900 mt-3">
                Class &nbsp;
              </label>
              <select
                id="clss"
                defaultValue={details.clss}
                className="w-20 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 mt-3"
                disabled={true}
              >
                <option value={5} defaultValue>
                  5
                </option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </div>
            <div>
              <button
                className="p-2 rounded-lg mt-1 ml-5 text-white bg-blue-600 cursor-pointer hover:bg-blue-500 transition-colors disabled:bg-gray-400"
                disabled={true}
              >
                Load Data
              </button>
            </div>
          </div>
        </div>

        <div className="pl-5 mt-2 mb-2">
          <label htmlFor="name" className="text-lg text-gray-900">
            Student Name &nbsp;
          </label>
          <input
            type="text"
            defaultValue={details.student.name}
            id="name"
            className="w-80 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2"
            disabled
          />
        </div>

        <div className="w-200 h-fit  flex flex-row justify-evenly gap-12 p-5 border-2 border-dashed border-gray-400 rounded-2xl mt-6 mb-6">
          {/* first */}
          <div className="w-1/2  grid grid-cols-3 gap-5">
            <label htmlFor="examYear" className="text-lg text-gray-900">
              Exam Year
            </label>
            <select
              id="examYear"
              className="w-35 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3"
            >
              <option value={2082} defaultValue>
                2082
              </option>
              <option value={2083}>2083</option>
            </select>
            <div></div>
            <label htmlFor="nep_th">
              Nepali <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              id="nep_th"
              defaultValue={details.npth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="nep_pr"
              defaultValue={details.npth}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />

            <label htmlFor="eng_th">
              English <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              id="eng_th"
              defaultValue={details.enth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="eng_pr"
              defaultValue={details.enpr}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />

            <label htmlFor="mt_th">
              Maths <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              id="mt_th"
              defaultValue={details.mtth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="mt_pr"
              defaultValue={details.mtpr}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />

            <label htmlFor="sn_th">
              Sanskrit Lang<sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              id="sn_th"
              defaultValue={details.snth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="sn_pr"
              defaultValue={details.snpr}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
          </div>

          {/* second */}
          <div className="w-1/2 grid grid-cols-3 gap-5">
            <label htmlFor="examTerm" className="text-lg text-gray-90">
              Exam Term
            </label>
            <select
              id="examTerm"
              className="w-35 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3"
            >
              <option value={"FIRST"} defaultValue>
                First
              </option>
              <option value={"SECOND"}>Second</option>
              <option value={"FINAL"}>Final</option>
            </select>
            <div></div>
            <label htmlFor="vd_th">
              Vedas <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              id="vd_th"
              defaultValue={details.vdth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="vd_pr"
              defaultValue={details.vdpr}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />

            <label htmlFor="vy_th">
              Vyakarana <sup className="text-red-500">*</sup>
            </label>
            <input
              type="number"
              id="vy_th"
              defaultValue={details.vyth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="vy_pr"
              defaultValue={details.vypr}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />

            <label htmlFor="kk_th">Karmakanda </label>
            <input
              type="number"
              id="kk_th"
              defaultValue={details.kkth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="kk_pr"
              defaultValue={details.kkpr}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />

            <label htmlFor="so_th">Social</label>
            <input
              type="number"
              id="so_th"
              defaultValue={details.soth}
              placeholder="TH"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
            <input
              type="number"
              id="so_pr"
              defaultValue={details.sopr}
              placeholder="PR"
              className="bg-gray-300 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3"
            />
          </div>
        </div>
        <button className="w-60 h-10 float-end rounded-lg ml-5 text-white bg-blue-600 cursor-pointer hover:bg-blue-500 transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMarks;
