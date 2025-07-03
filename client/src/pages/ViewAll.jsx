import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/authContext";

const ViewAll = () => {
  const { token } = useAuth();

  useEffect(() => {
    document.title =
      "View All Students | SMMS | Anantadarsha Sanskrit Ved Vidyalaya";
  }, []);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  useEffect(() => {
    var message = location.state || null;
    if (message) {
      toast(message);
    }
    message = null;
  }, [location.state]);

  const handleLoadData = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setShowTable(false);

    const year = document.getElementById("year").value;
    const clss = document.getElementById("clss").value;
    const host = import.meta.env.VITE_HOST_URL;

    const reqOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${host}/api/v1/students/${year}/${clss}`,
        reqOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message[0]);
      }

      const resdata = await response.json();
      setData(resdata.data);
      setShowTable(true);
    } catch (err) {
      setError(err.message);
      toast(err.message);
      setData(null);
      setShowTable(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    var a = confirm("Are you sure you want to delete?");
    if (a) {
      const host = import.meta.env.VITE_HOST_URL;
      const reqOptions = {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          `${host}/api/v1/students/${id}`,
          reqOptions
        );
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        toast("Failed to delete");
      }
    }
  };

  return (
    <div className="px-10 py-2 w-full flex flex-col items-center">
      <ToastContainer />
      <div className="w-full mx-20 h-fit bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 mt-5 rounded-xl flex flex-row justify-between">
        <p className="text-2xl pt-1">View All Students</p>
        <div>
          <form className="flex gap-10">
            <div>
              <label htmlFor="year" className="text-lg text-gray-900">
                Year &nbsp;
              </label>
              <select
                id="year"
                className="w-40 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 pl-3"
              >
                <option value={2082}>2082</option>
                <option value={2083}>2083</option>
                <option value={2084}>2084</option>
                <option value={2085}>2085</option>
                <option value={2086}>2086</option>
                <option value={2087}>2087</option>
                <option value={2088}>2088</option>
                <option value={2089}>2089</option>
                <option value={2090}>2090</option>
              </select>
            </div>

            <div>
              <label htmlFor="clss" className="text-lg text-gray-900">
                Class &nbsp;
              </label>
              <select
                id="clss"
                className="w-40 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 pl-3"
              >
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </div>

            <div>
              <button
                onClick={handleLoadData}
                className="w-40 h-10 rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-500 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Loading.." : "Load Data"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <p className="w-fit p-3 bg-red-400 border-2 border-red-500 text-white rounded-2xl text-xm mt-5">
          Error: {error}
        </p>
      )}

      {!error && showTable && data && (
        <table
          className="w-7/8 mx-20 h-fit bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 mt-5 rounded-xl text-center"
          border={10}
        >
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>EMIS</th>
              <th>Class</th>
              <th>Roll Number</th>
              <th>Year</th>
              <th colSpan={2} className="last">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => {
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td>{++index}</td>
                  <td className="capitalize">{d.name}</td>
                  <td>{d.emis}</td>
                  <td>{d.clss}</td>
                  <td>{d.roll}</td>
                  <td>{d.year}</td>
                  <td>
                    <Link
                      className="text-blue-600 border-2 p-1 rounded-xl hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                      to={`/students/edit/${d._id}`}
                      state={{ details: d }}
                    >
                      Update
                    </Link>
                  </td>
                  <td className="last">
                    <button
                      className="text-red-600 border-2 p-1 rounded-xl hover:border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      onClick={() => handleDelete(d._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAll;
