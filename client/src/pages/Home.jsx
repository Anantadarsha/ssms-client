import { useEffect } from "react";
import Button from "../components/Button";

const Home = () => {
  useEffect(()=>{
    document.title = "Home | SMMS | Anantadarsha Sanskrit Ved Vidyalaya";
  },[]);
  return (
    <div className="px-10 py-5">
      <div className="text-3xl font-bold">
        Welcome to{" "}
        <span className="text-blue-500">
          Anantadarsa Sanskrit Ved Vidhyalaya
        </span>
        <p className="text-2xl mt-5 font-semibold text-orange-400">
          Student Marks Management System
        </p>
      </div>
      <div className="text-gray-400 mt-5">
        Developed by{" "}
        <a href="https://www.facebook.com/nbinayak02" target="_blank">
          Binayak
        </a>
      </div>

      <div className="mt-6 flex flex-row gap-5">
        <Button title="Add Students" onClick="/students" />
        <Button title="Marks Entry" onClick="/marks-entry" />
        <Button title="Marks Ledger" onClick="/ledger" />
      </div>
    </div>
  );
};

export default Home;
