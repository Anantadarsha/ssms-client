import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/authContext";

const Ledger = () => {
  const { token } = useAuth();

  useEffect(() => {
    document.title =
      "Marks Ledger | SMMS | Anantadarsha Sanskrit Ved Vidyalaya";
  }, []);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadData = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const year = document.getElementById("year").value;
    const clss = document.getElementById("clss").value;
    const term = document.getElementById("term").value;
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
        `${host}/api/v1/marks/${year}/${clss}/${term}`,
        reqOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message[0]);
      }

      const resdata = await response.json();
      setData(resdata.ledger);
      setShowTable(true);
    } catch (err) {
      console.log(err);
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
        const response = await fetch(`${host}/api/v1/marks/${id}`, reqOptions);
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
      {isLoading && (
        <p className="w-fit p-3 absolute top-15 right-10 bg-green-200 border-2 border-green-500 text-black rounded-2xl text-xm mt-5 flex items-center">
          <span class="loader"></span> &nbsp; Loading, please wait...
        </p>
      )}
      <ToastContainer />
      <div className="w-full mx-20 h-fit bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 mt-5 rounded-xl flex flex-row justify-between">
        <p className="text-2xl pt-1">Select Ledger</p>
        <div>
          <form className="flex gap-10">
            <div>
              <label htmlFor="year" className="text-lg text-gray-900">
                Exam Year &nbsp;
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
              <label htmlFor="term" className="text-lg text-gray-900">
                Exam Term &nbsp;
              </label>
              <select
                id="term"
                className="w-40 bg-gray-50 border-2 border-gray-300 outline-none text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 pl-3"
              >
                <option value={"FIRST"}>First</option>
                <option value={"SECOND"}>Second</option>
                <option value={"FINAL"}>Final</option>
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

      {error && <p>Error: {error}</p>}

      {!error && showTable && data && (
        <table
          className="w-full mx-20 h-fit bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 mt-5 rounded-xl text-center"
          border={10}
        >
          <thead>
            <tr>
              <th rowSpan="2">S.N</th>
              <th rowSpan="2">Name</th>
              <th rowSpan="2">Roll No.</th>
              <th colSpan="2">Nepali</th>
              <th colSpan="2">English</th>
              <th colSpan="2">Maths</th>
              <th colSpan="2">Social</th>
              <th colSpan="2">Veda</th>
              <th colSpan="2">Vyakaran</th>
              <th colSpan="2">Karmakanda</th>
              <th colSpan="2">Sanskrit</th>
              <th rowSpan="2">GPA</th>
              <th rowSpan="2" colSpan="3" className="last">
                Action
              </th>
            </tr>
            <tr className="second-row">
              <th>TH</th>
              <th>PR</th>
              <th>TH</th>
              <th>PR</th>
              <th>TH</th>
              <th>PR</th>
              <th>TH</th>
              <th>PR</th>
              <th>TH</th>
              <th>PR</th>
              <th>TH</th>
              <th>PR</th>
              <th>TH</th>
              <th>PR</th>
              <th>TH</th>
              <th>PR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => {
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td>{index + 1}</td>
                  <td>{d.student?.name}</td>
                  <td>{d.student?.roll}</td>
                  <td>{d.npth}</td>
                  <td>{d.nppr}</td>
                  <td>{d.enth}</td>
                  <td>{d.enpr}</td>
                  <td>{d.mtth}</td>
                  <td>{d.mtpr}</td>
                  <td>{d.soth}</td>
                  <td>{d.sopr}</td>
                  <td>{d.vdth}</td>
                  <td>{d.vdpr}</td>
                  <td>{d.vypr}</td>
                  <td>{d.vyth}</td>
                  <td>{d.kkth}</td>
                  <td>{d.kkpr}</td>
                  <td>{d.snth}</td>
                  <td>{d.snpr}</td>
                  <td>{d.gpa.toFixed(2)}</td>
                  <td>
                    <Link
                      className="bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-600 transition-colors"
                      to={`/marksheet/${d.examYear}/${d.examTerm}/${d.clss}/${d.student?._id}`}
                    >
                      {" "}
                      Print{" "}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="text-blue-600 border-2 p-1 rounded-xl hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                      to={`/marks/${d._id}`}
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

export default Ledger;
