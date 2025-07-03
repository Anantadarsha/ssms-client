import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-15 bg-white flex gap-20 pl-5 leading-15 shadow-[0_3px_10px_rgb(0,0,0,0.05)]">
      <div>Student Marks Management System</div>
      <ul className="flex justify-start gap-20">
        <Link to="/">
          <li className="cursor-pointer hover:scale-95 hover:border-b-2 border-blue-600 transition-all">
            Home
          </li>
        </Link>
        <Link to="/students">
          <li className="cursor-pointer hover:scale-95 hover:border-b-2 border-blue-600 transition-all">
            Students
          </li>
        </Link>
        <Link to="/marks-entry">
          <li className="cursor-pointer hover:scale-95 hover:border-b-2 border-blue-600 transition-all">
            Marks Entry
          </li>
        </Link>
        <Link to="/ledger">
          <li className="cursor-pointer hover:scale-95 hover:border-b-2 border-blue-600 transition-all">
            Ledger
          </li>
        </Link>
        <Link to="/about">
          <li className="cursor-pointer hover:scale-95 hover:border-b-2 border-blue-600 transition-all">
            About
          </li>
        </Link>
        <Link to="/logout">
          <li className="cursor-pointer hover:scale-95 hover:border-b-2 border-blue-600 transition-all">
            Logout
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
