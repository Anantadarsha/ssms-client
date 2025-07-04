import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useAuth } from "../contexts/authContext";

const Marksheet = () => {
  const { token } = useAuth();

  useEffect(() => {
    document.title =
      "Print Marksheet | SMMS | Anantadarsha Sanskrit Ved Vidyalaya";
  }, []);
  const { examYear, examTerm, clss, stuId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showMarksheet, setShowMarksheet] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);
  const host = import.meta.env.VITE_HOST_URL;
  const subject = [
    "Nepali",
    "English",
    "Maths",
    "Sanskrit Language",
    "Ved",
    "Vyakarana",
    "Karmakanda",
    "Social",
  ];
  const creditHours = [5, 5, 5, 3, 4, 5, 5, 5];
  var count = 1;

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    setLoading(true);
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
        `${host}/api/v1/marks/${examYear}/${clss}/${examTerm}/${stuId}`,
        reqOptions
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message[0]);
      }

      const data = await response.json();
      const marksheet = data.marksheet[0];

      var newSubject = [];
      var position = 0;
      var ThGL = marksheet.thGL;
      var PrGL = marksheet.prGL;
      var Grade = marksheet.grade;
      var FGL = marksheet.fGL;

      if (parseInt(clss) <= 7) {
        position = subject.indexOf("Karmakanda"); //sub to remove
        newSubject = subject.filter((s) => s !== "Karmakanda");
        ThGL.splice(position, 1);
        PrGL.splice(position, 1);
        Grade.splice(position, 1);
        FGL.splice(position, 1);
      } else if (parseInt(clss) >= 8) {
        position = subject.indexOf("Social");
        newSubject = subject.filter((s) => s !== "Social");
        ThGL.splice(position, 1);
        PrGL.splice(position, 1);
        Grade.splice(position, 1);
        FGL.splice(position, 1);
      }

      const tabledata = newSubject.map((s, index) => ({
        id: index,
        student: marksheet.student,
        subject: s,
        creditHour: creditHours[index],
        thGps: ThGL[index],
        prGps: PrGL[index],
        finalGL: FGL[index],
        grade: Grade[index],
      }));

      const student = marksheet.student;
      student.gpa = marksheet.gpa;
      setData(tabledata);
      setStudent(student);
      setShowMarksheet(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setData(null);
      setShowMarksheet(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    print();
  };

  return (
    <div className="py-2 w-full flex justify-center">
      {loading && <p className="w-fit p-3 absolute top-15 right-10 bg-green-200 border-2 border-green-500 text-black rounded-2xl text-xm mt-5 flex items-center"> <span class="loader"></span> &nbsp; Loading Marksheet...</p>}
      {error && (
        <p className="w-fit p-3 bg-red-400 border-2 border-red-500 text-white rounded-2xl text-xm mt-5">
          Error: {error}
        </p>
      )}

      {showMarksheet && data && (
        <div>
          <div id="printableArea" className="flex justify-center items-center">
            <div className=" w-15/16 h-11/12 flex justify-center items-center border-4 border-solid border-blue-500 mt-5 mb-5">
              <div className="w-15/16 h-11/12 border-0 border-solid border-blue-500">
                <h1 className="text-3xl text-center mt-5 uppercase font-bold">
                  Shree anantadarsha sanskrit ved vidyalaya
                </h1>
                <h3 className="text-2xl text-center mt-3">
                  Shivasatakshi - 10, Maidhar, Jhapa, Koshi Province, Nepal
                </h3>
                <img src={logo} className="w-32 h-32 absolute top-35" />
                <p className="text-center mt-10 text-xl">ESTD: B.S. 2028</p>
                <p className="text-center text-xl">Contact: 023-410185</p>

                <p className="text-center text-xl"> EMIS Code No.: 040440026</p>

                <p className="text-center text-[1.7rem] font-bold mt-10 uppercase">
                  {examTerm === "FINAL" ? "annual " : examTerm + " terminal "} 
                  examination - {examYear}
                </p>
                <p className="text-center text-2xl font-semibold mt-3">
                  GRADE-SHEET
                </p>
                <div className="w-full flex flex-row justify-between mt-10 text-xl px-5">
                  <div>
                    <div>Name: {student?.name}</div>
                    <div className="mt-3">Roll: {student?.roll}</div>
                  </div>
                  <div>
                    <div>Class: {clss}</div>
                    <div className="mt-3">EMIS Code: {student?.emis}</div>
                  </div>
                </div>
                <table className="printTable w-full mt-10 text-xl uppercase border-2 border-black">
                  <thead>
                    <tr className="border-2">
                      <th rowSpan={2}>S.N</th>
                      <th rowSpan={2}>Subject</th>
                      <th rowSpan={2}>Credit Hour</th>
                      <th colSpan={2}>Obtained Grade</th>
                      <th rowSpan={2}>Final Grade</th>
                      <th rowSpan={2}>Grade Point</th>
                    </tr>
                    <tr>
                      <th>TH</th>
                      <th>PR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((data) => (
                      <tr
                        key={data.id}
                        className="text-center border-t-2 border-black"
                      >
                        <td>{count++}</td>
                        <td>{data.subject}</td>
                        <td>{data.creditHour}</td>
                        <td>{data.thGps}</td>
                        <td>{data.prGps}</td>
                        <td>{data.finalGL}</td>
                        <td>{data.grade.toFixed(2)}</td>
                      </tr>
                    ))}

                    <tr className="text-center border-t-2 border-black">
                      <td colSpan={3}>Total Credit Hours: &nbsp; &nbsp; 32</td>
                      <td colSpan={2}>-</td>
                      <td colSpan={2}>
                        GPA: &nbsp; &nbsp; {student?.gpa.toFixed(2)}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex flex-row justify-between text-xl mt-45 mb-5">
                  <div>
                    <p className="w-50 text-center border-t-2 border-black">
                      Class Teacher
                    </p>
                  </div>

                  <div>
                    <p className="w-50 text-center border-t-2 border-black">
                      Principal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="printMarksheet h-10 m-5 p-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600"
          >
            Print Marksheet
          </button>
        </div>
      )}
    </div>
  );
};

export default Marksheet;
