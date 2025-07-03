import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About | SMMS | Anantadarsha Sanskrit Ved Vidyalaya";
  }, []);

  return (
    <div className="py-4 w-full flex justify-center">
      <div className="w-180 h-fit bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 mt-5 rounded-xl">
        <div className="px-3 py-2">
          <header className="text-3xl font-bold mb-2">About SMMS</header>
          <p className="border-2 border-blue-500 w-20"></p>
        </div>
        <div className="px-3 py-3">
          <p className="leading-8 text-justify py-1">
            The <i> Student Marks Management System </i>
            is a web-based application designed to simplify and streamline the
            process of managing student academic records. It allows users to add
            student details, input marks, and generate marksheets efficiently.
          </p>
          <p className="leading-8 text-justify py-1">
            This application is specially developed for{" "}
            <b> Shree Anantadarsha Sanskrit Ved Vidhyalaya</b>, located in
            Maidhar, Jhapa, Nepal. The need for this system arose from the
            time-consuming and complex process of calculating Grade Point
            Averages (GPA) manually, especially for a large number of students.
            GPA calculation involves multiple mathematical steps and
            comparisons, which this system automates to save time and reduce
            errors.
          </p>
          <p className="leading-8 text-justify py-1">
            The application follows the official GPA calculation guidelines
            provided by the <b>Curriculum Development Centre (CDC) </b> and the{" "}
            <b>National Examination Board (NEB)</b> of Nepal. If you encounter
            any issues or have feedback regarding the system, please feel free
            to contact me through the following platforms:{" "}
          </p>
          <ul className="leading-8 text-justify py-1">
            <li> Email: binayak0128@gmail.com</li>
            <li>
              Facebook: &nbsp;
              <a href="https://www.facebook.com/nbinayak02" target="_blank" className="text-blue-500">
                nbinayak02
              </a>
            </li>
          </ul>{" "}
          <p className="leading-8 text-justify py-1">
            This is a solo project developed with four days of continuous effort
            and dedication.
          </p>{" "}
          <b>Binayak Niraula</b> <br />
          <i className="leading-8">June 28, 2025 – July 2, 2025</i>
        </div>
      </div>
    </div>
  );
};

export default About;
